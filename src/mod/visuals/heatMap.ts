import { VisualsBase } from './base';

class HeatMap extends VisualsBase {
	setHeatMapData = room => {
		Util.set(room.memory, 'heatmap', () => {
			const r = {};
			for (let x = 0; x < 50; x++) {
				for (let y = 0; y < 50; y++) {
					const pos = room.getPositionAt(x, y);
					if (Game.map.getTerrainAt(pos) === 'wall') continue;
					const key = `${String.fromCharCode(32 + x)}${String.fromCharCode(32 + y)}_x${x}-y${y}`;
					r[key] = 0;
				}
			}
			return r;
		});
		room.creeps.filter(creep => !creep.spawning).forEach(creep => {
			const x = creep.pos.x;
			const y = creep.pos.y;
			const key = `${String.fromCharCode(32 + x)}${String.fromCharCode(32 + y)}_x${x}-y${y}`;
			room.memory.heatmap[key]++;
		});
	};
	drawHeatMapData = room => {
		const vis = new RoomVisual(room.name);
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
			vis.rect(d.x - 0.5, d.y - 0.5, 1, 1, { fill: colour });
		});
	};
}

export default new HeatMap();
