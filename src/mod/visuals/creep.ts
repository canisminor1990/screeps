import { VisualsBase } from './base';

export class CreepVis extends VisualsBase {
	public run = (room: Room): void => {
		this.vis = new RoomVisual(room.name);
		if (VISUALS.CREEP) _.forEach(room.creeps, (creep: Creep) => this.drawCreepPath(creep));
	};

	private drawCreepPath = (creep: Creep): void => {
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
			this.vis.line(x, y, (x += maths[dir].x), (y += maths[dir].y), style);
		}
	};
}
