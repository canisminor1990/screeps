_.forEach(Memory, (value, key) => {
	delete Memory[key]
});

_.forEach(Game.creeps,c=>c.suicide())