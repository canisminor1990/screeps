import { RoomExtra } from '../Extra';

class OrdersExtra extends RoomExtra {
	constructor() {
		super('orders');
	}

	analyzeRoom = (room: Room, needMemoryResync?: boolean): void => {
		if (room.memory.resources) {
			const orders = room.memory.resources.orders;
			const offers = room.memory.resources.offers;
			if (orders.length > 0 && orders[0].amount === 0) orders.shift();
			if (offers.length > 0 && offers[0].amount === 0) orders.shift();
		}
		if (Game.time % PROCESS_ORDERS_INTERVAL === 0) {
			room.updateResourceOrders();
			let orderingRoom = Util.orderingRoom();
			if (orderingRoom.length > 1) {
				room.updateRoomOrders();
				room.terminalBroker();
			}
		}
	};
	prototypeExtend = () => {
		Util.define(Room, RoomOrderExtend);
	};
}

class RoomOrderExtend extends Room {
	constructor() {}

	GCOrders() {
		const data = this.memory.resources;
		const myRooms: Room[] = _.filter(Game.rooms, { my: true });

		if (_.isUndefined(data)) {
			Log.room(this.name, Util.emoji.order, `There is no ${this.name}.memory.resources.`);
			return;
		}

		if (data.orders.length === 0) return;
		Log.room(this.name, Util.emoji.order, `Garbage collecting ${this.name} roomOrders`);

		const reactions = data.reactions;
		const reactionInProgress = reactions.orders.length > 0 && reactions.orders[0].amount > 0;

		// garbage collecting room.orders
		if (reactionInProgress) {
			const reactionsOrders = reactions.orders[0];
			const componentA = LAB_REACTIONS[reactionsOrders.type][0];
			const componentB = LAB_REACTIONS[reactionsOrders.type][1];

			data.orders = _.filter(data.orders, order => {
				return (
					order.amount > 0 &&
					(order.type === componentA ||
						order.type === componentB ||
						(!_.isUndefined(COMPOUNDS_TO_ALLOCATE[order.type]) && COMPOUNDS_TO_ALLOCATE[order.type].allocate))
				);
			});
		} else {
			data.orders = _.filter(data.orders, order => {
				return (
					order.amount > 0 &&
					!_.isUndefined(COMPOUNDS_TO_ALLOCATE[order.type]) &&
					COMPOUNDS_TO_ALLOCATE[order.type].allocate
				);
			});
		}

		if (!this.ordersWithOffers()) {
			Log.room(this.name, Util.emoji.order, `not enough or no offers found.`);
			if (_.isUndefined(data.boostTiming.getOfferAttempts)) data.boostTiming.getOfferAttempts = 0;
			else data.boostTiming.getOfferAttempts++;

			// GCAllRoomOffers
			Log.room(this.name, Util.emoji.order, `${this.name} running room offers...`);
			for (let room of myRooms) {
				if (!room.memory.resources) continue;
				const offers = room.memory.resources.offers;
				let targetOfferIdx;

				for (let i = 0; i < offers.length; i++) {
					let offer = offers[i];
					let targetRoom = Game.rooms[offer.room];
					if (!(targetRoom && targetRoom.memory && targetRoom.memory.resources && targetRoom.memory.resources.orders))
						continue;
					let order = targetRoom.memory.resources.orders.find(o => {
						return o.id === offer.id && o.type === offer.type;
					});

					if (order) {
						targetOfferIdx = order.offers.findIndex(o => {
							return o.room === room.name;
						});
					}

					if (!order || targetOfferIdx === -1) {
						Log.room(this.name, Util.emoji.order, `Orphaned offer found and deleted in ${room.print}.`);
						offers.splice(i, 1);
						i--;
					}
				}
			}
			if (data.boostTiming.getOfferAttempts < 3) {
				this.updateRoomOrders();
				data.boostTiming.ordersPlaced = Game.time;
				data.boostTiming.checkRoomAt = Game.time + 1;
				return true;
			} else {
				data.orders = [];
				data.reactions.orders[0].amount = 0;
				delete data.boostTiming.getOfferAttempts;
				Log.room(this.name, Util.emoji.order, `no offers found, Reaction and orders deleted.`);
			}
		} else {
			data.boostTiming.checkRoomAt = Game.time + CHECK_ORDERS_INTERVAL;
			return false;
		}
	}

	GCOffers() {
		const data = this.memory.resources;
		let terminalOrderPlaced = false;
		let readyOffersFound = 0;

		if (_.isUndefined(data)) {
			Log.room(this.name, Util.emoji.order, Dye(COLOR_RED, `there is no ${this.name}.memory.resources.`));
			return {
				readyOffersFound: readyOffersFound,
				terminalOrderPlaced: terminalOrderPlaced,
			};
		}

		if (data.offers.length === 0)
			return {
				readyOffersFound: readyOffersFound,
				terminalOrderPlaced: terminalOrderPlaced,
			};

		Log.room(this.name, Util.emoji.order, `Garbage collecting for room offers`);

		// garbage collecting room.offers
		data.offers = _.filter(data.offers, offer => {
			const orderRoom = Game.rooms[offer.room];
			const orderRoomOrders = orderRoom.memory.resources.orders;
			const resourcesAll = this.resourcesAll[offer.type];

			for (let i = 0; i < orderRoomOrders.length; i++) {
				let order = orderRoomOrders[i];

				if (offer.id === order.id && !_.isUndefined(resourcesAll) && resourcesAll >= 0) return true;
				else if (offer.id === order.id) {
					orderRoom.memory.resources.orders[i].offers = [];
					return false;
				}
			}
			return false;
		});

		// checking terminal orders
		if (data.offers.length > 0) {
			for (let offer of data.offers) {
				let readyAmount = this.terminal.store[offer.type] || 0;

				Log.room(this.name, Util.emoji.order, `${readyAmount} / ${offer.amount} ${offer.type} are in terminal`);

				if (
					(readyAmount >= offer.amount * 0.5 && readyAmount < offer.amount - MIN_OFFER_AMOUNT) ||
					readyAmount >= offer.amount
				) {
					Log.room(
						this.name,
						Util.emoji.order,
						Dye(
							COLOR_GREEN,
							`${Math.min(readyAmount, offer.amount)} ${offer.type} are ready to send from ${offer.room}`,
						),
					);
					readyOffersFound++;
				} else {
					// make order in offerRoom terminal

					// TODO for new room. is it needed? first time problem. Someone else has to be to this...
					if (this.memory.resources.terminal.length === 0)
						this.memory.resources.terminal.push({
							id: this.terminal.id,
							orders: [],
						});

					const terminalMemory = this.memory.resources.terminal[0];
					const terminalId = this.memory.resources.terminal[0].id;
					const terminal = this.terminal;

					// garbage collecting offerRoom terminal orders
					if (terminalMemory.orders.length > 0) {
						terminalMemory.orders = _.filter(terminalMemory.orders, order => {
							return (
								(order.orderRemaining > 0 || order.storeAmount > 0) &&
								_.some(data.offers, offer => {
									return (
										offer.type === order.type &&
										offer.amount === order.orderRemaining + (terminal.store[offer.type] || 0)
									);
								})
							);
						});
					}

					// making terminal orders if it does not exist
					for (let offer of data.offers) {
						const ordered = Util.sumCompoundType(terminalMemory.orders, 'orderRemaining');
						const allResources = (ordered[offer.type] || 0) + (terminal.store[offer.type] || 0);
						if (offer.amount > allResources) {
							Log.room(
								this.name,
								Util.emoji.order,
								`no / not enough terminal order found for ${offer.amount} ${offer.type}`,
							);
							Log.room(
								this.name,
								Util.emoji.order,
								`terminal stores: ${terminal.store[offer.type] || 0} ordered: ${ordered[offer.type] || 0}`,
							);
							Log.room(
								this.name,
								Util.emoji.order,
								`terminal order placed for ${Math.max(offer.amount, MIN_OFFER_AMOUNT)} ${offer.type}`,
							);
							this.placeOrder(terminalId, offer.type, Math.max(offer.amount, MIN_OFFER_AMOUNT));
							terminalOrderPlaced = true;
						} else
							Log.room(
								this.name,
								Util.emoji.order,
								Dye(COLOR_GREEN, `Terminal orders for ${offer.amount} ${offer.type} is OK.`),
							);
					}
				}
			}
		}

		return {
			readyOffersFound: readyOffersFound,
			terminalOrderPlaced: terminalOrderPlaced,
		};
	}

