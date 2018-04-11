// E8N45
Game.rooms['E8N45'].placeReactionOrder('5ab60ab4c107f9746ab273c4', 'OH', '20000');
Game.rooms['E8N45'].placeReactionOrder('5ab60ab4c107f9746ab273c4', 'GH2O', '9000');

// E9N47
Game.rooms['E9N47'].placeReactionOrder('5ab7018a26ac6137d696e4b5', 'UL', '20000');

// E12N42
Game.rooms['E12N42'].placeReactionOrder('5ab75f4cbb8cac1dafc367d5', 'ZK', '20000');

// E3N38
Game.rooms['E3N38'].placeReactionOrder('5ab9ad7712f38b0f500aeaf5', 'G', '20000');

// E13N42
Game.rooms['E13N42'].placeReactionOrder('5ab75f4cbb8cac1dafc367d5', 'ZK', '9000');

// W2N41
Game.rooms['W2N41'].placeReactionOrder('5ab75f4cbb8cac1dafc367d5', 'GH', '9000');

// ====================================================================================

// set.lab
_.values(Game.structures).filter(i => i.structureType === 'lab').map(i => i.room.setStore(i.id, RESOURCE_ENERGY, 2000));
// room.registerReactorFlower(...)
Game.rooms['roomName'].registerReactorFlower('a', 'b');
// room.setStore(...)
Game.rooms['roomName'].setStore('id', 'energy', 10000);

