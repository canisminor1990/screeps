import { VisualsBase } from './base';

export class RoomVis extends VisualsBase {
	private lineStyle: PolyStyle = {
		fill: 'rgba(255,255,255,.5)',
		opacity: 0.1,
		stroke: 'rgba(255,255,255,0)',
	};
	public run = (room: Room): void => {
		this.vis = new RoomVisual(room.name);
		this.bluePring(room);
		this.bluePring(room);
	};

	private makePoint(center: Pos) {
		const { x, y } = center;
		return {
			// outside
			topLeft: [x - 6, y - 6],
			topRight: [x + 6, y - 6],
			bottomRight: [x + 6, y + 6],
			bottomLeft: [x - 6, y + 6],
			// outside
			topLeftA: [x - 6, y - 5],
			topLeftB: [x - 5, y - 6],
			topRightA: [x + 5, y - 6],
			topRightB: [x + 6, y - 5],
			bottomRightA: [x + 6, y + 5],
			bottomRightB: [x + 5, y + 6],
			bottomLeftA: [x - 5, y + 6],
			bottomLeftB: [x - 6, y + 5],
			// outside
			topA: [x - 3, y - 6],
			topB: [x - 1, y - 6],
			topC: [x + 1, y - 6],
			topD: [x + 3, y - 6],
			rightA: [x + 6, y - 3],
			rightB: [x + 6, y - 1],
			rightC: [x + 6, y + 1],
			rightD: [x + 6, y + 3],
			bottomA: [x - 3, y + 6],
			bottomB: [x - 1, y + 6],
			bottomC: [x + 1, y + 6],
			bottomD: [x + 3, y + 6],
			leftA: [x - 6, y - 3],
			leftB: [x - 6, y - 1],
			leftC: [x - 6, y + 1],
			leftD: [x - 6, y + 3],
			// center
			centerTop: [x, y - 3],
			centerRight: [x + 3, y],
			centerBottom: [x, y + 3],
			centerLeft: [x - 3, y],
			// center
			centerTopA: [x - 2, y - 5],
			centerTopB: [x + 2, y - 5],
			centerRightA: [x + 5, y - 2],
			centerRightB: [x + 5, y + 2],
			centerBottomA: [x - 2, y + 5],
			centerBottomB: [x + 2, y + 5],
			centerLeftA: [x - 5, y - 2],
			centerLeftB: [x - 5, y + 2],
		};
	}

	private bluePring = (room: Room) => {
		if (!room.memory.center) return;
		const center: Pos = room.memory.center;
		const point = this.makePoint(center);
		this.vis.circle(center);
		this.vis.poly(
			[
				point.topLeftA,
				point.topLeftB,
				point.topRightA,
				point.topRightB,
				point.bottomRightA,
				point.bottomRightB,
				point.bottomLeftA,
				point.bottomLeftB,
				point.topLeftA,
			],
			this.lineStyle,
		);
		this.vis.poly([point.centerTop, point.centerRight, point.centerBottom, point.centerLeft, point.centerTop]);
		this.vis.poly(
			[
				point.centerLeft,
				point.centerLeftA,
				point.centerTopA,
				point.centerTop,
				point.centerTopB,
				point.centerRightA,
				point.centerRight,
				point.centerRightB,
				point.centerBottomB,
				point.centerBottom,
				point.centerBottomA,
				point.centerLeftB,
				point.centerLeft,
			],
			{ opacity: 0.3 },
		);

		this.vis.poly(
			[
				point.topA,
				point.centerTopA,
				point.topB,
				point.topC,
				point.centerTopB,
				point.topD,
				point.topRightA,
				point.topRightB,
				point.rightA,
				point.centerRightA,
				point.rightB,
				point.rightC,
				point.centerRightB,
				point.rightD,
				point.bottomRightA,
				point.bottomRightB,
				point.bottomD,
				point.centerBottomB,
				point.bottomC,
				point.bottomB,
				point.centerBottomA,
				point.bottomA,
				point.bottomLeftA,
				point.bottomLeftB,
				point.leftD,
				point.centerLeftB,
				point.leftC,
				point.leftB,
				point.centerLeftA,
				point.leftA,
				point.topLeftA,
				point.topLeftB,
				point.topA,
			],
			{ opacity: 0.2 },
		);
	};
}