	GCLabs() {
		Log.room(this.name, Util.emoji.lab, `Garbage collecting lab orders.`);

		const data = this.memory.resources;
		const labs = data.lab;
		const reactions = data.reactions;
		const reactionsOrders = reactions.orders[0];

		for (let i = 0; i < labs.length; i++) {
			const lab = labs[i];
			let order;

			if (lab.orders.length > 0) {
				if (data.reactions.orders.length > 0) {
					const componentA = LAB_REACTIONS[reactionsOrders.type][0];
					const componentB = LAB_REACTIONS[reactionsOrders.type][1];

					order = _.filter(lab.orders, liveOrder => {
						if (
							(liveOrder.orderAmount > 0 || liveOrder.orderRemaining > 0 || liveOrder.storeAmount > 0) &&
							(liveOrder.type === componentA ||
								liveOrder.type === componentB ||
								liveOrder.type === 'energy' ||
								lab.reactionState === 'Storage')
						)
							return liveOrder;
					});
				} else {
					order = _.filter(lab.orders, liveOrder => {
						if (liveOrder.type === 'energy' || lab.reactionState === 'Storage') return liveOrder;
					});
				}

				if (lab.orders.length > order.length) {
					this.memory.resources.lab[i].orders = order;
					Log.room(this.name, Util.emoji.lab, `Lab orders fixed in ${this.name}, ${lab.id}`);
				}
			}
		}
	}

	checkOffers() {
		if (Memory.boostTiming.multiOrderingRoomName === this) {
			Log.room(this.name, Util.emoji.order, `Early room check, multiOrdering in progress`);
			return true;
		}

		const data = this.memory.resources;
		const orders = data.orders;
		let candidates = [];
		let terminalOrderPlaced = false;
		let returnValue;

		for (let order of orders) {
			if (order.offers.length > 0) {
				for (let offer of order.offers) {
					let roomTested = _.some(candidates, room => {
						return room.room === offer.room;
					});

					if (!roomTested) {
						let offerRoom = Game.rooms[offer.room];
						returnValue = offerRoom.GCOffers();

						if (returnValue.terminalOrderPlaced) terminalOrderPlaced = true;

						if (returnValue.readyOffersFound > 0) {
							candidates.push({
								room: offer.room,
								readyOffers: returnValue.readyOffersFound,
							});
						}
					}
				}
			}
		}

		if (candidates.length === 1 && candidates[0].readyOffers === 1 && _.isUndefined(data.boostTiming.ordersReady)) {
			let currentRoom = Game.rooms[candidates[0].room];
			Log.room(
				this.name,
				Util.emoji.order,
				`There is only one offersReady from ${candidates[0].room}, running fill room order...`,
			);
			let fillARoomOrdersReturn = false;
			if (currentRoom.terminal.cooldown === 0) {
				fillARoomOrdersReturn = currentRoom.fillARoomOrder();
				if ((fillARoomOrdersReturn === true && data.orders.length === 0) || _.sum(data.orders, 'amount') === 0) {
					data.boostTiming.checkRoomAt = Game.time + 1;
					Log.room(
						this.name,
						Util.emoji.order,
						`${currentRoom.name} terminal send was successful. And there are no more orders`,
					);
					Log.room(
						this.name,
						Util.emoji.order,
						`time: ${Game.time} boost timing:`,
						'<br/>',
						Util.jsonToTable(data.boostTiming),
					);

					return true;
				} else if (fillARoomOrdersReturn === true) {
					data.boostTiming.checkRoomAt = Game.time + CHECK_ORDERS_INTERVAL;
					Log.room(
						this.name,
						Util.emoji.order,
						`${currentRoom.name} terminal send was successful. BTW, there are orders remained to fulfill`,
					);
					Log.room(
						this.name,
						Util.emoji.order,
						`time: ${Game.time}, boostTiming:`,
						'<br/>',
						Util.jsonToTable(data.boostTiming),
					);
					return true;
				}
			} else {
				data.boostTiming.checkRoomAt = Game.time + currentRoom.terminal.cooldown + 1;
				Log.room(
					this.name,
					Util.emoji.order,
					`${currentRoom.name} terminal cooldown is: ${currentRoom.terminal.cooldown}`,
				);
				Log.room(
					this.name,
					Util.emoji.order,
					`time: ${Game.time}, boosTiming:`,
					'<br/>',
					Util.jsonToTable(data.boostTiming),
				);

				return false;
			}
		} else if (
			(candidates.length >= 1 || (candidates.length === 1 && candidates[0].readyOffers > 1)) &&
			_.isUndefined(data.boostTiming.ordersReady)
		) {
			Log.room(this.name, Util.emoji.order, `has more than one offers ready, boostTiming.ordersReady created`);
			Log.stringify(candidates);
			data.boostTiming.ordersReady = {
				time: Game.time,
				orderCandidates: candidates,
			};
			if (!Memory.boostTiming) Memory.boostTiming = {};
			Memory.boostTiming.multiOrderingRoomName = this.name;
			data.boostTiming.checkRoomAt = Game.time + _.sum(candidates, 'readyOffers') + 1;
			return true;
		} else if (returnValue.terminalOrderPlaced) {
			Log.room(this.name, Util.emoji.order, `terminal orders placed.`);
			data.boostTiming.checkRoomAt = Game.time + CHECK_ORDERS_INTERVAL;
			return false;
		} else {
			Log.room(this.name, Util.emoji.order, `${this.name} no ready offers found.`);
			data.boostTiming.checkRoomAt = Game.time + CHECK_ORDERS_INTERVAL;
			return false;
		}
	}

