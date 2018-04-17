import { VisualsBase } from './base';

export class VisualsExtends extends VisualsBase {
	barStyle = { fill: '#2B2B2B', opacity: 0.8, stroke: '#000000' };
	pieStyle = {
		radius: 1.2,
		fill: 'rgba(0,0,0,.5)',
		stroke: 'rgba(255,255,255,.5)',
	};
	pieFontStyle = {
		color: '#FFFFFF',
		font: '0.8 Hack',
		align: 'center',
		stroke: 'rgba(0,0,0,0.8)',
	};
	pieTitleStyle = {
		color: '#FFFFFF',
		font: '0.6 Hack',
		align: 'center',
	};
	creepPathStyle = creep => {
		function randomColour() {
			let c = '#';
			while (c.length < 7)
				c += Math.random()
					.toString(16)
					.substr(-7)
					.substr(-1);
			return c;
		}

		Util.set(creep.data, 'pathColour', randomColour);

		return {
			width: 0.15,
			color: creep.data.pathColour,
			lineStyle: 'dashed',
		};
	};
	drawBar = (vis, val, x, y, width, height, inner, fillStyle = {}) => {
		if (!inner) inner = val;
		const TEXT_Y = y + 0.75;
		vis.rect(x, y, width, height, this.barStyle);
		vis.rect(x, y, width * val, height, fillStyle);
		vis.text(inner, x + width / 2, TEXT_Y);
	};
	drawPie = (vis, val, max, title, colour, center, inner) => {
		if (!inner) inner = val;
		let p = 1;
		if (max !== 0) p = val / max;
		const r = 1; // radius
		center = { x: center.x, y: center.y * r * 4.5 };
		vis.circle(center, this.pieStyle);
		const poly = [center];
		const tau = 2 * Math.PI;
		const surf = tau * (p + 0.1);
		const offs = -Math.PI / 2;
		const step = tau / 32;
		for (let i = 0; i <= surf; i += step) {
			poly.push({
				x: center.x + Math.cos(i + offs),
				y: center.y - Math.cos(i),
			});
		}
		poly.push(center);
		vis.poly(poly, {
			fill: colour,
			opacity: 1,
			stroke: colour,
			strokeWidth: 0.05,
		});
		vis.text(Number.isFinite(inner) ? Util.formatNumber(inner) : inner, center.x, center.y + 0.3, this.pieFontStyle);
		let yoff = 0.7;
		if (p > 0.35 && p < 0.65) yoff += 0.3;
		vis.text(title, center.x, center.y + 1.5 + yoff, this.pieTitleStyle);
	};
	drawLine = (from, to, style) => {
		if (from instanceof RoomObject) from = from.pos;
		if (to instanceof RoomObject) to = to.pos;
		if (!(from instanceof RoomPosition || to instanceof RoomPosition))
			throw new Error('Visuals: Point not a RoomPosition');
		if (from.roomName !== to.roomName) return; // cannot draw lines to another room
		const vis = new RoomVisual(from.roomName);
		style = style instanceof Creep ? this.creepPathStyle(style) : style || {};
		vis.line(from, to, style);
	};
	drawArrow = (from, to, style) => {
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
		const new_angle = theta_radians + base_angle;
		const length = Math.log1p(Util.getDistance(from, to)) * 0.5;
		style = style instanceof Creep ? this.creepPathStyle(style) : style || {};

		vis.line(
			to.x,
			to.y,
			to.x + length * Math.cos(theta_radians + base_angle),
			to.y + length * Math.sin(theta_radians + base_angle),
			style,
		);
		vis.line(
			to.x,
			to.y,
			to.x + length * Math.cos(theta_radians - base_angle),
			to.y + length * Math.sin(theta_radians - base_angle),
			style,
		);
	};
	drawSparkline = (room, x, y, w, h, values, opts) => {
		const vis = room ? new RoomVisual(room) : this.vis;
		_.forEach(opts, opt => {
			vis.poly(
				_.map(values, (v, i) => [
					x + w * (i / (values.length - 1)),
					y + h * (1 - (v[opt.key] - opt.min) / (opt.max - opt.min)),
				]),
				opt,
			);
		});
	};
}
