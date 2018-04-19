import { VisualsBase } from './base';
import { Emoji } from '../../util';

export class Piechart extends VisualsBase {
	private pieStyle: CircleStyle = {
		radius: 1.2,
		fill: 'rgba(0,0,0,.5)',
		stroke: 'rgba(255,255,255,.5)',
	};
	private pieFontStyle: TextStyle = {
		color: '#FFFFFF',
		font: '0.8 Hack',
		align: 'center',
		stroke: 'rgba(0,0,0,0.8)',
	};
	private pieTitleStyle: TextStyle = {
		color: '#FFFFFF',
		font: '0.6 Hack',
		align: 'center',
	};

	private color = '#62e6ac';
	public run = (room: Room): void => {
		this.vis = new RoomVisual(room.name);
		if (VISUALS.ROOM && !!room.controller) this.drawRoomInfo(room);
	};

	private drawPie = (val: number, max: number, title: string, colour: string, center: Pos, inner?: number): void => {
		if (!inner) inner = val;
		let p = 1;
		if (max !== 0) p = val / max;
		const r = 1; // radius
		center = { x: center.x, y: center.y * r * 4.5 };
		this.vis.circle(center, this.pieStyle);
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
		this.vis.poly(poly, {
			fill: colour,
			opacity: 1,
			stroke: colour,
			strokeWidth: 0.05,
		});
		this.vis.text(
			Number.isFinite(inner) ? Util.formatNumber(inner) : inner,
			center.x,
			center.y + 0.3,
			this.pieFontStyle,
		);
		let yoff = 0.7;
		if (p > 0.35 && p < 0.65) yoff += 0.3;
		this.vis.text(title, center.x, center.y + 1.5 + yoff, this.pieTitleStyle);
	};

	private drawRoomInfo = (room: Room): void => {
		// Room Name: centered middle
		this.vis.text(`${Emoji.home}${room.name}`, 24.5, 1.5, {
			font: '1 Hack',
			backgroundColor: 'rgba(0,0,0,.5)',
		});

		let x = 47;
		let y = 0.5;

		// CPU
		this.drawPie(Math.round(Game.cpu.getUsed()), Game.cpu.limit, 'CPU', this.color, { x, y: y++ });
		// BUCKET
		this.drawPie(Game.cpu.bucket, 10000, 'Bucket', this.color, { x, y: y++ });
		// GCL
		this.drawPie(Math.round(Game.gcl.progress), Game.gcl.progressTotal, `GCL ${Game.gcl.level}`, this.color, {
			x,
			y: y++,
		});
		// RCL
		const controller = room.controller;
		if (controller) {
			let val: number;
			let max: number;
			let title: string = 'RCL';
			let display: boolean = true;
			if (controller.level === 8) {
				val = 1;
				max = 1;
			} else if (controller.reservation) {
				val = controller.reservation.ticksToEnd;
				max = 5000;
			} else if (controller.owner) {
				val = Math.min(controller.progress, controller.progressTotal);
				max = controller.progressTotal;
				title += ` ${controller.level}`;
			} else {
				display = false;
			}
			if (display) this.drawPie(val, max, title, this.color, { x, y: y++ }, controller.level);
		}
		// Store
		const storage = room.storage;
		if (storage) this.drawPie(storage.sum, storage.storeCapacity, 'Store', this.color, { x, y: y++ });
	};
}