	ordersWithOffers() {
		const orders = this.memory.resources.orders;
		if (orders.length === 0) return false;
		return _.some(orders, order => {
			let orderOffersAmount = _.sum(order.offers, 'amount') || 0;
			return orderOffersAmount >= order.amount && order.amount > 0;
		});
	}

	makeReaction() {
		let roomFound = {};
		let amountToMake;
		const makeCompound = (roomName, compound, amount) => {
			let currentRoom = Game.rooms[roomName];
			if (currentRoom.memory.labs) {
				if (currentRoom.memory.labs.length < 3) return false;
				else if (currentRoom.memory.labs.length === 3 && !MAKE_REACTIONS_WITH_3LABS) return false;
			} else return false;
			if (_.isUndefined(currentRoom.memory.resources)) return false;
			if (_.isUndefined(currentRoom.memory.resources.reactions)) return false;
			const data = currentRoom.memory.resources.reactions;
			const whatNeeds = (compound, amount) => {
				if (compound.length === 1 && compound !== 'G') return;

				const sumStorage = mineral => {
					const myRooms = _.filter(Game.rooms, { my: true });
					let roomStored = 0;

					for (let room of myRooms) {
						let resourcesAll = room.resourcesAll[mineral] || 0;
						if (resourcesAll >= MIN_OFFER_AMOUNT) roomStored += resourcesAll;
					}

					return roomStored;
				};
				const ingredientNeeds = (compound, amount) => {
					// this amount has to be produced in this room
					const storedAll = sumStorage(compound);
					const storedRoom = currentRoom.resourcesAll[compound] || 0;
					const storedOffRoom = storedAll - storedRoom;
					let ingredientNeeds;

					if (storedOffRoom < TRADE_THRESHOLD) {
						ingredientNeeds = amount - storedRoom;
						if (ingredientNeeds < 0) ingredientNeeds = 0;
						else if (ingredientNeeds < MIN_COMPOUND_AMOUNT_TO_MAKE) ingredientNeeds = MIN_COMPOUND_AMOUNT_TO_MAKE;
					} else {
						ingredientNeeds = amount - storedAll;
						if (ingredientNeeds < 0) ingredientNeeds = 0;
						else if (ingredientNeeds < MIN_COMPOUND_AMOUNT_TO_MAKE) ingredientNeeds = MIN_COMPOUND_AMOUNT_TO_MAKE;
					}

					return Util.roundUpTo(ingredientNeeds, MIN_OFFER_AMOUNT);
				};
				const findIngredients = (compound, amount) => {
					const ingredientA = LAB_REACTIONS[compound][0];
					const ingredientB = LAB_REACTIONS[compound][1];

					return {
						[ingredientA]: ingredientNeeds(ingredientA, amount),
						[ingredientB]: ingredientNeeds(ingredientB, amount),
					};
				};
				const slicer = (compound, amount) => {
					let product = {};
					let returnValue = {};
					const slice = stuff => {
						if (Object.keys(stuff).length === 0) return false;
						else return stuff;
					};

					product[compound] = findIngredients(compound, amount);

					Object.keys(product).forEach(ingredients => {
						Object.keys(product[ingredients]).forEach(ingredient => {
							if (ingredient.length > 1 || ingredient === 'G')
								returnValue[ingredient] = product[ingredients][ingredient];
						});
					});

					return {
						product: product,
						slice: slice(returnValue),
					};
				};
				let returnObject = slicer(compound, amount);
				let product = returnObject.product;
				let slices = returnObject.slice;

				do {
					let returnArray = [];

					Object.keys(slices).forEach(slice => {
						returnObject = slicer(slice, slices[slice]);
						product[slice] = returnObject.product[slice];
						returnArray.push(returnObject.slice);
					});
					slices = {};
					for (let slice of returnArray) slices = Object.assign(slices, slice);
				} while (_.some(slices, Object));

				return product;
			};
			const purchaseMinerals = (roomName, mineral, amount) => {
				if (!PURCHASE_MINERALS) {
					Log.error(`${roomName} needs to buy ${amount} ${mineral} but PURCHASE_MINERALS is false`);
					return false;
				}

				if (currentRoom.storage.charge < STORE_CHARGE_PURCHASE) {
					Log.warn(
						`storage.charge in ${roomName} is ${currentRoom.storage.charge}, purchase for ${mineral} is delayed`,
					);
					return false;
				}

				if (currentRoom.terminal.cooldown > 0) {
					Log.warn(
						`terminal.coolDown in ${roomName} is ${currentRoom.terminal.cooldown}, purchase for ${mineral} is delayed`,
					);
					return false;
				}

				if (data.reactorMode !== 'idle') {
					return false;
				}

				Log.room(this.name, Util.emoji.terminal, Dye(COLOR_GREEN, `buying ${amount} ${mineral} in ${roomName}.`));

				let sellRatio;

				if (AUTOMATED_RATIO_COUNT) {
					sellRatio = Util.countPrices(ORDER_SELL, mineral, roomName);
					Log.room(this.name, Util.emoji.terminal, `avg sell ratio: ${roomName} ${mineral} ${sellRatio}`);
				} else {
					sellRatio = MAX_BUY_RATIO[mineral];
				}
				let order;
				let returnValue;
				const resOrders = Game.market.getAllOrders(o => {
					const currentRoom = Game.rooms[roomName];
					let transactionCost;
					let credits;

					if (o.type !== ORDER_SELL) return false;
					if (o.resourceType !== mineral) return false;

					o.transactionAmount = Math.min(o.amount, amount);

					transactionCost = Game.market.calcTransactionCost(o.transactionAmount, o.roomName, roomName);

					if (transactionCost > currentRoom.terminal.store[RESOURCE_ENERGY]) return false;

					credits = o.transactionAmount * o.price;

					if (Game.market.credits < credits) {
						o.transactionAmount = Game.market.credits / o.price;
						if (o.transactionAmount === 0) return false;
					}
					o.ratio = (credits - transactionCost * ENERGY_VALUE_CREDITS) / o.transactionAmount;

					if (o.price > sellRatio || o.ratio > sellRatio || o.amount < 100) return false;
					// if (o.ratio > sellRatio || o.amount < 100) return false;

					return true;
				});

				if (resOrders.length > 0) {
					order = _.min(resOrders, 'ratio');
					Log.room(this.name, Util.emoji.order, 'selected order: ', '<br/>', Util.jsonToTable(order));
					if (order) {
						Log.room(
							this.name,
							Util.emoji.terminal,
							Dye(COLOR_BLUE, `Market deal: ${order.id} ${order.transactionAmount} from ${roomName}`),
						);
					}
					returnValue = Game.market.deal(order.id, order.transactionAmount, roomName);
					if (returnValue === OK) {
						Log.room(
							this.name,
							Util.emoji.terminal,
							Dye(
								COLOR_GREEN,
								`Purchased ${order.transactionAmount} ${mineral} at price: ${
									order.price
								} it costs: ${order.transactionAmount * order.price}`,
							),
						);
						return true;
					} else {
						Log.error(`purchase was FAILED error code: ${Util.translateErrorCode(returnValue)}`);
						return false;
					}
				} else {
					if (sellRatio === 0) Log.warn(`There are no sellOrders for ${mineral}`);
					else {
						Log.warn(
							`No sell order found for ${amount} ${mineral} at ratio ${MAX_BUY_RATIO[mineral]} in room ${roomName}`,
						);
						Log.warn(
							`You need to adjust MAX_BUY_RATIO or use AUTOMATED_RATIO_COUNT: true in parameters, current is: ${
								MAX_BUY_RATIO[mineral]
							}, recommended: ${sellRatio}`,
						);
					}

					return false;
				}
			};
			const makeIngredient = (roomName, ingredient, amount) => {
				if (_.isUndefined(data) || data.reactorType !== 'flower') {
					Log.room(roomName, Util.emoji.lab, Dye(COLOR_ORANGE, `labs are not registered as flower`));
					return false;
				}

				const currentRoom = Game.rooms[roomName];
				let returnValue = false;

				if (data.reactorMode === 'idle') {
					Log.room(
						roomName,
						Util.emoji.lab,
						`${currentRoom.name} - placeReactionOrder(${ingredient}, ${ingredient}, ${amount})`,
					);

					// garbage collecting labs
					currentRoom.GCLabs();

					// place the reaction order
					currentRoom.placeReactionOrder(ingredient, ingredient, amount);
					Memory.boostTiming.roomTrading.boostProduction = true;
					Memory.boostTiming.timeStamp = Game.time;
					Log.room(currentRoom, `${currentRoom.name}, placeReaction ${amount} ${ingredient} at time: ${Game.time}`);
					let boostTiming = currentRoom.memory.resources.boostTiming;
					boostTiming.roomState = 'reactionPlaced';
					returnValue = true;
				}

				return returnValue;
			};
			const product = whatNeeds(compound, amount);
			let mineralPurchased = false;
			let ingredientMade = false;
			let compoundArray = [];
			let currentCompound;

			if (!currentRoom.storage || !currentRoom.terminal) {
				Log.warn(`there are no storage/terminal in ${currentRoom.name}`);
				return false;
			}

			if (_.isUndefined(currentRoom.memory.labs) || currentRoom.memory.labs.length === 0) {
				Log.warn(`there are no labs in ${currentRoom.name}`);
				return false;
			}

			if (
				currentRoom.terminal.isActive() === false ||
				currentRoom.storage.isActive() === false ||
				Game.getObjectById(currentRoom.memory.labs[0].id).isActive() === false
			)
				return false;

			Object.keys(product).forEach(ingredients => {
				Object.keys(product[ingredients]).forEach(ingredient => {
					let ingredientAmount = product[ingredients][ingredient];

					if (ingredientAmount > 0 && !mineralPurchased) {
						// purchase minerals if it can not be ordered
						if (
							ingredient.length === 1 &&
							ingredient !== 'G' &&
							(currentRoom.resourcesAll[ingredient] || 0) < ingredientAmount &&
							!mineralPurchased
						) {
							mineralPurchased = purchaseMinerals(roomName, ingredient, ingredientAmount);
							if (!mineralPurchased)
								return {
									ingredientMade: ingredientMade,
									mineralPurchased: mineralPurchased,
								};
						}
						// if ingredient can make, collect the compounds
						if (!mineralPurchased) {
							if (ingredient.length > 1 || ingredient === 'G')
								compoundArray.push({
									compound: ingredient,
									amount: ingredientAmount,
								});
						}
					}
				});
			});
			// define tier 3 compound
			if (compoundArray.length === 0)
				compoundArray.push({
					compound: compound,
					amount: amount,
				});
			// make the compound
			if (!mineralPurchased) {
				currentCompound = compoundArray[compoundArray.length - 1];
				ingredientMade = makeIngredient(roomName, currentCompound.compound, currentCompound.amount);
			}
			return {
				ingredientMade: ingredientMade,
				mineralPurchased: mineralPurchased,
			};
		};

		Object.keys(COMPOUNDS_TO_MAKE).forEach(compound => {
			if (
				COMPOUNDS_TO_MAKE[compound].make &&
				!roomFound.ingredientMade &&
				(this.name.indexOf(COMPOUNDS_TO_MAKE[compound].rooms) > -1 || COMPOUNDS_TO_MAKE[compound].rooms.length === 0)
			) {
				let storedResources = this.resourcesAll[compound] || 0;

				if (storedResources === 0) {
					amountToMake = Util.roundUpTo(
						COMPOUNDS_TO_MAKE[compound].amount + COMPOUNDS_TO_MAKE[compound].threshold,
						MIN_OFFER_AMOUNT,
					);
					roomFound = makeCompound(this.name, compound, amountToMake);
					if (roomFound.ingredientMade)
						Log.room(
							this.name,
							`there is no ${compound}, so start to make the compounds for ${
								COMPOUNDS_TO_MAKE[compound].amount
							} ${compound} in ${this.name}`,
						);
				} else if (storedResources <= COMPOUNDS_TO_MAKE[compound].threshold) {
					amountToMake = Util.roundUpTo(
						COMPOUNDS_TO_MAKE[compound].amount + COMPOUNDS_TO_MAKE[compound].threshold - storedResources,
						MIN_OFFER_AMOUNT,
					);
					roomFound = makeCompound(this.name, compound, amountToMake);
					if (roomFound.ingredientMade)
						Log.room(
							this.name,
							`it is below the threshold, so start to make the compounds for ${amountToMake} ${compound} in ${
								this.name
							}`,
						);
				}
			}
		});

		return roomFound.ingredientMade || roomFound.mineralPurchased;
	}

