import { Component } from '../class';

class LayoutConstructor extends Component {
	private x: number;
	private y: number;
	private RCL: number;
	private room: Room;
	public run = (): void => {
		if (Game.time % 10 !== 0) return;
		_.forEach(Memory.rooms, (roomMemory: RoomMemory, roomName: string) => {
			this.RCL = roomMemory.RCL;
			if (!this.RCL || this.RCL < 1 || !roomMemory.center) return;
			if (!roomMemory.RBL) roomMemory.RBL = 0;
			if (!roomMemory.RDL) roomMemory.RDL = 0;
			const RBL = roomMemory.RBL;
			const RDL = roomMemory.RDL;
			const center = roomMemory.center;
			this.x = center.x - 6;
			this.y = center.y - 6;
			this.room = Game.rooms[roomName];
			if (RBL !== this.RCL) return this.build(this.layout[RBL]);
			if (RDL !== this.RCL && _.size(Game.constructionSites) === 0) return this.build(this.defendLayout[RDL], true);
		});
	};

	private build = (layout: number[][], defence?: boolean): void => {
		if (layout === null) defence ? (this.room.memory.RDL = this.RCL) : (this.room.memory.RBL = this.RCL);
		let creatDone = true;
		_.forEach(layout, (row: number[], _y: number) => {
			_.forEach(row, (type: number, _x: number) => {
				if (type === 0) return;
				const cb = this.room.createConstructionSite(
					this.x + _x,
					this.y + _y,
					defence ? STRUCTURE_RAMPART : this.structureType[type],
				);
				if (!_.include([ERR_INVALID_TARGET, ERR_RCL_NOT_ENOUGH] || cb === ERR_FULL, cb)) creatDone = false;
			});
		});
		if (creatDone) defence ? (this.room.memory.RDL = this.RCL) : (this.room.memory.RBL = this.RCL);
	};

	private structureType = {
		1: STRUCTURE_ROAD,
		2: STRUCTURE_EXTENSION,
		3: STRUCTURE_TOWER,
		4: STRUCTURE_SPAWN,
		5: STRUCTURE_POWER_SPAWN,
		6: STRUCTURE_STORAGE,
		7: STRUCTURE_LINK,
		8: STRUCTURE_TERMINAL,
		9: STRUCTURE_LAB,
		10: STRUCTURE_NUKER,
	};

