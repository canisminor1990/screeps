_.forEach(Memory, (value, key) => {
	if (key !== ('creeps' || 'population')) {
		delete Memory[key];
	}
});

_.forEach(Game.creeps, c => c.suicide());