	storedMinerals(mineral) {
		let returnValue =
			(this.resourcesStorage[mineral] || 0) +
			(this.resourcesTerminal[mineral] || 0) -
			(this.resourcesOffers[mineral] || 0) -
			(this.resourcesReactions[mineral] || 0);
		if (returnValue < 0) returnValue = 0;
		return returnValue;
	}

	countCheckRoomAt() {
		const data = this.memory.resources;
		const boostTiming = data.boostTiming;
		const numberOfLabs = data.lab.length;
		const reactionCoolDown = REACTION_TIME[data.reactions.orders[0].type];
		const producedAmountPerTick = LAB_REACTION_AMOUNT;
		const storageLabs = _.filter(data.lab, lab => {
			return lab.reactionState === 'Storage';
		});
		const numberOfSlaveLabs = numberOfLabs - storageLabs.length - 2;
		const allLabsProducedAmountPerTick = producedAmountPerTick * numberOfSlaveLabs / reactionCoolDown;
		const amount = data.reactions.orders[0].amount;

		boostTiming.checkRoomAt =
			boostTiming.reactionMaking +
			Util.roundUpTo(amount / allLabsProducedAmountPerTick, reactionCoolDown) +
			reactionCoolDown;
	}

	getSeedLabOrders() {
		let data = this.memory.resources;
		if (_.isUndefined(data) || _.isUndefined(data.reactions) || data.reactions.orders.length === 0) return;
		const orderType = data.reactions.orders[0].type;
		const component_a = LAB_REACTIONS[orderType][0];
		const component_b = LAB_REACTIONS[orderType][1];
		const labIndexA = data.lab.findIndex(l => {
			return l.id === data.reactions.seed_a;
		});
		const labIndexB = data.lab.findIndex(l => {
			return l.id === data.reactions.seed_b;
		});
		const labOrderA = _.filter(data.lab[labIndexA].orders, order => {
			return order.type === component_a;
		});
		const labOrderB = _.filter(data.lab[labIndexB].orders, order => {
			return order.type === component_b;
		});
		const labOrderAmountA = labOrderA[0].orderRemaining;
		const labOrderAmountB = labOrderB[0].orderRemaining;

		return {
			labOrderAmountA: labOrderAmountA,
			labOrderAmountB: labOrderAmountB,
		};
	}

