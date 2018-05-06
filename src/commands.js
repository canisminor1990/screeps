module.exports = {
	// Command.clean()
	clean() {
		Util.resetBoostProduction();
		_.values(Game.structures)
			.filter(i => i.structureType === 'lab')
			.map(i => i.room.setStore(i.id, RESOURCE_ENERGY, 2000));
	},
	// Command.make()
	make(amount = 200000) {
		const rooms = {
			E9N47: 'UL',
			E12N42: 'ZK',
			E3N38: 'G',
			W2N41: 'GH',
			E8N45: 'OH',
			E12N49: 'GH2O',
			E14N49: 'XGH2O',
		};

		_.forEach(rooms, (mineral, room) => {
			Game.rooms[room].resetBoostProduction();
			Game.rooms[room].placeReactionOrder(Game.rooms[room].terminal.id, mineral, amount);
			Log.room(room, `Reactions orders: ${mineral} ${amount}`);
		});
	},
};
