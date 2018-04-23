import { RoomManager } from '../Manager';

class FillRoomOrdersManager extends RoomManager {
	constructor() {
		super('fillRoomOrders');
	}

	analyze = () => {
		this.fillRoomOrders();
	};

	fillRoomOrders = () => {
		if (!MAKE_COMPOUNDS && !ALLOCATE_COMPOUNDS) return;

		if (_.isUndefined(Memory.boostTiming)) Memory.boostTiming = {};

		if (_.isUndefined(Memory.boostTiming.roomTrading)) {
			Memory.boostTiming.roomTrading = {
				boostProduction: false,
				boostAllocation: false,
			};
		}

		if (_.isUndefined(Memory.boostTiming.timeStamp)) Memory.boostTiming.timeStamp = Game.time;

		const orderingRoom = Util.orderingRoom();
		const numberOfOrderingRooms = orderingRoom.length;
		const roomTrading = Memory.boostTiming.roomTrading;
		const myRooms = _.filter(Game.rooms, { my: true });
		const reactionPlacedRoom = _.some(myRooms, room => {
			let data = room.memory.resources;
			if (!data || !data.boostTiming) return false;
			return data.boostTiming.roomState === 'reactionPlaced';
		});
		let roomTradingType;

		if (reactionPlacedRoom && Memory.boostTiming.roomTrading.boostProduction === false) {
			Memory.boostTiming.roomTrading.boostProduction = true;
			Memory.boostTiming.timeStamp = Game.time;
		}

		if (numberOfOrderingRooms === 1) {
			let room = orderingRoom[0];

			if (roomTrading.boostProduction)
				roomTradingType = `BOOST_PRODUCTION since: ${Game.time - Memory.boostTiming.timeStamp}`;
			if (roomTrading.boostAllocation)
				roomTradingType = `BOOST_ALLOCATION since: ${Game.time - Memory.boostTiming.timeStamp}`;

			if (!Memory.boostTiming.multiOrderingRoomName)
				Log.module(
					room.name,
					`orderingRoom.name: ${room.name}, checkRoomAt: ${(room.memory.resources.boostTiming.checkRoomAt || 0) -
						Game.time} ${roomTradingType}`,
				);
			else Log.module(room.name, `multi ordering in progress at ${Memory.boostTiming.multiOrderingRoomName}`);
		} else if (numberOfOrderingRooms > 1) {
			Log.warn(`${numberOfOrderingRooms} ordering rooms!`);
			Log.table(orderingRoom);
		}

		if (
			orderingRoom.length === 1 &&
			Game.time >= orderingRoom[0].memory.resources.boostTiming.checkRoomAt &&
			!Memory.boostTiming.multiOrderingRoomName
		) {
			const room = orderingRoom[0];
			const data = room.memory.resources;
			const ordersWithOffers = room.ordersWithOffers();

			if (ordersWithOffers) {
				let returnValue = room.checkOffers();
				Log.module(room.name, `checkOffers running from ${room.name} returnValue: ${returnValue}`);
			} else {
				Log.module(room.name, `${room.name} no offers found, updating offers`);
				room.GCOrders();
				Log.stringify(data.orders);
			}
		} else if (orderingRoom.length === 0) {
			let roomTrading = Memory.boostTiming.roomTrading;

			if (roomTrading.boostProduction === true && !reactionPlacedRoom) {
				roomTrading.boostProduction = false;
				Memory.boostTiming.timeStamp = Game.time;
			} else if (roomTrading.boostAllocation === true) {
				roomTrading.boostAllocation = false;
				Memory.boostTiming.timeStamp = Game.time;
			}

			// console.log(`FLAGS:`);
			// console.log(`boostProduction: ${roomTrading.boostProduction} boostAllocation: ${roomTrading.boostAllocation}`);
			// console.log(`since: ${Game.time - Memory.boostTiming.timeStamp}`);
		}

		if ((MAKE_COMPOUNDS || ALLOCATE_COMPOUNDS) && Memory.boostTiming && Memory.boostTiming.multiOrderingRoomName) {
			const memoryOrderingRoom = Game.rooms[Memory.boostTiming.multiOrderingRoomName];
			const data = memoryOrderingRoom.memory.resources;
			const candidates = data.boostTiming.ordersReady;
			const orderCandidates = candidates.orderCandidates;
			let returnValue = false;

			if (Game.time < candidates.time) return;

			if (orderCandidates.length === 0) {
				Log.module(
					memoryOrderingRoom.name,
					`all ready offers completed to ${
						Memory.boostTiming.multiOrderingRoomName
					} Memory.boostTiming.multiOrderingRoomName deleted.`,
				);
				Game.rooms[Memory.boostTiming.multiOrderingRoomName].memory.resources.boostTiming.checkRoomAt =
					Game.time + CHECK_ORDERS_INTERVAL;
				delete Memory.boostTiming.multiOrderingRoomName;
				delete memoryOrderingRoom.memory.resources.boostTiming.ordersReady;
				return;
			}

			for (let i = 0; i < orderCandidates.length; i++) {
				const candidate = orderCandidates[i];
				const currentRoom = Game.rooms[candidate.room];

				if (candidate.readyOffers > 0) {
					if (currentRoom.terminal.cooldown > 0) {
						Log.module(
							currentRoom.name,
							`${currentRoom.name} terminal.cooldown: ${currentRoom.terminal.cooldown} fillARoomOrder() delayed.`,
						);
						candidates.time = Game.time + currentRoom.terminal.cooldown;
						continue;
					} else candidates.time = Game.time + 1;

					Log.module(
						memoryOrderingRoom.name,
						`running ${candidate.room} fillARoomOrder() in a row, time: ${Game.time} readyOffers: ${
							candidate.readyOffers
						}`,
					);
					returnValue = currentRoom.fillARoomOrder();

					if (returnValue === true) {
						candidate.readyOffers--;
						if (candidate.readyOffers >= 1) {
							Log.module(
								candidate.room,
								`has ${candidate.readyOffers} remains fillRoomOrders check. readyOffers: ${candidate.readyOffers}`,
							);
						} else {
							Log.module(memoryOrderingRoom.name, `offers from ${candidate.room} are completed`);
							orderCandidates.splice(i, 1);
							i--;
						}
					} else if (returnValue === ERR_TIRED) {
						candidates.time = Game.time + currentRoom.terminal.cooldown;
						Log.module(
							candidate.room,
							`${candidate.room} offers from ${candidate.room} failed send to ${
								memoryOrderingRoom.name
							}.  Terminal.cooldown: ${currentRoom.terminal.cooldown}`,
						);
					} else if (returnValue === ERR_NOT_ENOUGH_RESOURCES) {
						Log.module(
							memoryOrderingRoom.name,
							`WARNING: offers from ${candidate.room} are not completed: not enough resources`,
						);
						orderCandidates.splice(i, 1);
						i--;
					} else if (returnValue !== true && returnValue !== OK) {
						Log.module(
							memoryOrderingRoom.name,
							`WARNING: offers from ${
								candidate.room
							} are not completed. Offers deleted. terminal.send returns: ${Util.translateErrorCode(returnValue)}`,
						);
						orderCandidates.splice(i, 1);
						i--;
					}
				}
			}
		}
	};
}

export default new FillRoomOrdersManager();