	updateResourceOrders() {
		let data = this.memory.resources;
		if (!this.my || !data) return;

		// go through reallacation orders and reset completed orders
		for (let structureType in data) {
			for (let i = 0; i < data[structureType].length; i++) {
				let structure = data[structureType][i];
				// don't reset busy labs
				if (structureType == STRUCTURE_LAB && structure.reactionState != LAB_IDLE) continue;
				if (!structure.orders) continue;
				for (let j = 0; j < structure.orders.length; j++) {
					let order = structure.orders[j];
					if (order.orderRemaining <= 0) {
						let baseAmount = 0;
						let rcl = this.RCL;
						if (structureType == STRUCTURE_STORAGE)
							baseAmount = order.type == RESOURCE_ENERGY ? MIN_STORAGE_ENERGY[rcl] : MAX_STORAGE_MINERAL;
						else if (structureType == STRUCTURE_TERMINAL)
							baseAmount = order.type == RESOURCE_ENERGY ? TERMINAL_ENERGY : 0;
						baseAmount += order.storeAmount;
						let amount = 0;
						let cont = Game.getObjectById(structure.id);
						if (cont) {
							switch (structureType) {
								case STRUCTURE_LAB:
									// get lab amount
									if (order.type == cont.mineralType) {
										amount = cont.mineralAmount;
									} else if (order.type == RESOURCE_ENERGY) {
										amount = cont.energy;
									}
									break;
								case STRUCTURE_POWER_SPAWN:
									// get powerSpawn amount
									if (order.type == RESOURCE_POWER) {
										amount = cont.power;
									} else if (order.type == RESOURCE_ENERGY) {
										amount = cont.energy;
									}
									break;
								case STRUCTURE_NUKER:
									// get nuker amount
									if (order.type == RESOURCE_GHODIUM) {
										amount = cont.ghodium;
									} else if (order.type == RESOURCE_ENERGY) {
										amount = cont.energy;
									}
									break;
								default:
									// get stored amount
									amount = cont.store[order.type] || 0;
									break;
							}
						}
						if (amount <= baseAmount) {
							order.orderAmount = 0;
							order.orderRemaining = 0;
						}
					}
				}
			}
		}
	}

	updateRoomOrders() {
		if (!this.memory.resources || !this.memory.resources.orders) return;
		let rooms = _.filter(Game.rooms, room => {
			return room.my && room.storage && room.terminal && room.name !== this.name;
		});
		let orders = this.memory.resources.orders;
		for (let i = 0; i < orders.length; i++) {
			let order = orders[i];
			let amountRemaining = order.amount;
			for (let j = 0; j < order.offers.length; j++) {
				let offer = order.offers[j];
				if (
					Memory.rooms[offer.room] &&
					Memory.rooms[offer.room].resources &&
					Memory.rooms[offer.room].resources.offers
				) {
					let remoteOffers = Memory.rooms[offer.room].resources.offers;
					let idx = remoteOffers.indexOf(o => {
						return o.room === this.name && o.id === order.id && o.type === order.type;
					});
					if (idx !== -1) remoteOffers.splice(idx, 1);
				}
			}
			order.offers = [];
			if (amountRemaining <= 0) {
				// orders.splice(i, 1);
				// i--;
				delete orders[i];
				orders.splice(i--, 1);
			} else {
				rooms.sort((a, b) => {
					return (
						Game.map.getRoomLinearDistance(this.name, a.name, true) -
						Game.map.getRoomLinearDistance(this.name, b.name, true)
					);
				});
				for (let j = 0; j < rooms.length; j++) {
					let room = rooms[j];
					if (room.memory.resources === undefined) {
						room.memory.resources = {
							lab: [],
							container: [],
							terminal: [],
							storage: [],
							powerSpawn: [],
							nuker: [],
						};
					}
					if (!room.memory.resources.offers) room.memory.resources.offers = [];
					let remoteOffers = room.memory.resources.offers;
					let available = room.resourcesAll[order.type] || 0;
					if (available > 0) Log.room(room.name, Util.emoji.order, `available: ${available} ${order.type}`);
					if (available < MIN_OFFER_AMOUNT) continue;

					// for COMPOUNDS_TO_ALLOCATE
					if (!_.isUndefined(COMPOUNDS_TO_ALLOCATE[order.type])) {
						let reservedAmount = COMPOUNDS_TO_ALLOCATE[order.type].amount + COMPOUNDS_TO_ALLOCATE[order.type].threshold;
						if (available < reservedAmount + MIN_OFFER_AMOUNT) continue;
						else available = available - reservedAmount;
					}

					if (amountRemaining < MIN_OFFER_AMOUNT && amountRemaining > 0) amountRemaining = MIN_OFFER_AMOUNT;

					available = Math.min(available, amountRemaining);

					let existingOffer = order.offers.find(o => {
						return o.room === room.name;
					});
					let existingRemoteOffer = remoteOffers.find(o => {
						return o.room === this.name && o.id === order.id && o.type === order.type;
					});
					if (existingOffer) {
						if (LOG_TRACE)
							Log.trace('Room', {
								roomName: this.name,
								remoteRoom: room.name,
								actionName: 'updateRoomOrders',
								subAction: 'update',
								orderId: order.id,
								resourceType: order.type,
								amount: available,
							});
						amountRemaining -= available - existingOffer.amount;
						existingOffer.amount = available;
					} else {
						if (LOG_TRACE)
							Log.trace('Room', {
								roomName: this.name,
								remoteRoom: room.name,
								actionName: 'updateRoomOrders',
								subAction: 'new',
								orderId: order.id,
								resourceType: order.type,
								amount: available,
							});
						Log.room(
							this.name,
							Util.emoji.order,
							Dye(
								COLOR_PURPLE,
								`Room offer from ${room.print} with id ${order.id} placed for ${available} ${order.type}.`,
							),
						);
						amountRemaining -= available;
						order.offers.push({
							room: room.name,
							amount: available,
						});
					}
					if (existingRemoteOffer) {
						existingRemoteOffer.amount = available;
					} else {
						remoteOffers.push({
							room: this.name,
							id: order.id,
							type: order.type,
							amount: available,
						});
					}
					if (amountRemaining <= 0) break;
				}
			}
		}
	}

