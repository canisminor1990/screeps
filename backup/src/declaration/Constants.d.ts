declare const LAB_IDLE = 'idle';
declare const LAB_BOOST = 'boost';
declare const LAB_SEED = 'seed';
declare const LAB_MASTER = 'master';
declare const LAB_SLAVE_1 = 'slave_1';
declare const LAB_SLAVE_2 = 'slave_2';
declare const LAB_SLAVE_3 = 'slave_3';
declare const LAB_REACTIONS: obj;
declare const REACTOR_TYPE_FLOWER = 'flower';
declare const REACTOR_MODE_IDLE = 'idle';
declare const REACTOR_MODE_BURST = 'burst';
declare const CREEP_PART_THREAT: {
	move: { common: 0; boosted: 0 };
	work: { common: 1; boosted: 3 };
	carry: { common: 0; boosted: 0 };
	attack: { common: 2; boosted: 5 };
	ranged_attack: { common: 2; boosted: 5 };
	heal: { common: 4; boosted: 10 };
	claim: { common: 1; boosted: 3 };
	tough: { common: 1; boosted: 3 };
	tower: 25;
};
declare const FLAG_COLOR: {
	invade: {
		// destroy everything enemy in the room
		color: COLOR_RED;
		secondaryColor: COLOR_RED;
		exploit: {
			// send privateers to exploit sources
			color: COLOR_RED;
			secondaryColor: COLOR_GREEN;
		};
		robbing: {
			// take energy from foreign structures
			color: COLOR_RED;
			secondaryColor: COLOR_YELLOW;
		};
		attackController: {
			// attack enemy controller and then claim
			color: COLOR_RED;
			secondaryColor: COLOR_CYAN;
		};
	};
	// COLOR_PURPLE - Reserved labs
	labs: {
		// could be used to define certain lab commands
		color: COLOR_PURPLE;
		secondaryColor: COLOR_PURPLE;
		filter: { color: COLOR_PURPLE; secondaryColor: COLOR_PURPLE };
		labTech: {
			// spawn lab tech when required
			color: COLOR_PURPLE;
			secondaryColor: COLOR_WHITE;
			filter: { color: COLOR_PURPLE; secondaryColor: COLOR_WHITE };
		};
	};
	// COLOR_BLUE - Reserved (internal use)
	// COLOR_CYAN - Reserved (build related)
	construct: {
		// construct an extension at flag when available
		color: COLOR_CYAN;
		secondaryColor: COLOR_CYAN;
		spawn: {
			// construct a spawn at flag when available
			color: COLOR_CYAN;
			secondaryColor: COLOR_RED;
		};
		tower: {
			// construct a tower at flag when available
			color: COLOR_CYAN;
			secondaryColor: COLOR_PURPLE;
		};
		link: {
			// construct a link at flag when available
			color: COLOR_CYAN;
			secondaryColor: COLOR_BLUE;
		};
		lab: {
			// construct a lab at flag when available
			color: COLOR_CYAN;
			secondaryColor: COLOR_GREEN;
		};
		storage: {
			// construct a storage at flag when available
			color: COLOR_CYAN;
			secondaryColor: COLOR_YELLOW;
		};
		terminal: {
			// construct a terminal at flag when available
			color: COLOR_CYAN;
			secondaryColor: COLOR_ORANGE;
		};
		observer: {
			// construct an observer at flag when available
			color: COLOR_CYAN;
			secondaryColor: COLOR_BROWN;
		};
		nuker: {
			// construct a nuker at flag when available
			color: COLOR_CYAN;
			secondaryColor: COLOR_GREY;
		};
		powerSpawn: {
			// construct a power spawn at flagwhen available
			color: COLOR_CYAN;
			secondaryColor: COLOR_WHITE;
		};
	};
	// COLOR_GREEN
	claim: {
		// claim this room, then build spawn at flag
		color: COLOR_GREEN;
		secondaryColor: COLOR_GREEN;
		spawn: {
			// send pioneers & build spawn here
			color: COLOR_GREEN;
			secondaryColor: COLOR_WHITE;
		};
		pioneer: {
			// send additional pioneers
			color: COLOR_GREEN;
			secondaryColor: COLOR_RED;
		};
		reserve: {
			// reserve this room
			color: COLOR_GREEN;
			secondaryColor: COLOR_GREY;
		};
		mining: {
			color: COLOR_GREEN;
			secondaryColor: COLOR_BROWN;
		};
		delivery: {
			// rob energy from friendly rooms and deliver here
			color: COLOR_GREEN;
			secondaryColor: COLOR_YELLOW;
		};
	};
	// COLOR_YELLOW
	defense: {
		// point to gather troops
		color: COLOR_YELLOW;
		secondaryColor: COLOR_YELLOW;
	};
	// COLOR_ORANGE
	destroy: {
		// destroy whats standing here
		color: COLOR_ORANGE;
		secondaryColor: COLOR_ORANGE;
		dismantle: {
			color: COLOR_ORANGE;
			secondaryColor: COLOR_YELLOW;
		};
	};
	// COLOR_BROWN
	pavementArt: {
		color: COLOR_BROWN;
		secondaryColor: COLOR_BROWN;
	};
	// COLOR_GREY
	// COLOR_WHITE
	command: {
		// command api
		color: COLOR_WHITE;
		drop: {
			// haulers drop energy in a pile here
			color: COLOR_WHITE;
			secondaryColor: COLOR_YELLOW;
		};
		_OCS: {
			color: COLOR_WHITE;
			secondaryColor: COLOR_PURPLE;
		};
		roomLayout: {
			color: COLOR_WHITE;
			secondaryColor: COLOR_CYAN;
		};
		invalidPosition: {
			color: COLOR_WHITE;
			secondaryColor: COLOR_RED;
		};
		skipRoom: {
			color: COLOR_WHITE;
			secondaryColor: COLOR_GREEN;
		};
		idle: {
			color: COLOR_WHITE;
			secondaryColor: COLOR_BROWN;
		};
		safeGen: {
			color: COLOR_WHITE;
			secondaryColor: COLOR_BLUE;
		};
	};
};
declare const DECAY_AMOUNT: {
	rampart: 300;
	road: 100;
	container: 5000;
};
declare const DECAYABLES: string[];

declare const MEM_SEGMENTS: {
	COSTMATRIX_CACHE: {
		start: 99;
		end: 95;
	};
};
declare const CRAYON: {
	death: { color: 'black'; 'font-weight': 'bold' };
	birth: '#e6de99';
	error: '#e79da7';
	system: { color: '#999'; 'font-size': '10px' };
};
