"use strict";

let mod = {
    analyze() {
        this.fillRoomOrders();
    },
    fillRoomOrders() {

        if ((global.MAKE_COMPOUNDS || global.ALLOCATE_COMPOUNDS) && Memory.boostTiming && Memory.boostTiming.multiOrderingRoomName) {

            let orderingRoom = Game.rooms[Memory.boostTiming.multiOrderingRoomName],
                candidates = orderingRoom.memory.resources.boostTiming.ordersReady,
                orderCandidates = candidates.orderCandidates,
                returnValue = false;

            if (Game.time < candidates.time)
                return;

            if (orderCandidates.length === 0) {
                global.logSystem(orderingRoom.name, `all ready offers completed to ${Memory.boostTiming.multiOrderingRoomName} Memory.boostTiming.multiOrderingRoomName deleted.`);
                delete Memory.boostTiming.multiOrderingRoomName;
                delete orderingRoom.memory.resources.boostTiming.ordersReady;
                return;
            }

            for (let i = 0; i < orderCandidates.length; i++) {

                let candidate = orderCandidates[i],
                    currentRoom = Game.rooms[candidate.room],
                    readyOffers = candidate.readyOffers;

                if (readyOffers > 0) {
                    global.logSystem(orderingRoom.name, `running ${candidate.room} fillARoomOrder() in a row, time: ${Game.time} readyOffers: ${readyOffers}`);
                    returnValue = currentRoom.fillARoomOrder();

                    if (returnValue === true) {
                        readyOffers--;
                        if (readyOffers >= 1) {
                            candidates.time = Game.time + TERMINAL_COOLDOWN;
                            global.logSystem(candidate.room, `has ${readyOffers} remains fillRoomOrders check room at: ${candidates.time - Game.time} ${readyOffers}`);
                        } else {
                            global.logSystem(orderingRoom.name, `offers from ${candidate.room} are completed`);
                            //orderCandidates.splice(i--, 1);
                            orderCandidates.splice(i, 1);
                            i--;
                        }
                        return;
                    } else if (returnValue === ERR_TIRED) {
                        candidates.time = Game.time + currentRoom.terminal.cooldown;
                        global.logSystem(candidate.room, `${candidate.room} offers from ${candidate.room} failed send to ${Memory.boostTiming.multiOrderingRoomName}.  Terminal.cooldown: ${currentRoom.terminal.cooldown} fillRoomOrders check room at: ${candidates.time - Game.time}`);
                    } else if (returnValue === ERR_NOT_ENOUGH_RESOURCES) {
                        global.logSystem(orderingRoom.name, `WARNING: offers from ${candidate.room} are not completed: not enough resources`);
                        orderCandidates.splice(i, 1);
                        i--;
                    } else if (returnValue !== true) {
                        global.logSystem(orderingRoom.name, `WARNING: offers from ${candidate.room} are not completed. Offers deleted. terminal.send returns: ${returnValue}`);
                        orderCandidates.splice(i, 1);
                        i--;
                    }
                } else {
                    global.logSystem(orderingRoom.name, `offers from ${candidate.room} are completed`);
                    //orderCandidates.splice(i--, 1);
                    orderCandidates.splice(i, 1);
                    i--;
                }
            }
        }
    }
};

module.exports = mod;