	fillARoomOrder() {
		if (!(this.terminal && this.memory && this.memory.resources && this.memory.resources.offers)) return false;
		const offers = this.memory.resources.offers;
		let ret = false;
		for (let i = 0; i < offers.length; i++) {
			let offer = offers[i];
			let targetRoom = Game.rooms[offer.room];
			if (!(targetRoom && targetRoom.memory && targetRoom.memory.resources && targetRoom.memory.resources.orders))
				continue;
			let order = targetRoom.memory.resources.orders.find(o => {
				return o.id == offer.id && o.type == offer.type;
			});
			if (!order) continue;
			let targetOfferIdx = order.offers.findIndex(o => {
				return o.room == this.name;
			});
			if (targetOfferIdx == -1) {
				Log.room(this.name, 'Orphaned offer found and deleted');
				offers.splice(i--, 1);
				continue;
			}

			let store = this.terminal.store[offer.type] || 0;
			let onOrder = 0;
			let terminalOrder = null;
			if (this.memory.resources.terminal[0])
				terminalOrder = this.memory.resources.terminal[0].orders.find(o => {
					return o.type == offer.type;
				});
			if (terminalOrder) onOrder = terminalOrder.orderRemaining;
			let amount = Math.max(offer.amount, MIN_OFFER_AMOUNT);
			if (amount > store + onOrder) {
				let amt = amount - (store + onOrder);
				if (LOG_TRACE)
					Log.trace('Room', {
						actionName: 'fillARoomOrder',
						subAction: 'terminalOrder',
						roomName: this.name,
						targetRoomName: targetRoom.name,
						resourceType: offer.type,
						amount: amt,
					});
				this.placeOrder(this.terminal.id, offer.type, amt);
			}
			if (!targetRoom.terminal) continue;
			let space = targetRoom.terminal.storeCapacity - targetRoom.terminal.sum;
			amount = Math.min(amount, space, store);

			let cost = Game.market.calcTransactionCost(amount, this.name, targetRoom.name);
			if (offer.type == RESOURCE_ENERGY) {
				amount -= cost;
				cost += amount;
			}
			if (cost > (this.terminal.store.energy || 0)) continue;
			if (amount < MIN_OFFER_AMOUNT) continue;

			ret = this.terminal.send(offer.type, amount, targetRoom.name, order.id);
			if (ret == OK) {
				if (LOG_TRACE)
					Log.trace('Room', {
						actionName: 'fillARoomOrder',
						roomName: this.name,
						targetRoomName: targetRoom.name,
						resourceType: offer.type,
						amount: amount,
					});
				Log.room(
					this.name,
					Util.emoji.order,
					Dye(COLOR_GREEN, `Send ${offer.type} ${amount} to ${Util.makeRoomUrl(targetRoom.name)}.`),
				);
				offer.amount -= amount;
				if (offer.amount > 0) {
					order.offers[targetOfferIdx].amount = offer.amount;
				} else {
					delete order.offers[targetOfferIdx];
					order.offers.splice(targetOfferIdx, 1);
					delete offers[i];
					offers.splice(i--, 1);
				}
				order.amount -= amount;
				return true;
			} else {
				Log.error(
					`Send Error: ${Util.translateErrorCode(ret)} | ${this.name} send ${
						offer.type
					} ${amount} to ${Util.makeRoomUrl(targetRoom.name)}.`,
				);
			}
		}

		return ret;
	}

	prepareResourceOrder(containerId, resourceType, amount) {
		let container = Game.getObjectById(containerId);
		if (
			!this.my ||
			!container ||
			!container.room.name == this.name ||
			!(
				container.structureType == STRUCTURE_LAB ||
				container.structureType == STRUCTURE_NUKER ||
				container.structureType == STRUCTURE_POWER_SPAWN ||
				container.structureType == STRUCTURE_CONTAINER ||
				container.structureType == STRUCTURE_STORAGE ||
				container.structureType == STRUCTURE_TERMINAL
			)
		) {
			return ERR_INVALID_TARGET;
		}
		if (!RESOURCES_ALL.includes(resourceType)) {
			return ERR_INVALID_ARGS;
		}
		if (this.memory.resources === undefined) {
			this.memory.resources = {
				lab: [],
				powerSpawn: [],
				nuker: [],
				container: [],
				terminal: [],
				storage: [],
			};
		}
		if (this.memory.resources.nuker === undefined) this.memory.resources.nuker = [];
		if (this.memory.resources.powerSpawn === undefined) this.memory.resources.powerSpawn = [];
		if (!this.memory.resources[container.structureType].find(s => s.id == containerId)) {
			this.memory.resources[container.structureType].push(
				container.structureType == STRUCTURE_LAB
					? {
							id: containerId,
							orders: [],
							reactionState: LAB_IDLE,
					  }
					: {
							id: containerId,
							orders: [],
					  },
			);
		}
		if (container.structureType == STRUCTURE_LAB && resourceType != RESOURCE_ENERGY && amount > 0) {
			// clear other resource types since labs only hold one at a time
			let orders = this.memory.resources[STRUCTURE_LAB].find(s => s.id == containerId).orders;
			for (let i = 0; i < orders.length; i++) {
				if (orders[i].type != resourceType && orders[i].type != RESOURCE_ENERGY) {
					orders[i].orderAmount = 0;
					orders[i].orderRemaining = 0;
					orders[i].storeAmount = 0;
				}
			}
		}
		return OK;
	}

