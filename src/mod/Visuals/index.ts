import { VisualsBase } from './base';
import { Piechart } from './piechart';
import { Sidebar } from './sidebar';
import { ToolTip } from './toolTip';
import { HeatMap } from './heatMap';
import { CreepVis } from './creep';
import { RoomVis } from './room';

class VisualsConstructor extends VisualsBase {
	private state = {
		HeatMap: new HeatMap(),
		Piechart: new Piechart(),
		Sidebar: new Sidebar(),
		ToolTip: new ToolTip(),
		CreepVis: new CreepVis(),
		RoomVis: new RoomVis(),
	};
	public run = (): void => {
		const visibleChecked = VISUALS.VISIBLE_ONLY;
		const VISUAL_ROOMS = visibleChecked ? Util.getVisibleRooms() : Object.keys(Game.rooms);
		_.forEach(VISUAL_ROOMS, roomName => {
			const room: Room = Game.rooms[roomName];
			if (!room) return;
			if (!ROOM_VISUALS_ALL && !room.my) return;
			if (!visibleChecked && !room.controller) return;
			_.forEach(this.state, vis => vis.run(room));
		});
	};

	private drawLine = (
		from: RoomObject | RoomPosition,
		to: RoomObject | RoomPosition,
		style: Creep | LineStyle,
	): void => {
		if (from instanceof RoomObject) from = from.pos;
		if (to instanceof RoomObject) to = to.pos;
		if (!(from instanceof RoomPosition || to instanceof RoomPosition))
			throw new Error('Visuals: Point not a RoomPosition');
		if (from.roomName !== to.roomName) return; // cannot draw lines to another room
		const vis = new RoomVisual(from.roomName);
		const lineStyle = style instanceof Creep ? this.creepPathStyle(style) : style || {};
		vis.line(from, to, lineStyle as LineStyle);
	};
	public drawArrow = (
		from: RoomObject | RoomPosition,
		to: RoomObject | RoomPosition,
		style: Creep | LineStyle,
	): void => {
		if (from instanceof RoomObject) from = from.pos;
		if (to instanceof RoomObject) to = to.pos;
		if (!(from instanceof RoomPosition || to instanceof RoomPosition))
			throw new Error('Visuals: Point not a RoomPosition');
		if (from.roomName !== to.roomName) return; // cannot draw lines to another room
		const vis = new RoomVisual(from.roomName);
		this.drawLine(from, to, style);

		const delta_x = from.x - to.x;
		const delta_y = from.y - to.y;
		const theta_radians = Math.atan2(delta_y, delta_x);
		const base_angle = 0.610865;
		const length = Math.log1p(Util.getDistance(from, to)) * 0.5;
		const lineStyle = style instanceof Creep ? this.creepPathStyle(style) : style || {};

		vis.line(
			to.x,
			to.y,
			to.x + length * Math.cos(theta_radians + base_angle),
			to.y + length * Math.sin(theta_radians + base_angle),
			lineStyle as LineStyle,
		);
		vis.line(
			to.x,
			to.y,
			to.x + length * Math.cos(theta_radians - base_angle),
			to.y + length * Math.sin(theta_radians - base_angle),
			lineStyle as LineStyle,
		);
	};
}

export default new VisualsConstructor();
