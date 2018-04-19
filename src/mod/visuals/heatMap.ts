import { VisualsBase } from './base';

export class HeatMap extends VisualsBase {
	public run = (room: Room): void => {
		Util.set(Memory, 'heatmap', false);
		this.vis = new RoomVisual(room.name);
		if (VISUALS.HEATMAP) {
			if (Game.time % VISUALS.HEATMAP_INTERVAL === 0) this.setHeatMapData(room);
			if (Memory.heatmap) this.drawHeatMapData(room);
		}
	};
	private getColourByPercentage = (percentage: number, reverse?: boolean): string => {
		const value = reverse ? percentage : 1 - percentage;
		const hue = (value * 120).toString(10);
		return `hsl(${hue}, 100%, 50%)`;
	};
	private setHeatMapData = (room: Room): void => {
		Util.set(room.memory, 'heatmap', () => {
			const r = {};
			for (let x = 0; x < 50; x++) {
				for (let y = 0; y < 50; y++) {
					if (Game.map.getTerrainAt(room.getPositionAt(x, y) as RoomPosition) === 'wall') continue;
					const key = `${String.fromCharCode(32 + x)}${String.fromCharCode(32 + y)}_x${x}-y${y}`;
					r[key] = 0;
				}
			}
			return r;
		});
		room.creeps.filter((creep: Creep) => !creep.spawning).forEach((creep: Creep) => {
			const x = creep.pos.x;
			const y = creep.pos.y;
			const key = `${String.fromCharCode(32 + x)}${String.fromCharCode(32 + y)}_x${x}-y${y}`;
			room.memory.heatmap[key]++;
		});
	};
	private drawHeatMapData = (room: Room): void => {
		const data = Object.keys(room.memory.heatmap).map(k => {
			return {
				n: room.memory.heatmap[k],
				x: k.charCodeAt(0) - 32,
				y: k.charCodeAt(1) - 32,
			};
		});

		const MAP_DATA = _.filter(data, d => d.n > 0);

		const PERCENTAGE_MAX = _.sum(MAP_DATA, d => d.n) / MAP_DATA.length * 2;
		MAP_DATA.forEach(d => {
			const PERCENTAGE = d.n / PERCENTAGE_MAX;
			const colour = this.getColourByPercentage(Math.min(1, PERCENTAGE));
			this.vis.rect(d.x - 0.5, d.y - 0.5, 1, 1, { fill: colour });
		});
	};
}