	cancelOrder(containerId, resourceType = null) {
		let container = Game.getObjectById(containerId);
		if (this.prepareResourceOrder(containerId, RESOURCE_ENERGY, 0) != OK) return ret;

		let containerData = this.memory.resources[container.structureType].find(s => s.id == containerId);
		if (containerData) {
			if (resourceType) {
				let existingOrder = containerData.orders.find(r => r.type == resourceType);
				if (existingOrder) {
					// delete structure order
					if (LOG_TRACE)
						Log.trace('Room', {
							roomName: this.name,
							actionName: 'cancelOrder',
							orderId: orderId,
							resourceType: resourceType,
						});
					containerData.orders.splice(containerData.orders.indexOf(existingOrder), 1);
				}
			} else {
				// delete all of structure's orders
				if (LOG_TRACE)
					Log.trace('Room', {
						roomName: this.name,
						actionName: 'cancelOrder',
						orderId: orderId,
						resourceType: 'all',
					});
				containerData.orders = [];
			}
		}
		return OK;
	}

	registerBoostLab(labId) {
		let lab = Game.getObjectById(labId);
		if (lab) {
			if (_.isUndefined(this.memory.resources)) {
				this.memory.resources = {
					lab: [],
					powerSpawn: [],
					nuker: [],
					container: [],
					terminal: [],
					storage: [],
				};
			}
			let dataIndex = this.memory.resources.lab.findIndex(x => x.id == labId);
			if (dataIndex > -1) {
				delete this.memory.resources.lab[dataIndex].reactionType;
				this.memory.resources.lab[dataIndex].reactionState = 'Storage';
			} else {
				let obj = { id: labId, orders: [], reactionState: 'Storage' };
				this.memory.resources.lab.push(obj);
			}
		}
	}

	unRegisterBoostLab(labId) {
		const lab = Game.getObjectById(labId);
		const data = this.memory.resources;

		if (lab && data) {
			let dataIndex = this.memory.resources.lab.findIndex(x => x.id === labId);
			if (dataIndex > -1) {
				if (data.reactions.orders.length > 0)
					this.memory.resources.lab[dataIndex].reactionType = this.memory.resources.reactions.orders[0].type;
				this.memory.resources.lab[dataIndex].reactionState = 'idle';
				this.memory.resources.lab[dataIndex].orders = _.filter(
					this.memory.resources.lab[dataIndex].orders,
					'type',
					'energy',
				);
			}
		}
	}

	placeOrder(containerId, resourceType, amount) {
		const container = Game.getObjectById(containerId);
		let ret = this.prepareResourceOrder(containerId, resourceType, amount);
		if (ret != OK) {
			return ret;
		}

		let containerData = this.memory.resources[container.structureType].find(s => s.id == containerId);
		if (containerData) {
			let existingOrder = containerData.orders.find(r => r.type == resourceType);
			if (existingOrder) {
				existingOrder.orderAmount += amount;
				existingOrder.orderRemaining += amount;
			} else {
				let containerStore = 0;
				if (container.structureType === STRUCTURE_LAB) {
					containerStore = container.mineralType == resourceType ? container.mineralAmount : 0;
				} else {
					containerStore = container.store[resourceType] || 0;
				}
				containerData.orders.push({
					type: resourceType,
					orderAmount: amount,
					orderRemaining: amount - containerStore,
					storeAmount: 0,
				});
				if (container.structureType === STRUCTURE_LAB && containerData.reactionState != 'Storage') {
					containerData.reactionType = resourceType;
				}
			}
		}
		return OK;
	}

	setStore(containerId, resourceType, amount) {
		let container = Game.getObjectById(containerId);
		let ret = this.prepareResourceOrder(containerId, resourceType, amount);
		if (ret != OK) {
			return ret;
		}

		let containerData = this.memory.resources[container.structureType].find(s => s.id == containerId);
		if (containerData) {
			let existingOrder = containerData.orders.find(r => r.type == resourceType);
			if (existingOrder) {
				existingOrder.storeAmount = amount;
			} else {
				containerData.orders.push({
					type: resourceType,
					orderAmount: 0,
					orderRemaining: 0,
					storeAmount: amount,
				});
			}
		}
		return OK;
	}

	cancelRoomOrder(orderId = null, resourceType = null) {
		if (this.memory.resources === undefined) {
			this.memory.resources = {
				lab: [],
				powerSpawn: [],
				nuker: [],
				container: [],
				terminal: [],
				storage: [],
			};
		}
		if (this.memory.resources.nuker === undefined) this.memory.resources.nuker = [];
		if (this.memory.resources.powerSpawn === undefined) this.memory.resources.powerSpawn = [];
		if (this.memory.resources.orders === undefined) {
			this.memory.resources.orders = [];
		}
		let orders = this.memory.resources.orders;
		if (orderId && resourceType) {
			let existingOrder = orders.find(o => {
				return o.id == orderId && o.type == resourceType;
			});
			if (existingOrder) {
				// delete existing order
				if (LOG_TRACE)
					Log.trace('Room', {
						roomName: this.name,
						actionName: 'cancelRoomOrder',
						orderId: orderId,
						resourceType: resourceType,
					});
				orders.splice(orders.indexOf(existingOrder), 1);
			}
		} else if (orderId) {
			// delete all orders matching orderId
			if (LOG_TRACE)
				Log.trace('Room', {
					roomName: this.name,
					actionName: 'cancelRoomOrder',
					orderId: orderId,
					resourceType: 'all',
				});
			for (let i = 0; i < orders.length; i++) {
				let order = orders[i];
				if (order.id === orderId) {
					orders.splice(i--, 1);
				}
			}
		} else {
			// delete all orders associated with this room
			this.memory.resources.orders = [];
		}

		return OK;
	}

	placeRoomOrder(orderId, resourceType, amount) {
		if (amount <= 0) return OK;
		if (this.memory.resources === undefined) {
			this.memory.resources = {
				lab: [],
				powerSpawn: [],
				nuker: [],
				container: [],
				terminal: [],
				storage: [],
			};
		}
		if (this.memory.resources.nuker === undefined) this.memory.resources.nuker = [];
		if (this.memory.resources.powerSpawn === undefined) this.memory.resources.powerSpawn = [];
		if (this.memory.resources.orders === undefined) {
			this.memory.resources.orders = [];
		}
		let orders = this.memory.resources.orders;
		let existingOrder = orders.find(o => {
			return o.id == orderId && o.type == resourceType;
		});
		if (existingOrder) {
			// update existing order
			if (LOG_TRACE)
				Log.trace('Room', {
					roomName: this.name,
					actionName: 'placeRoomOrder',
					subAction: 'update',
					orderId: orderId,
					resourceType: resourceType,
					amount: amount,
				});
			existingOrder.amount = amount;
		} else {
			// create new order
			if (LOG_TRACE)
				Log.trace('Room', {
					roomName: this.name,
					actionName: 'placeRoomOrder',
					subAction: 'new',
					orderId: orderId,
					resourceType: resourceType,
					amount: amount,
				});
			Log.room(this.name, `New room order with id ${orderId} placed for ${amount} ${resourceType}.`);
			orders.push({
				id: orderId,
				type: resourceType,
				amount: amount,
				offers: [],
			});
		}
		return OK;
	}

