import { Emoji } from '../../util/Emoji';
import { VisualsBase } from './base';

class ToolTip extends VisualsBase {
	toolTipStyle = {
		align: 'left',
		font: '0.4 Menlo',
		backgroundColor: 'rgba(0,0,0,.5)',
	};
	weakestStyle = { radius: 0.4, fill: '#FF0000', opacity: 0.3, strokeWidth: 0 };

	drawSpawnInfo = spawn => {
		if (!spawn.spawning) return;
		const vis = new RoomVisual(spawn.room.name);
		vis.text(`${Emoji.baby} ${spawn.spawning.name}`, spawn.pos.x - 0.5, spawn.pos.y, this.toolTipStyle);
	};
	drawMineralInfo = mineral => {
		const vis = new RoomVisual(mineral.room.name);
		const x = mineral.pos.x + 0.5;
		const y = mineral.pos.y;
		if (mineral.mineralAmount) {
			vis.text(`${Emoji.harvest} ${Util.formatNumber(mineral.mineralAmount)}`, x, y, this.toolTipStyle);
		} else {
			vis.text(`${Emoji.reload} ${Util.formatNumber(mineral.ticksToRegeneration)}`, x, y, this.toolTipStyle);
		}
	};
	drawSourceInfo = source => {
		const vis = new RoomVisual(source.room.name);
		const x = source.pos.x + 0.5;
		const y = source.pos.y;
		if (source.energy) {
			vis.text(`${Emoji.harvest} ${source.energy}`, x, y, this.toolTipStyle);
		} else {
			vis.text(`${Emoji.reload} ${source.ticksToRegeneration}`, x, y, this.toolTipStyle);
		}
	};
	drawControllerInfo = controller => {
		const vis = new RoomVisual(controller.room.name);
		const BASE_X = controller.pos.x + 0.5;
		let y = controller.pos.y;
		const style = this.toolTipStyle;
		let line0 = `${Emoji.upgrade} ${controller.level}`;
		let line1 = `${Util.formatNumber(controller.progress)}/${Util.formatNumber(controller.progressTotal)} (${(
			controller.progress /
			controller.progressTotal *
			100
		).toFixed(2)}%)`;
		let line2 = `${Emoji.reload} ${Util.formatNumber(controller.ticksToDowngrade)}`;
		if (controller.level === 8) {
			line1 = undefined;
		} else if (controller.reservation) {
			line0 = `${Emoji.flag} Reserved`;
			line1 = `${controller.reservation.username}`;
			line2 = `${Emoji.reload} ${controller.reservation.ticksToEnd}`;
		} else if (!controller.owner) {
			return;
		}
		vis.text(line0, BASE_X, y, style);
		if (line1) {
			vis.text(line1, BASE_X, (y += 1), style);
		}
		if (controller.ticksToDowngrade < CONTROLLER_DOWNGRADE[controller.level] || controller.reservation) {
			let downgradeStyle = Object.assign({}, style, { color: '#FF0000' });
			vis.text(line2, BASE_X, (y += 1), downgradeStyle);
		}
	};
	drawLabInfo = lab => {
		const vis = new RoomVisual(lab.room.name);
		if (!lab.energy && !lab.mineralAmount && !lab.cooldown) return;
		const x = lab.pos.x + 0.8;
		let y = lab.pos.y - 0.5;
		if (lab.mineralAmount) {
			vis.text(
				`M: ${lab.mineralType} (${Util.formatNumber(lab.mineralAmount)})`,
				x,
				(y += 0.4),
				Object.assign({ color: this.getResourceColour(lab.mineralType) }, this.toolTipStyle),
			);
		}
		if (lab.cooldown) {
			vis.text(`C: ${lab.cooldown}`, x, (y += 0.4), Object.assign({ color: '#FF0000' }, this.toolTipStyle));
		}
	};
	drawTowerInfo = tower => {
		const vis = new RoomVisual(tower.room.name);
		const needEnergy = tower.energyCapacity - tower.energy;
		if (needEnergy > 0) vis.text(`${Emoji.fuel} ${needEnergy}`, tower.pos.x, tower.pos.y, this.toolTipStyle);
	};
	drawTransactions = room => {
		if (!room.terminal) return;
		const vis = new RoomVisual(room.name);
		const x = room.terminal.pos.x;
		let y = room.terminal.pos.y - 1;

		const transactions = _(Game.market.incomingTransactions)
			.concat(Game.market.outgoingTransactions)
			.filter(transaction => transaction.from === room.name || transaction.to === room.name)
			.sortByOrder('time', 'desc')
			.slice(0, 2)
			.value();

		if (transactions.length === 0) return;
		if (transactions.length === 2) y -= 0.4;

		transactions.forEach(transaction => {
			const outgoing = transaction.sender.username === room.controller.owner.username;
			const toSelf = transaction.recipient ? transaction.sender.username === transaction.recipient.username : false;
			const receiving = room.name === transaction.to;
			const colour = outgoing || receiving ? '#00FF00' : '#FF0000';
			const prefix = outgoing ? '+' : '-';
			let text = '';
			if (toSelf || !transaction.order) {
				const roomName = receiving ? transaction.from : transaction.to;
				text = `${roomName} : ${transaction.amount} ${transaction.resourceType}`;
			} else {
				text = `${prefix}${transaction.amount * transaction.order.price}`;
			}
			vis.text(text, x, y, { font: this.toolTipStyle.font, color: colour });

			y += 0.4;
		});
	};

	highlightWeakest = (room, structureType) => {
		const vis = new RoomVisual(room.name);
		const weakest = _(room.find(FIND_STRUCTURES))
			.filter({ structureType })
			.min('hits');
		if (weakest && weakest.pos) {
			vis.circle(weakest.pos.x, weakest.pos.y, this.weakestStyle);
			let y = weakest.pos.y - 0.5; // base y pos - consistent with spawns, labs, and controllers
			const look = weakest.pos.lookFor(LOOK_STRUCTURES);
			const towers = _.find(look, o => o instanceof StructureTower);
			if (towers && VISUALS.TOWER) {
				y += 0.4;
			} else {
				const spawns = _.find(look, o => o instanceof StructureSpawn && o.spawning);
				if (spawns && VISUALS.SPAWN) {
					// if structure shares a position with a spawn (road, rampart), lower to next line
					// spawn must be spawning, and spawn visuals must be enabled
					y += 0.4;
				} else {
					const labs = _.find(look, o => o instanceof StructureLab);
					if (labs && VISUALS.LABS) {
						// same as spawns, move the weakest structure text until it's on its own line
						if (labs.energy) y += 0.4;
						if (labs.mineralAmount) y += 0.4;
						if (labs.cooldown) y += 0.4;
					}
				}
			}
			vis.text(
				`H: ${Util.formatNumber(weakest.hits)} (${(weakest.hits / weakest.hitsMax * 100).toFixed(2)}%)`,
				weakest.pos.x + 1,
				y,
				this.toolTipStyle,
			);
		}
	};
}

export default new ToolTip();
