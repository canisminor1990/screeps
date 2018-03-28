"use strict";

let mod = {
    analyze() {
        this.boostProduction();
    },
    boostProduction() {

        let time = Game.time;

        // make compounds
        if (global.MAKE_COMPOUNDS && time % global.MAKE_COMPOUNDS_INTERVAL === 0) {

            let myRooms = _.filter(Game.rooms, {'my': true}),
                orderingRoom = global.orderingRoom(),
                reactionMakingRooms = _.filter(myRooms, room => {
                    let data = room.memory.resources;
                    return data.reactions.reactorMode === 'burst' && data.boostTiming.roomState === 'reactionMaking';
                }),
                reactionDoneRooms = _.filter(myRooms, room => {
                    let data = room.memory.resources;
                    return (data.boostTiming.roomState === 'reactionMaking' && (data.reactions.orders.length === 0 || data.reactions.orders[0].amount === 0));
                }),
                numberOfOrderingRooms = orderingRoom.length;

            if (_.isUndefined(Memory.boostTiming))
                Memory.boostTiming = {};


            if (numberOfOrderingRooms === 1) {
                Memory.boostTiming.compoundAllocationEnabled = false;
                console.log(`orderingRoom.name: ${orderingRoom[0].name}, checkRoomAt: ${(orderingRoom[0].memory.resources.boostTiming.checkRoomAt || 0) - time} `);
            } else if (numberOfOrderingRooms > 1) {
                Memory.boostTiming.compoundAllocationEnabled = false;
                console.log(`WARNING: ${numberOfOrderingRooms} ordering rooms!`);
                global.BB(orderingRoom);
            } else if (numberOfOrderingRooms === 0 && !_.some(myRooms, room => {
                    return room.memory.resources.boostTiming.roomState === 'reactionPlaced'
                })) {
                Memory.boostTiming.compoundAllocationEnabled = true;
                console.log(`tier3 compoundAllocationEnabled: ${Memory.boostTiming.compoundAllocationEnabled}`);
            }

            for (let room of myRooms) {

                let data = room.memory.resources;

                let boostTiming = data.boostTiming,
                    roomFound = false;

                if (boostTiming && boostTiming.roomState === 'reactionPlaced')
                    break;

                // ordering rooms
                if (room === orderingRoom[0] && time === boostTiming.checkRoomAt) {

                    let reactionCompound = data.reactions.orders[0].type,
                        reactionMaking = _.some(data.lab, lab => {
                            let labObject = Game.getObjectById(lab.id);
                            return labObject.mineralType === reactionCompound && labObject.mineralAmount > 0;
                        }),
                        ordersWithOffers = room.ordersWithOffers();

                    global.logSystem(room.name, `${room.name} reactionMaking: ${reactionMaking}`);

                    if (reactionMaking) {
                        global.logSystem(room.name, `${room.name} setting roomState to transitional`);
                        boostTiming.roomState = 'transitional';
                        boostTiming.reactionMaking = time;
                        boostTiming.checkRoomAt = time + 1;
                    }

                    global.logSystem(room.name, `ordersWithOffers: ${ordersWithOffers}`);

                    if (ordersWithOffers) {
                        let returnValue = room.checkOffers();
                        global.logSystem(room.name, `checkOffers running from ${room.name} returnValue: ${returnValue}`);
                        if (returnValue === false) {
                            global.logSystem(room.name, `${room.name} no offers found, updating offers`);
                            room.GCOrders();
                            global.BB(data.orders);
                            break;
                        }
                    } else {
                        global.logSystem(room.name, `${room.name} no offers found, updating offers`);
                        room.GCOrders();
                        global.BB(data.orders);
                        break;
                    }
                }

                if (reactionMakingRooms.indexOf(room) > -1 && boostTiming.checkRoomAt - time < 1000 && time % 100 === 0)
                    global.logSystem(room.name, `${room.name}, is the next finishing reaction. roomState is ${boostTiming.roomState} checkRoomAt: ${boostTiming.checkRoomAt - time}`);

                // reactionMakingRooms
                if (reactionMakingRooms.indexOf(room) > -1 && time === boostTiming.checkRoomAt) {

                    if (_.sum(data.reactions.orders, 'amount') > 0) {
                        console.log(`time: ${Game.time}`);
                        global.logSystem(room.name, `${room.name} reactionMaking -> bad checkRoomAt: ${boostTiming.checkRoomAt}`);
                        boostTiming.reactionMaking = time;
                        room.countCheckRoomAt();
                        global.logSystem(room.name, `${room.name} reactionMaking -> new values checkRoomAt: ${boostTiming.checkRoomAt} time: ${time} diff: ${boostTiming.checkRoomAt - time}`);
                    } else {
                        console.log(`time: ${Game.time}`);
                        global.logSystem(room.name, `reactions done in reactionMakingRooms in ${room.name}`);
                        data.boostTiming = {};
                    }

                }
                // reactionsDoneRooms
                if (reactionDoneRooms.indexOf(room) > -1) {

                    if (time === boostTiming.checkRoomAt) {
                        global.logSystem(room.name, `reactions done in TIME in ${room.name}`);
                    } else if (time > boostTiming.checkRoomAt)
                        global.logSystem(room.name, `reactions done time was wrong, but executed in ${room.name} diff: ${time - boostTiming.checkRoomAt}`);

                    data.boostTiming = {};
                }

                // inactive rooms
                if (numberOfOrderingRooms === 0) {
                    roomFound = room.makeReaction();
                    if (roomFound) {
                        global.logSystem(room.name, `${room.name} roomFound for make reaction: ${roomFound}`);
                        break;
                    }
                }

                // roomStateChangingRooms
                if (data.orders.length === 0 || _.sum(data.orders, 'amount') === 0) {
                    if (boostTiming.roomState === 'transitional') {
                        boostTiming.roomState = 'reactionMaking';
                        room.countCheckRoomAt();
                        global.logSystem(room.name, `${room.name} roomState changed transitional => reactionMaking at time: ${time}`);
                        global.logSystem(room.name, `${room.name} boostTiming data:`);
                        global.BB(boostTiming);

                    }
                    if (boostTiming.roomState === 'ordersPlaced') {
                        boostTiming.reactionMaking = time;
                        boostTiming.roomState = 'reactionMaking';
                        room.countCheckRoomAt();
                        global.logSystem(room.name, `${room.name} roomState changed ordersPlaced => reactionMaking at time: ${time}`);
                        global.logSystem(room.name, `${room.name} boostTiming data:`);
                        global.BB(boostTiming);
                    }
                }
            }
        }
    }
};

module.exports = mod;