	terminalBroker() {
		if (!this.my || !this.terminal || !this.storage) return;
		if (this.terminal.cooldown && this.terminal.cooldown > 0) return;
		let transacting = false;
		for (const mineral in this.terminal.store) {
			if (mineral === RESOURCE_ENERGY || mineral === RESOURCE_POWER) continue;
			if ((MAKE_COMPOUNDS || ALLOCATE_COMPOUNDS) && mineral !== this.memory.mineralType) continue;
			let terminalFull = this.terminal.sum === this.terminal.storeCapacity > 0.8;

			if (this.terminal.store[mineral] >= MIN_MINERAL_SELL_AMOUNT) {
				let buyRatio;
				if (AUTOMATED_RATIO_COUNT) {
					buyRatio = Util.countPrices(ORDER_BUY, mineral, this.name);
					if (buyRatio === 0) {
						Log.room(this.name, Util.emoji.terminal, Dye(COLOR_ORANGE, `there is no buy order for ${mineral}`));
					} else {
						Log.room(
							this.name,
							Util.emoji.terminal,
							Dye(COLOR_BLUE, `auto-count avg buy ratio: ${mineral} ${buyRatio}`),
						);
					}
				} else {
					buyRatio = MIN_SELL_RATIO[mineral];
				}

				let orders = Game.market.getAllOrders(o => {
					if (!o.roomName || o.resourceType != mineral || o.type != ORDER_BUY || o.amount < MIN_MINERAL_SELL_AMOUNT)
						return false;

					o.range = Game.map.getRoomLinearDistance(o.roomName, this.name, true);
					o.transactionAmount = Math.min(o.amount, this.terminal.store[mineral]);
					o.transactionCost = Game.market.calcTransactionCost(o.transactionAmount, this.name, o.roomName);
					if (o.transactionCost > this.terminal.store.energy && o.transactionAmount > MIN_MINERAL_SELL_AMOUNT) {
						// cant afford. try min amount
						o.transactionAmount = MIN_MINERAL_SELL_AMOUNT;
						o.transactionCost = Game.market.calcTransactionCost(o.transactionAmount, this.name, o.roomName);
					}

					o.credits = o.transactionAmount * o.price;
					// o.ratio = o.credits/o.transactionCost; // old formula
					// o.ratio = (o.credits-o.transactionCost)/o.transactionAmount; // best offer assuming 1e == 1 credit
					// o.ratio = o.credits/(o.transactionAmount+o.transactionCost); // best offer assuming 1e == 1 mineral
					o.ratio = (o.credits - o.transactionCost * ENERGY_VALUE_CREDITS) / o.transactionAmount; // best offer assuming 1e == ENERGY_VALUE_CREDITS credits

					return (
						terminalFull ||
						(o.price >= buyRatio && o.ratio >= buyRatio && o.transactionCost <= this.terminal.store.energy)
						// (o.ratio >= buyRatio && o.transactionCost <= this.terminal.store.energy)
					);
				});

				if (orders.length > 0) {
					let order = _.max(orders, 'ratio');

					Log.room(this.name, Util.emoji.terminal, 'selected order: ', '<br/>', Util.jsonToTable(order));
					let result = Game.market.deal(order.id, order.transactionAmount, this.name);
					if (SELL_NOTIFICATION)
						Log.room(
							this.name,
							Util.emoji.terminal,
							Dye(
								COLOR_GREEN,
								`Selling ${order.transactionAmount} ${mineral} for ${Util.roundUp(order.credits)} (C:${
									order.price
								}, E:${order.transactionCost}): ${Util.translateErrorCode(result)}`,
							),
						);
					if (SELL_NOTIFICATION)
						Game.notify(
							`<h2>Room ${this.name} rund an order!</h2><br/>Result: ${Util.translateErrorCode(
								result,
							)}<br/>Details:<br/>${JSON.stringify(order).replace(',', ',<br/>')}`,
						);
					transacting = result == OK;
					break;
				}
			}
		}
		if (
			this.controller.level == 8 &&
			!transacting &&
			Util.chargeScale(
				this.storage.store.energy - ENERGY_BALANCE_TRANSFER_AMOUNT,
				MIN_STORAGE_ENERGY[this.controller.level],
				MAX_STORAGE_ENERGY[this.controller.level],
			) > 1 &&
			(this.terminal.store[this.mineralType] || 0) < 150000 &&
			this.terminal.store.energy > ENERGY_BALANCE_TRANSFER_AMOUNT * 1.1
		) {
			let requiresEnergy = room =>
				room.my &&
				room.storage &&
				room.terminal &&
				room.terminal.sum < room.terminal.storeCapacity - ENERGY_BALANCE_TRANSFER_AMOUNT &&
				room.storage.sum < room.storage.storeCapacity * TARGET_STORAGE_SUM_RATIO &&
				!room._isReceivingEnergy &&
				room.storage.store[RESOURCE_ENERGY] < MAX_STORAGE_ENERGY[room.RCL];
			let targetRoom = _.min(_.filter(Game.rooms, requiresEnergy), 'storage.store.energy');
			if (
				targetRoom instanceof Room &&
				Game.market.calcTransactionCost(ENERGY_BALANCE_TRANSFER_AMOUNT, this.name, targetRoom.name) <
					this.terminal.store.energy - ENERGY_BALANCE_TRANSFER_AMOUNT
			) {
				targetRoom._isReceivingEnergy = true;
				let response = this.terminal.send('energy', ENERGY_BALANCE_TRANSFER_AMOUNT, targetRoom.name, 'have fun');
				transacting = response == OK;
				if (transacting) {
					Log.room(
						this.name,
						Util.emoji.terminal,
						Dye(
							COLOR_GREEN,
							`Transferring ${Util.formatNumber(ENERGY_BALANCE_TRANSFER_AMOUNT)} energy to ${
								targetRoom.name
							}: ${Util.translateErrorCode(response)}`,
						),
					);
				}
			}
		}
		if (transacting !== true && _.isUndefined(Memory.boostTiming)) {
			Log.room(this.name, Util.emoji.order, 'Fill room order...');
			this.fillARoomOrder();
		}
	}
}

export default new OrdersExtra();
