import { RoomExtra } from '../Extra';

class BoostProductionExtra extends RoomExtra {
	constructor() {
		super('boostProduction');
	}

	analyze = () => {
		this.boostProduction();
	};

	prototypeExtend = () => {
		this.assignRoomPrototype({
			resetBoostProduction: {
				value(): void {
					Util.resetBoostProduction(this.name);
				},
			},
		});
	};

	boostProduction = () => {
		if (!MAKE_COMPOUNDS) return;

		let roomTrading = Memory.boostTiming.roomTrading;

		if (roomTrading.boostAllocation || roomTrading.reallocating) return;

		// make compounds
		if (Game.time % MAKE_COMPOUNDS_INTERVAL === 0) {
			const myRooms = _.filter(Game.rooms, { my: true });
			const orderingRoom = Util.orderingRoom();
			const reactionPlacedRoom = _.some(myRooms, room => {
				let data = room.memory.resources;
				if (!data || !data.boostTiming) return false;
				return data.boostTiming.roomState === 'reactionPlaced';
			});
			const numberOfOrderingRooms = orderingRoom.length;
			let roomFound = false;

			for (let room of myRooms) {
				let data = room.memory.resources;

				if (_.isUndefined(data)) continue;

				const boostTiming = data.boostTiming;
				const reactionMade = () => {
					if (data.reactions.orders.length === 0) return false;
					let reactionCompound = data.reactions.orders[0].type;
					return _.some(data.lab, lab => {
						let labObject = Game.getObjectById(lab.id);
						return labObject.mineralType === reactionCompound && labObject.mineralAmount > 0;
					});
				};

				// ordersPlaced => reactionMaking
				if (data.orders.length === 0 || _.sum(data.orders, 'amount') === 0) {
					if (boostTiming.roomState === 'ordersPlaced') {
						let reactionMaking = reactionMade();
						if (reactionMaking) {
							boostTiming.roomState = 'reactionMaking';
							boostTiming.checkRoomAt = Game.time;
							delete boostTiming.getOfferAttempts;
							Log.module(room.name, `${room.name} orders done.`);
						}
					}
				}

				// inactive rooms => try to make reactions
				if (numberOfOrderingRooms === 0 && !reactionPlacedRoom && !roomFound) roomFound = room.makeReaction();

				// log and fix next finishing reactions data
				if (
					data.reactions &&
					data.reactions.reactorMode === 'burst' &&
					data.boostTiming.roomState === 'reactionMaking' &&
					boostTiming.checkRoomAt - Game.time <= 150 &&
					Game.time % 50 === 0
				) {
					let reactionOrder = data.reactions.orders[0];
					Log.module(
						room.name,
						`${room.name}, finishing ${reactionOrder.type}. checkRoomAt: ${boostTiming.checkRoomAt - Game.time}`,
					);
					const labA = Game.getObjectById(data.reactions.seed_a);
					const labB = Game.getObjectById(data.reactions.seed_b);
					const orderType = reactionOrder.type;
					const component_a = LAB_REACTIONS[orderType][0];
					const component_b = LAB_REACTIONS[orderType][1];
					const reactionAmount = reactionOrder.amount;
					const labOrderAmounts = room.getSeedLabOrders();
					const labOrderAmountA = labOrderAmounts.labOrderAmountA;
					const labOrderAmountB = labOrderAmounts.labOrderAmountB;
					const resourcesA = room.resourcesAll[component_a];
					const resourcesB = room.resourcesAll[component_b];
					const labResourcesA = labA.mineralAmount + labOrderAmountA;
					const labResourcesB = labB.mineralAmount + labOrderAmountB;

					Log.module(room.name, `reactionAmount ${reactionAmount}`);
					Log.module(
						room.name,
						`labs stored: seed_a: ${labA.mineralAmount} ${component_a} seed_b: ${labB.mineralAmount} ${component_b}`,
					);

					Log.module(
						room.name,
						`labs ordered: seed_a: ${labOrderAmountA} ${component_a} seed_b: ${labOrderAmountB} ${component_b}`,
					);

					if (labResourcesA === reactionAmount && labResourcesB === reactionAmount) {
						Log.module(room.name, `lab orders OK`);
						if (reactionAmount > 0) {
							if (
								((_.isUndefined(resourcesA) || resourcesA === 0) && labA.mineralAmount < LAB_REACTION_AMOUNT) ||
								((_.isUndefined(resourcesB) || resourcesB === 0) && labB.mineralAmount < LAB_REACTION_AMOUNT)
							) {
								reactionOrder.amount = 0;
								Log.module(room.name, `resources NOT OK`);
								Log.module(room.name, `resourcesA: ${resourcesA} resourcesB: ${resourcesB}`);
								Log.module(room.name, `reactionOrders fixed: ${reactionOrder.amount}`);
							}
						}
					} else if (reactionAmount > labResourcesA || reactionAmount > labResourcesB) {
						Log.module(room.name, `NOT ENOUGH lab orders:`);
						Log.module(
							room.name,
							`${room.name} reactionAmount: ${reactionAmount} DIFF: labA: ${labResourcesA -
								reactionAmount} labB: ${labResourcesB - reactionAmount}`,
						);
						let minAmount = Math.min(labResourcesA, labResourcesB);
						if (minAmount >= LAB_REACTION_AMOUNT) reactionOrder.amount = minAmount;
						else reactionOrder.amount = 0;
						Log.module(room.name, `reactionOrders fixed: ${reactionOrder.amount}`);
					} else if (reactionAmount < labResourcesA || reactionAmount < labResourcesB) {
						Log.module(room.name, `TOO MUCH lab orders:`);
						Log.module(
							room.name,
							`${room.name} reactionAmount: ${reactionAmount} DIFF: labA: ${labResourcesA -
								reactionAmount} labB: ${labResourcesB - reactionAmount}`,
						);
						let minAmount = Math.min(labResourcesA, labResourcesB);
						if (minAmount >= LAB_REACTION_AMOUNT) reactionOrder.amount = minAmount;
						else reactionOrder.amount = 0;
						Log.module(room.name, `reactionOrders fixed: ${reactionOrder.amount}`);
					}
				}

				if (Game.time >= boostTiming.checkRoomAt) {
					// reactionMakingRooms
					if (data.boostTiming.roomState === 'reactionMaking') {
						if (_.sum(data.reactions.orders, 'amount') > 0) {
							boostTiming.reactionMaking = Game.time;
							room.countCheckRoomAt();
							Log.module(room.name, `${room.name} checkRoomAt counted: ${boostTiming.checkRoomAt - Game.time}`);
						} else {
							Log.module('BoostPriduction', `Game.time: ${Game.time}`);
							Log.module(room.name, `reactions done in in ${room.name}`);
							data.boostTiming = {};
						}
					}
				}
			}
		}
	};
}

export default new BoostProductionExtra();
