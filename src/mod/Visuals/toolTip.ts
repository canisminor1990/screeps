import { VisualsBase } from './base';

export class ToolTip extends VisualsBase {
	private toolTipStyle: TextStyle = {
		align: 'left',
		font: '0.4 Hack',
		backgroundColor: 'rgba(0,0,0,.5)',
	};
	private weakestStyle: CircleStyle = {
		radius: 0.4,
		fill: '#FF0000',
		opacity: 0.3,
		strokeWidth: 0,
	};

	public run = (room: Room): void => {
		this.vis = new RoomVisual(room.name);
		if (VISUALS.MINERAL) this.drawMineralInfo(room.minerals);
		if (VISUALS.SOURCE) room.sources.forEach((source: Source) => this.drawSourceInfo(source));

		if (VISUALS.CONTROLLER) this.drawControllerInfo(room.controller);
		if (VISUALS.TRANSACTIONS) this.drawTransactions(room);

		if (VISUALS.LABS) room.structures.labs.all.forEach((lab: StructureLab) => this.drawLabInfo(lab));
		if (VISUALS.TOWER) room.structures.towers.forEach((tower: StructureTower) => this.drawTowerInfo(tower));
		if (VISUALS.SPAWN)
			room.structures.spawns
				.filter((spawn: StructureSpawn) => spawn.spawning)
				.forEach((s: StructureSpawn) => this.drawSpawnInfo(s));
		// Weakest
		if (VISUALS.WALL) this.highlightWeakest(room, STRUCTURE_WALL);
		if (VISUALS.RAMPART) this.highlightWeakest(room, STRUCTURE_RAMPART);
		if (VISUALS.ROAD) this.highlightWeakest(room, STRUCTURE_ROAD);
	};

	private drawSpawnInfo = (spawn: StructureSpawn): void => {
		if (!spawn.spawning) return;
		this.vis.text(`${Util.emoji.baby} ${spawn.spawning.name}`, spawn.pos.x - 0.5, spawn.pos.y, this.toolTipStyle);
	};
	private drawMineralInfo = (mineral: Mineral): void => {
		if (!mineral || !mineral.room) return;
		const x = mineral.pos.x + 0.5;
		const y = mineral.pos.y;
		if (mineral.mineralAmount) {
			this.vis.text(`${Util.emoji.mining} ${Math.floor(mineral.mineralAmount)}`, x, y, this.toolTipStyle);
		} else {
			this.vis.text(`${Util.emoji.reload} ${Util.formatNumber(mineral.ticksToRegeneration)}`, x, y, this.toolTipStyle);
		}
	};
	private drawSourceInfo = (source: Source): void => {
		const x = source.pos.x + 0.5;
		const y = source.pos.y;
		if (source.energy) {
			this.vis.text(`${Util.emoji.mining} ${source.energy}`, x, y, this.toolTipStyle);
		} else {
			this.vis.text(`${Util.emoji.reload} ${source.ticksToRegeneration}`, x, y, this.toolTipStyle);
		}
	};
	private drawControllerInfo = (controller: StructureController): void => {
		const BASE_X = controller.pos.x + 0.5;
		let y = controller.pos.y;
		const style = this.toolTipStyle;
		let line0 = `${Util.emoji.upgrading} Lv${controller.level}`;
		let line1 = `${Util.formatNumber(controller.progress)}/${Util.formatNumber(controller.progressTotal)} (${(
			controller.progress /
			controller.progressTotal *
			100
		).toFixed(2)}%)`;
		let line2 = `${Util.emoji.reload} ${Util.formatNumber(controller.ticksToDowngrade)}`;
		if (controller.level === 8) {
			line1 = '';
		} else if (controller.reservation) {
			line0 = `${Util.emoji.flag} Reserved`;
			line1 = '';
			line2 = `${Util.emoji.reload} ${controller.reservation.ticksToEnd}`;
		} else if (!controller.owner) {
			return;
		}
		if (line1 !== '') {
			this.vis.text(line0 + ': ' + line1, BASE_X, y, style);
		} else {
			this.vis.text(line0, BASE_X, y, style);
		}
		if (controller.ticksToDowngrade < CONTROLLER_DOWNGRADE[controller.level] || controller.reservation) {
			let downgradeStyle = Object.assign({}, style, { color: '#FF0000' });
			this.vis.text(line2, BASE_X, (y += 1.2), downgradeStyle);
		}
	};
	private drawLabInfo = (lab: StructureLab): void => {
		if (!lab.energy && !lab.mineralAmount && !lab.cooldown) return;
		const x = lab.pos.x + 0.8;
		let y = lab.pos.y - 0.5;
		if (lab.mineralAmount) {
			this.vis.text(
				`M: ${lab.mineralType} (${Util.formatNumber(lab.mineralAmount)})`,
				x,
				(y += 0.4),
				Object.assign({ color: this.getResourceColour(lab.mineralType as string) }, this.toolTipStyle),
			);
		}
		if (lab.cooldown) {
			this.vis.text(`C: ${lab.cooldown}`, x, (y += 0.4), Object.assign({ color: '#FF0000' }, this.toolTipStyle));
		}
	};
	private drawTowerInfo = (tower: StructureTower): void => {
		const needEnergy = tower.energyCapacity - tower.energy;
		if (needEnergy > 0)
			this.vis.text(`${Util.emoji.fueling} ${needEnergy}`, tower.pos.x, tower.pos.y, this.toolTipStyle);
	};
	private drawTransactions = (room: Room): void => {
		if (!room.terminal) return;
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

		_.forEach(transactions, (transaction: Transaction) => {
			const outgoing = transaction.sender ? transaction.sender.username === room.controller.owner.username : false;
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
			this.vis.text(text, x, y, { font: this.toolTipStyle.font, color: colour });

			y += 0.4;
		});
	};
	private highlightWeakest = (room: Room, structureType: string): void => {
		const weakest = _(room.find(FIND_STRUCTURES))
			.filter({ structureType })
			.min('hits');
		if (weakest && weakest.pos) {
			this.vis.circle(weakest.pos.x, weakest.pos.y, this.weakestStyle);
			let y = weakest.pos.y - 0.5;
			const look = weakest.pos.lookFor(LOOK_STRUCTURES);
			const towers: StructureTower = _.find(look, (o: Structure) => o instanceof StructureTower);
			if (towers && VISUALS.TOWER) {
				y += 0.4;
			} else {
				const spawns: StructureSpawn = _.find(look, (o: Structure) => o instanceof StructureSpawn && o.spawning);
				if (spawns && VISUALS.SPAWN) {
					y += 0.4;
				} else {
					const labs: StructureLab = _.find(look, (o: Structure) => o instanceof StructureLab);
					if (labs && VISUALS.LABS) {
						if (labs.energy) y += 0.4;
						if (labs.mineralAmount) y += 0.4;
						if (labs.cooldown) y += 0.4;
					}
				}
			}
			this.vis.text(
				`H: ${Util.formatNumber(weakest.hits)} (${(weakest.hits / weakest.hitsMax * 100).toFixed(2)}%)`,
				weakest.pos.x + 1,
				y,
				this.toolTipStyle,
			);
		}
	};
}