	private defendLayout = {
		0: null,
		1: [
			// rcl 1
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		2: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		3: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		4: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		5: [
			[0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
			[0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
			[1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
		],
		6: [
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		],
		7: [
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		],
	};

	private layout = {
		0: [
			// rcl 1
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		1: [
			// rcl 2
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 2, 0, 2, 1, 0, 0, 0, 0, 0, 0],
			[0, 1, 2, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0],
			[0, 0, 1, 2, 1, 1, 0, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		2: [
			// rcl 3
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 1, 2, 1, 0, 1, 2, 1, 0, 0, 0],
			[0, 0, 1, 2, 0, 2, 1, 2, 0, 2, 1, 0, 0],
			[0, 1, 2, 0, 0, 1, 4, 1, 0, 0, 2, 1, 0],
			[0, 0, 1, 2, 1, 1, 3, 1, 1, 2, 1, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		3: [
			// rcl 4
			[0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
			[1, 0, 0, 2, 1, 0, 0, 0, 1, 2, 0, 0, 1],
			[1, 0, 2, 1, 2, 1, 0, 1, 2, 1, 2, 0, 1],
			[1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
			[0, 1, 2, 2, 0, 1, 4, 1, 0, 2, 2, 1, 0],
			[1, 0, 1, 2, 1, 1, 3, 1, 1, 2, 1, 0, 1],
			[1, 0, 0, 1, 0, 0, 6, 0, 0, 1, 0, 0, 1],
			[1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
			[0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
			[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
			[1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
			[0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
		],
		4: [
			// rcl 5
			[0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
			[1, 0, 0, 2, 1, 0, 0, 0, 1, 2, 0, 0, 1],
			[1, 0, 2, 1, 2, 1, 0, 1, 2, 1, 2, 0, 1],
			[1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
			[0, 1, 2, 2, 0, 1, 4, 1, 0, 2, 2, 1, 0],
			[1, 0, 1, 2, 1, 1, 3, 1, 1, 2, 1, 0, 1],
			[1, 0, 0, 1, 0, 3, 6, 0, 0, 1, 0, 0, 1],
			[1, 0, 1, 2, 1, 1, 1, 1, 1, 0, 1, 0, 1],
			[0, 1, 2, 2, 0, 1, 7, 1, 0, 0, 0, 1, 0],
			[1, 2, 1, 2, 2, 2, 1, 0, 0, 0, 1, 0, 1],
			[1, 0, 2, 1, 2, 1, 0, 1, 0, 1, 0, 0, 1],
			[1, 0, 0, 2, 1, 0, 0, 0, 1, 0, 0, 0, 1],
			[0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
		],
		5: [
			// rcl 6
			[0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
			[1, 0, 2, 2, 1, 0, 0, 0, 1, 2, 2, 0, 1],
			[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1],
			[1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
			[0, 1, 2, 2, 0, 1, 4, 1, 0, 2, 2, 1, 0],
			[1, 0, 1, 2, 1, 1, 3, 1, 1, 2, 1, 0, 1],
			[1, 0, 2, 1, 0, 3, 6, 0, 0, 1, 2, 0, 1],
			[1, 0, 1, 2, 1, 1, 1, 1, 1, 0, 1, 0, 1],
			[0, 1, 2, 2, 0, 1, 7, 1, 8, 0, 0, 1, 0],
			[1, 2, 1, 2, 2, 2, 1, 0, 0, 9, 1, 0, 1],
			[1, 2, 2, 1, 2, 1, 2, 1, 9, 1, 9, 0, 1],
			[1, 0, 2, 2, 1, 0, 0, 0, 1, 0, 0, 0, 1],
			[0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
		],
		6: [
			// rcl 7
			[0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
			[1, 0, 2, 2, 1, 2, 0, 2, 1, 2, 2, 0, 1],
			[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1],
			[1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
			[0, 1, 2, 2, 0, 1, 4, 1, 0, 2, 2, 1, 0],
			[1, 2, 1, 2, 1, 1, 3, 1, 1, 2, 1, 2, 1],
			[1, 2, 2, 1, 4, 3, 6, 3, 0, 1, 2, 2, 1],
			[1, 2, 1, 2, 1, 1, 1, 1, 1, 0, 1, 2, 1],
			[0, 1, 2, 2, 0, 1, 7, 1, 8, 0, 9, 1, 0],
			[1, 2, 1, 2, 2, 2, 1, 0, 0, 9, 1, 9, 1],
			[1, 2, 2, 1, 2, 1, 2, 1, 9, 1, 9, 0, 1],
			[1, 0, 2, 2, 1, 2, 0, 2, 1, 9, 0, 0, 1],
			[0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
		],
		7: [
			// rcl 8
			[0, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 0],
			[1, 0, 2, 2, 1, 2, 10, 2, 1, 2, 2, 0, 1],
			[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1],
			[1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
			[2, 1, 2, 2, 3, 1, 4, 1, 3, 2, 2, 1, 2],
			[1, 2, 1, 2, 1, 1, 3, 1, 1, 2, 1, 2, 1],
			[1, 2, 2, 1, 4, 3, 6, 3, 4, 1, 2, 2, 1],
			[1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
			[2, 1, 2, 2, 3, 1, 7, 1, 8, 9, 9, 1, 2],
			[1, 2, 1, 2, 2, 2, 1, 2, 9, 9, 1, 9, 1],
			[1, 2, 2, 1, 2, 1, 2, 1, 9, 1, 9, 9, 1],
			[1, 0, 2, 2, 1, 2, 5, 2, 1, 9, 9, 0, 1],
			[0, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 0],
		],
	};
}

export default new LayoutConstructor();
