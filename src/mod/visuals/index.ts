import { VisualsExtends } from './extends';
import Sidebar from './sidebar';
import ToolTip from './toolTip';
import HeatMap from './heatMap';

const BLACK = '#000000';
const WHITE = '#FFFFFF';
const YELLOW = '#FFFF00';
const CYAN = '#00FFFF';

class VisualsClass extends VisualsExtends {
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
			this.drawGlobal();
		}
	};

	drawGlobal = () => {
		const vis = this.vis;
		const bufferWidth = 1;
		if (!VISUALS.INFO_PIE_CHART) {
			const sectionWidth = 49 / 5;
			const BAR_STYLE = this.barStyle;

			let x = bufferWidth;
			let y = 2;
			const BAR_Y = y - 0.75;
			if (VISUALS.ROOM) {
				// GCL
				x = bufferWidth * 2 + sectionWidth;
				const GCL_PERCENTAGE = Game.gcl.progress / Game.gcl.progressTotal;
				this.drawBar(
					vis,
					GCL_PERCENTAGE,
					x,
					BAR_Y,
					sectionWidth,
					1,
					`GCL: ${Game.gcl.level} (${(GCL_PERCENTAGE * 100).toFixed(2)}%)`,
					{
						fill: this.getColourByPercentage(GCL_PERCENTAGE, true),
						opacity: BAR_STYLE.opacity,
					},
				);

				// CPU
				x += sectionWidth + bufferWidth;
				const CPU_PERCENTAGE = Game.cpu.getUsed() / Game.cpu.limit;
				const FUNCTIONAL_CPU_PERCENTAGE = Math.min(1, CPU_PERCENTAGE);
				this.drawBar(
					vis,
					FUNCTIONAL_CPU_PERCENTAGE,
					x,
					BAR_Y,
					sectionWidth,
					1,
					`CPU: ${(CPU_PERCENTAGE * 100).toFixed(2)}%`,
					{
						fill: this.getColourByPercentage(FUNCTIONAL_CPU_PERCENTAGE),
						opacity: BAR_STYLE.opacity,
					},
				);

				// BUCKET
				x += sectionWidth + bufferWidth;
				const BUCKET_PERCENTAGE = Math.min(1, Game.cpu.bucket / 10000);
				this.drawBar(vis, BUCKET_PERCENTAGE, x, BAR_Y, sectionWidth, 1, `Bucket: ${Game.cpu.bucket}`, {
					fill: this.getColourByPercentage(BUCKET_PERCENTAGE, true),
					opacity: BAR_STYLE.opacity,
				});

				// TICK
				x += sectionWidth + bufferWidth;
				vis.text(`Tick: ${Game.time}`, x, y, { align: 'left' });

				//  Second Row
				x = bufferWidth * 2 + sectionWidth;
				y += 1.5;

				//  SPAWN CAPACITY UTILIZATION (SCU)
				const spawnCount = _.size(Game.spawns);
				let count = _(Game.spawns)
					.filter('spawning')
					.size();
				count += _(Game.rooms)
					.map(r => r.spawnQueueHigh.concat(r.spawnQueueMedium, r.spawnQueueLow))
					.flatten()
					.size();
				const SCU_PERCENTAGE = count / spawnCount;
				this.drawBar(
					vis,
					Math.min(1, SCU_PERCENTAGE),
					x,
					y - 0.75,
					sectionWidth,
					1,
					`SCU: ${(SCU_PERCENTAGE * 100).toFixed(2)}%`,
					{
						fill: this.getColourByPercentage(Math.min(1, SCU_PERCENTAGE)),
						opacity: BAR_STYLE.opacity,
					},
				);
			}
		} else {
			let x = bufferWidth + 1;
			let y = 0.5;
			// GCL
			this.drawPie(
				vis,
				Math.round(Game.gcl.progress),
				Game.gcl.progressTotal,
				`GCL ${Game.gcl.level}`,
				this.getColourByPercentage(Game.gcl.progress / Game.gcl.progressTotal, true),
				{ x, y: y++ },
			);

			// CPU
			const CPU_PERCENTAGE = Game.cpu.getUsed() / Game.cpu.limit;
			const FUNCTIONAL_CPU_PERCENTAGE = Math.min(1, CPU_PERCENTAGE);
			this.drawPie(
				vis,
				Math.round(Game.cpu.getUsed()),
				Game.cpu.limit,
				'CPU',
				this.getColourByPercentage(FUNCTIONAL_CPU_PERCENTAGE),
				{ x, y: y++ },
			);

			// BUCKET
			this.drawPie(
				vis,
				Game.cpu.bucket,
				10000,
				'Bucket',
				this.getColourByPercentage(Math.min(1, Game.cpu.bucket / 10000), true),
				{ x, y: y++ },
			);

			//  SPAWN CAPACITY UTILIZATION (SCU)
			const spawnCount = _.size(Game.spawns);
			let count = _(Game.spawns)
				.filter('spawning')
				.size();
			count += _(Game.rooms)
				.map(r => r.spawnQueueHigh.concat(r.spawnQueueMedium, r.spawnQueueLow))
				.flatten()
				.size();
			const SCU_PERCENTAGE = count / spawnCount;
			this.drawPie(vis, SCU_PERCENTAGE, 1, 'SCU', this.getColourByPercentage(SCU_PERCENTAGE), {
				x,
				y: y++,
			});

			// TICK
			y += 15;
			vis.text('Tick', x, y++, {
				color: WHITE,
				align: 'center',
			});
			vis.text(Game.time, x, y++, {
				color: WHITE,
				align: 'center',
			});
		}
		if (VISUALS.CPU) {
			this.drawSparkline(
				undefined,
				1.5,
				46.5,
				20,
				2,
				_.map(Memory.visualStats.cpu, (v, i) => Memory.visualStats.cpu[i]),
				this.sparklineStyle,
			);
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
		let x;
		let y = 0;
		// Room Name: centered middle
		vis.text(`Room: ${vis.roomName}`, 24.5, ++y);
		// Displays bars: RCL, Room Energy
		const bufferWidth = 1;
		if (!VISUALS.INFO_PIE_CHART) {
			const sectionWidth = 49 / 5;
			const BAR_STYLE = this.barStyle;

			// RCL
			x = bufferWidth;
			y++;
			let text;
			let RCL_PERCENTAGE;
			if (room.controller.level === 8) {
				RCL_PERCENTAGE = 1;
				text = 'RCL: 8';
			} else if (room.controller.reservation) {
				RCL_PERCENTAGE = 0;
				text = `Reserved: ${room.controller.reservation.ticksToEnd}`;
			} else if (room.controller.owner) {
				RCL_PERCENTAGE = Math.min(1, room.controller.progress / room.controller.progressTotal);
				text = `RCL: ${room.controller.level} (${(RCL_PERCENTAGE * 100).toFixed(2)}%)`;
			} else {
				RCL_PERCENTAGE = 0;
				text = `Unowned`;
			}
			this.drawBar(vis, RCL_PERCENTAGE, x, y - 0.75, sectionWidth, 1, text, {
				fill: this.getColourByPercentage(RCL_PERCENTAGE, true),
				opacity: BAR_STYLE.opacity,
			});

			if (VISUALS.ROOM_GLOBAL) {
				// New line
				y += 1.5;

				x = bufferWidth;
			} else {
				x += sectionWidth + bufferWidth;
			}

			// Display Energy Available
			if (!room.controller.reservation && room.controller.owner) {
				const ENERGY_PERCENTAGE = room.energyAvailable / room.energyCapacityAvailable || 0;
				this.drawBar(
					vis,
					ENERGY_PERCENTAGE,
					x,
					y - 0.75,
					sectionWidth,
					1,
					`Energy: ${room.energyAvailable}/${room.energyCapacityAvailable} (${(ENERGY_PERCENTAGE * 100).toFixed(2)}%)`,
					{
						fill: this.getColourByPercentage(ENERGY_PERCENTAGE, true),
						opacity: BAR_STYLE.opacity,
					},
				);
			}
		} else {
			let x = bufferWidth + 1;
			let y = 0.5;
			if (VISUALS.ROOM_GLOBAL) {
				x += 4;
			}

			// RCL
			let val;
			let max;
			let title = 'RCL';
			let inner;
			if (room.controller.level === 8) {
				val = 1;
				max = 1;
				inner = ' ';
			} else if (room.controller.reservation) {
				val = room.controller.reservation.ticksToEnd;
				max = 5000;
			} else if (room.controller.owner) {
				val = Math.min(room.controller.progress, room.controller.progressTotal);
				max = room.controller.progressTotal;
				title += ` ${room.controller.level}`;
			} else {
				val = 0;
				max = 1;
				inner = 'N/A';
			}
			this.drawPie(vis, val, max, title, this.getColourByPercentage(val / max, true), { x, y: y++ }, inner);

			// Energy Available
			if (!room.controller.reservation && room.controller.owner) {
				const PERCENTAGE = room.energyAvailable / room.energyCapacityAvailable || 0;
				this.drawPie(
					vis,
					room.energyAvailable,
					room.energyCapacityAvailable,
					'Energy',
					this.getColourByPercentage(PERCENTAGE, true),
					{ x, y: y++ },
				);
			}
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

export default new VisualsClass();
