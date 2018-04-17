import { Emoji } from '../../util';
import { VisualsExtends } from './extends';
import Sidebar from './sidebar';
import ToolTip from './toolTip';
import HeatMap from './heatMap';

const YELLOW = '#FFFF00';
const CYAN = '#00FFFF';

class VisualsConstructor extends VisualsExtends {
	sparklineStyle = [
		{
			key: 'limit',
			min: Game.cpu.limit * 0.5,
			max: Game.cpu.limit * 1.5,
			stroke: '#808080',
			opacity: 0.25,
		},
		{
			key: 'cpu',
			min: Game.cpu.limit * 0.5,
			max: Game.cpu.limit * 1.5,
			stroke: YELLOW,
			opacity: 0.5,
		},
		{
			key: 'bucket',
			min: 0,
			max: 10000,
			stroke: CYAN,
			opacity: 0.5,
		},
	];

	run = () => {
		const visibleChecked = VISUALS.VISIBLE_ONLY;
		const VISUAL_ROOMS = visibleChecked ? Util.getVisibleRooms() : Object.keys(Game.rooms);
		_.forEach(VISUAL_ROOMS, roomName => {
			const room = Game.rooms[roomName];
			if (!room) return;
			if (!ROOM_VISUALS_ALL && !room.my) return;
			if (!visibleChecked && !room.controller) return;

			Util.set(Memory, 'heatmap', false);

			// Sidebar
			if (VISUALS.HEATMAP) {
				if (Game.time % VISUALS.HEATMAP_INTERVAL === 0) HeatMap.setHeatMapData(room);
				if (Memory.heatmap) HeatMap.drawHeatMapData(room);
			}

			if (VISUALS.ROOM && !!room.controller) this.drawRoomInfo(room, VISUALS.ROOM_GLOBAL);

			// Sidebar
			if (VISUALS.ROOM_ORDERS) Sidebar.drawRoomOrders(room);
			if (VISUALS.ROOM_OFFERS) Sidebar.drawRoomOffers(room);
			if (VISUALS.STORAGE) Sidebar.drawStorageInfo(room.storage);
			if (VISUALS.TERMINAL) Sidebar.drawTerminalInfo(room.terminal);

			// ToolTip
			if (VISUALS.SPAWN) room.structures.spawns.filter(s => s.spawning).forEach(spawn => ToolTip.drawSpawnInfo(spawn));
			if (VISUALS.MINERAL) {
				let [mineral] = room.minerals;
				if (mineral) {
					ToolTip.drawMineralInfo(mineral);
				}
			}
			if (VISUALS.CONTROLLER) ToolTip.drawControllerInfo(room.controller);
			if (VISUALS.WALL) ToolTip.highlightWeakest(room, STRUCTURE_WALL);
			if (VISUALS.RAMPART) ToolTip.highlightWeakest(room, STRUCTURE_RAMPART);
			if (VISUALS.ROAD) ToolTip.highlightWeakest(room, STRUCTURE_ROAD);
			if (VISUALS.TRANSACTIONS) ToolTip.drawTransactions(room);
			if (VISUALS.SOURCE) room.sources.forEach(source => ToolTip.drawSourceInfo(source));
			if (VISUALS.LABS) room.structures.labs.all.forEach(lab => ToolTip.drawLabInfo(lab));
			if (VISUALS.TOWER) room.structures.towers.forEach(tower => ToolTip.drawTowerInfo(tower));

			if (VISUALS.CREEP) room.creeps.forEach(creep => this.drawCreepPath(creep));
		});

		if (VISUALS.ROOM_GLOBAL) {
			if (VISUALS.CPU) this.collectSparklineStats();
		}
	};

	collectSparklineStats = () => {
		Util.set(Memory, 'visualStats.cpu', []);
		Memory.visualStats.cpu.push({
			limit: Game.cpu.limit,
			bucket: Game.cpu.bucket,
			cpu: Game.cpu.getUsed(),
		});
		if (Memory.visualStats.cpu.length >= 100) {
			Memory.visualStats.cpu.shift();
		}
	};
	drawRoomInfo = room => {
		const vis = new RoomVisual(room.name);
		const color = '#62e6ac';
		// Room Name: centered middle
		vis.text(`${Emoji.home}${vis.roomName}`, 24.5, 1.5, {
			font: '1 Hack',
			backgroundColor: 'rgba(0,0,0,.5)',
		});

		let x = 47;
		let y = 0.5;

		// CPU
		const CPU_PERCENTAGE = Game.cpu.getUsed() / Game.cpu.limit;
		const FUNCTIONAL_CPU_PERCENTAGE = Math.min(1, CPU_PERCENTAGE);
		this.drawPie(vis, Math.round(Game.cpu.getUsed()), Game.cpu.limit, 'CPU', color, { x, y: y++ });

		// BUCKET
		this.drawPie(vis, Game.cpu.bucket, 10000, 'Bucket', color, { x, y: y++ });

		// GCL
		this.drawPie(vis, Math.round(Game.gcl.progress), Game.gcl.progressTotal, `GCL ${Game.gcl.level}`, color, {
			x,
			y: y++,
		});

		// RCL
		let val;
		let max;
		let title = 'RCL';
		let inner = room.RCL;
		let display = true;
		if (room.RCL === 8) {
			val = 1;
			max = 1;
		} else if (room.controller.reservation) {
			val = room.controller.reservation.ticksToEnd;
			max = 5000;
		} else if (room.controller.owner) {
			val = Math.min(room.controller.progress, room.controller.progressTotal);
			max = room.controller.progressTotal;
			title += ` ${room.RCL}`;
		} else {
			display = false;
		}
		if (display) this.drawPie(vis, val, max, title, color, { x, y: y++ }, inner);

		// Energy Available
		if (!room.controller.reservation && room.controller.owner) {
			this.drawPie(vis, room.storage.sum, room.storage.storeCapacity, 'Store', color, { x, y: y++ });
		}
	};

	drawCreepPath = creep => {
		const vis = new RoomVisual(creep.room.name);
		if (creep.action && creep.action.name === 'idle') return; // don't draw idle path
		if (
			_(creep.pos)
				.pick(['x', 'y'])
				.eq(creep.data.determinatedSpot)
		)
			return;
		if (!creep.memory || !creep.memory._travel || !creep.memory._travel.path) return;

		const path = creep.memory._travel.path.substr(1);
		const style = this.creepPathStyle(creep);
		let x = creep.pos.x;
		let y = creep.pos.y;
		const maths = {
			[TOP]: { x: 0, y: -1 },
			[TOP_RIGHT]: { x: 1, y: -1 },
			[RIGHT]: { x: 1, y: 0 },
			[BOTTOM_RIGHT]: { x: 1, y: 1 },
			[BOTTOM]: { x: 0, y: 1 },
			[BOTTOM_LEFT]: { x: -1, y: 1 },
			[LEFT]: { x: -1, y: 0 },
			[TOP_LEFT]: { x: -1, y: -1 },
		};
		if (creep.fatigue === 0) {
			const initDir = +creep.memory._travel.path[0]; // get initial so we know where to set the start (x, y)
			x += maths[initDir].x;
			y += maths[initDir].y;
		}
		for (let dir of path) {
			dir = +dir; // force coerce to number
			vis.line(x, y, (x += maths[dir].x), (y += maths[dir].y), style);
		}
	};
}

export default new VisualsConstructor();
