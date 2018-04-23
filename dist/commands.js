module.exports = {
	clean() {
		Util.resetBoostProduction();
		_.values(Game.structures)
			.filter(i => i.structureType === 'lab')
			.map(i => i.room.setStore(i.id, RESOURCE_ENERGY, 2000));
	},
	make(amount = 20000) {
		Command.clean();
		Game.rooms['E9N47'].placeReactionOrder(Game.rooms['E9N47'].terminal.id, 'UL', amount);
		Log.room('E9N47', 'U + L => UL');
		Game.rooms['E12N42'].placeReactionOrder(Game.rooms['E12N42'].terminal.id, 'ZK', amount);
		Log.room('E12N42', 'Z + K => ZK');
		Game.rooms['E3N38'].placeReactionOrder(Game.rooms['E3N38'].terminal.id, 'G', amount);
		Log.room('E3N38', 'UL + ZK => G');
		Game.rooms['W2N41'].placeReactionOrder(Game.rooms['W2N41'].terminal.id, 'GH', amount);
		Log.room('W2N41', 'G + H => GH');
		Game.rooms['E8N45'].placeReactionOrder(Game.rooms['E8N45'].terminal.id, 'GH2O', amount);
		Log.room('E8N45', 'GH + OH => GH2O');
		Game.rooms['E14N49'].placeReactionOrder(Game.rooms['E14N49'].terminal.id, 'XGH2O', amount);
		Log.room('E14N49', 'X + GH2O => GH2OX');
	},
	store(amount = 20000) {
		Game.rooms['E8N45'].setStore(Game.rooms['E8N45'].terminal.id, 'O', amount);
		Game.rooms['W2N41'].setStore(Game.rooms['W2N41'].terminal.id, 'H', amount);
		Game.rooms['E8N45'].setStore(Game.rooms['E8N45'].terminal.id, 'OH', amount);

		Game.rooms['E9N47'].setStore(Game.rooms['E9N47'].terminal.id, 'U', amount);
		Game.rooms['E15N47'].setStore(Game.rooms['E15N47'].terminal.id, 'L', amount);
		Game.rooms['E12N42'].setStore(Game.rooms['E12N42'].terminal.id, 'Z', amount);
		Game.rooms['E13N42'].setStore(Game.rooms['E13N42'].terminal.id, 'K', amount);
		Game.rooms['E14N49'].setStore(Game.rooms['E14N49'].terminal.id, 'X', amount);

		Game.rooms['E9N47'].setStore(Game.rooms['E9N47'].terminal.id, 'UL', amount);
		Game.rooms['E12N42'].setStore(Game.rooms['E12N42'].terminal.id, 'ZK', amount);
		Game.rooms['E3N38'].setStore(Game.rooms['E3N38'].terminal.id, 'G', amount);
		Game.rooms['W2N41'].setStore(Game.rooms['W2N41'].terminal.id, 'GH', amount);
		Game.rooms['E8N45'].setStore(Game.rooms['E8N45'].terminal.id, 'GH2O', amount);
		Game.rooms['E14N49'].setStore(Game.rooms['E14N49'].terminal.id, 'XGH2O', amount);
	},
};
