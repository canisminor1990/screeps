"use strict";

let mod = {
    analyze() {
        this.boostProduction();
    },
    boostProduction() {

        if (!global.MAKE_COMPOUNDS)
            return;

        let roomTrading = Memory.boostTiming.roomTrading;

        if (roomTrading.boostAllocation || roomTrading.reallocating)
            return;

        // make compounds
        if (Game.time % global.MAKE_COMPOUNDS_INTERVAL === 0) {

            let myRooms = _.filter(Game.rooms, {'my': true}),
                orderingRoom = global.orderingRoom(),
                reactionPlacedRoom = _.some(myRooms, room => {
                    let data = room.memory.resources;
                    if (!data || !data.boostTiming)
                        return false;
                    return data.boostTiming.roomState === 'reactionPlaced'
                }),
                numberOfOrderingRooms = orderingRoom.length,
                roomFound = false;

            for (let room of myRooms) {

                let data = room.memory.resources;

                if (_.isUndefined(data))
                    continue;

                let boostTiming = data.boostTiming,
                    reactionMade = function () {
                        if (data.reactions.orders.length === 0)
                            return false;
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
                            global.logSystem(room.name, `${room.name} orders done.`);
                        }
                    }
                }

                // inactive rooms => try to make reactions
                if (numberOfOrderingRooms === 0 && !reactionPlacedRoom && !roomFound)
                    roomFound = room.makeReaction();

                // log and fix next finishing reactions data
                if (data.reactions && data.reactions.reactorMode === 'burst' && data.boostTiming.roomState === 'reactionMaking' && boostTiming.checkRoomAt - Game.time <= 150 && Game.time % 50 === 0) {
                    let reactionOrder = data.reactions.orders[0];
                    global.logSystem(room.name, `${room.name}, finishing ${reactionOrder.type}. checkRoomAt: ${boostTiming.checkRoomAt - Game.time}`);
                    let labA = Game.getObjectById(data.reactions.seed_a),
                        labB = Game.getObjectById(data.reactions.seed_b),
                        orderType = reactionOrder.type,
                        component_a = global.LAB_REACTIONS[orderType][0],
                        component_b = global.LAB_REACTIONS[orderType][1],
                        reactionAmount = reactionOrder.amount,
                        labOrderAmounts = room.getSeedLabOrders(),
                        labOrderAmountA = labOrderAmounts.labOrderAmountA,
                        labOrderAmountB = labOrderAmounts.labOrderAmountB,
                        resourcesA = room.resourcesAll[component_a],
                        resourcesB = room.resourcesAll[component_b],
                        labResourcesA = labA.mineralAmount + labOrderAmountA,
                        labResourcesB = labB.mineralAmount + labOrderAmountB;

                    global.logSystem(room.name, `reactionAmount ${reactionAmount}`);
                    global.logSystem(room.name, `labs stored: seed_a: ${labA.mineralAmount} ${component_a} seed_b: ${labB.mineralAmount} ${component_b}`);

                    global.logSystem(room.name, `labs ordered: seed_a: ${labOrderAmountA} ${component_a} seed_b: ${labOrderAmountB} ${component_b}`);

                    if (labResourcesA === reactionAmount && labResourcesB === reactionAmount) {
                        global.logSystem(room.name, `lab orders OK`);
                        if (reactionAmount > 0) {
                            if (((_.isUndefined(resourcesA) || resourcesA === 0) && labA.mineralAmount < LAB_REACTION_AMOUNT) || ((_.isUndefined(resourcesB) || resourcesB === 0) && labB.mineralAmount < LAB_REACTION_AMOUNT)) {
                                reactionOrder.amount = 0;
                                global.logSystem(room.name, `resources NOT OK`);
                                global.logSystem(room.name, `resourcesA: ${resourcesA} resourcesB: ${resourcesB}`);
                                global.logSystem(room.name, `reactionOrders fixed: ${reactionOrder.amount}`);
                            }
                        }
                    } else if (reactionAmount > labResourcesA || reactionAmount > labResourcesB) {
                        global.logSystem(room.name, `NOT ENOUGH lab orders:`);
                        global.logSystem(room.name, `${room.name} reactionAmount: ${reactionAmount} DIFF: labA: ${labResourcesA - reactionAmount} labB: ${labResourcesB - reactionAmount}`);
                        let minAmount = Math.min(labResourcesA, labResourcesB);
                        if (minAmount >= LAB_REACTION_AMOUNT)
                            reactionOrder.amount = minAmount;
                        else
                            reactionOrder.amount = 0;
                        global.logSystem(room.name, `reactionOrders fixed: ${reactionOrder.amount}`);
                    } else if (reactionAmount < labResourcesA || reactionAmount < labResourcesB) {
                        global.logSystem(room.name, `TOO MUCH lab orders:`);
                        global.logSystem(room.name, `${room.name} reactionAmount: ${reactionAmount} DIFF: labA: ${labResourcesA - reactionAmount} labB: ${labResourcesB - reactionAmount}`);
                        let minAmount = Math.min(labResourcesA, labResourcesB);
                        if (minAmount >= LAB_REACTION_AMOUNT)
                            reactionOrder.amount = minAmount;
                        else
                            reactionOrder.amount = 0;
                        global.logSystem(room.name, `reactionOrders fixed: ${reactionOrder.amount}`);
                    }
                }

                if (Game.time >= boostTiming.checkRoomAt) {

                    // reactionMakingRooms
                    if (data.boostTiming.roomState === 'reactionMaking') {

                        if (_.sum(data.reactions.orders, 'amount') > 0) {
                            boostTiming.reactionMaking = Game.time;
                            room.countCheckRoomAt();
                            global.logSystem(room.name, `${room.name} checkRoomAt counted: ${boostTiming.checkRoomAt - Game.time}`);
                        } else {
                            console.log(`Game.time: ${Game.time}`);
                            global.logSystem(room.name, `reactions done in in ${room.name}`);
                            data.boostTiming = {};
                        }
                    }
                }
            }
        }
    }
};

module.exports = mod;


