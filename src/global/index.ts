class Constants {
	LAB_REACTIONS: obj = {};
	LAB_IDLE = 'idle';
	LAB_BOOST = 'boost';
	LAB_SEED = 'seed';
	LAB_MASTER = 'master';
	LAB_SLAVE_1 = 'slave_1';
	LAB_SLAVE_2 = 'slave_2';
	LAB_SLAVE_3 = 'slave_3';
	REACTOR_TYPE_FLOWER = 'flower';
	REACTOR_MODE_IDLE = 'idle';
	REACTOR_MODE_BURST = 'burst';
	constructor() {
		for (let a in REACTIONS) {
			for (let b in REACTIONS[a]) {
				this.LAB_REACTIONS[REACTIONS[a][b]] = [a, b];
			}
		}
	}
	CREEP_PART_THREAT = {
		move: { common: 0, boosted: 0 },
		work: { common: 1, boosted: 3 },
		carry: { common: 0, boosted: 0 },
		attack: { common: 2, boosted: 5 },
		ranged_attack: { common: 2, boosted: 5 },
		heal: { common: 4, boosted: 10 },
		claim: { common: 1, boosted: 3 },
		tough: { common: 1, boosted: 3 },
		tower: 25,
	};
	FLAG_COLOR = {
		invade: {
			// destroy everything enemy in the room
			color: COLOR_RED,
			secondaryColor: COLOR_RED,
			exploit: {
				// send privateers to exploit sources
				color: COLOR_RED,
				secondaryColor: COLOR_GREEN,
			},
			robbing: {
				// take energy from foreign structures
				color: COLOR_RED,
				secondaryColor: COLOR_YELLOW,
			},
			attackController: {
				// attack enemy controller and then claim
				color: COLOR_RED,
				secondaryColor: COLOR_CYAN,
			},
		},
		// COLOR_PURPLE - Reserved labs
		labs: {
			// could be used to define certain lab commands
			color: COLOR_PURPLE,
			secondaryColor: COLOR_PURPLE,
			filter: { color: COLOR_PURPLE, secondaryColor: COLOR_PURPLE },
			labTech: {
				// spawn lab tech when required
				color: COLOR_PURPLE,
				secondaryColor: COLOR_WHITE,
				filter: { color: COLOR_PURPLE, secondaryColor: COLOR_WHITE },
			},
		},
		// COLOR_BLUE - Reserved (internal use)
		// COLOR_CYAN - Reserved (build related)
		construct: {
			// construct an extension at flag when available
			color: COLOR_CYAN,
			secondaryColor: COLOR_CYAN,
			spawn: {
				// construct a spawn at flag when available
				color: COLOR_CYAN,
				secondaryColor: COLOR_RED,
			},
			tower: {
				// construct a tower at flag when available
				color: COLOR_CYAN,
				secondaryColor: COLOR_PURPLE,
			},
			link: {
				// construct a link at flag when available
				color: COLOR_CYAN,
				secondaryColor: COLOR_BLUE,
			},
			lab: {
				// construct a lab at flag when available
				color: COLOR_CYAN,
				secondaryColor: COLOR_GREEN,
			},
			storage: {
				// construct a storage at flag when available
				color: COLOR_CYAN,
				secondaryColor: COLOR_YELLOW,
			},
			terminal: {
				// construct a terminal at flag when available
				color: COLOR_CYAN,
				secondaryColor: COLOR_ORANGE,
			},
			observer: {
				// construct an observer at flag when available
				color: COLOR_CYAN,
				secondaryColor: COLOR_BROWN,
			},
			nuker: {
				// construct a nuker at flag when available
				color: COLOR_CYAN,
				secondaryColor: COLOR_GREY,
			},
			powerSpawn: {
				// construct a power spawn at flagwhen available
				color: COLOR_CYAN,
				secondaryColor: COLOR_WHITE,
			},
		},
		// COLOR_GREEN
		claim: {
			// claim this room, then build spawn at flag
			color: COLOR_GREEN,
			secondaryColor: COLOR_GREEN,
			spawn: {
				// send pioneers & build spawn here
				color: COLOR_GREEN,
				secondaryColor: COLOR_WHITE,
			},
			pioneer: {
				// send additional pioneers
				color: COLOR_GREEN,
				secondaryColor: COLOR_RED,
			},
			reserve: {
				// reserve this room
				color: COLOR_GREEN,
				secondaryColor: COLOR_GREY,
			},
			mining: {
				color: COLOR_GREEN,
				secondaryColor: COLOR_BROWN,
			},
			delivery: {
				// rob energy from friendly rooms and deliver here
				color: COLOR_GREEN,
				secondaryColor: COLOR_YELLOW,
			},
		},
		// COLOR_YELLOW
		defense: {
			// point to gather troops
			color: COLOR_YELLOW,
			secondaryColor: COLOR_YELLOW,
		},
		// COLOR_ORANGE
		destroy: {
			// destroy whats standing here
			color: COLOR_ORANGE,
			secondaryColor: COLOR_ORANGE,
			dismantle: {
				color: COLOR_ORANGE,
				secondaryColor: COLOR_YELLOW,
			},
		},
		// COLOR_BROWN
		pavementArt: {
			color: COLOR_BROWN,
			secondaryColor: COLOR_BROWN,
		},
		// COLOR_GREY
		// COLOR_WHITE
		command: {
			// command api
			color: COLOR_WHITE,
			drop: {
				// haulers drop energy in a pile here
				color: COLOR_WHITE,
				secondaryColor: COLOR_YELLOW,
			},
			_OCS: {
				color: COLOR_WHITE,
				secondaryColor: COLOR_PURPLE,
			},
			roomLayout: {
				color: COLOR_WHITE,
				secondaryColor: COLOR_CYAN,
			},
			invalidPosition: {
				color: COLOR_WHITE,
				secondaryColor: COLOR_RED,
			},
			skipRoom: {
				color: COLOR_WHITE,
				secondaryColor: COLOR_GREEN,
			},
			idle: {
				color: COLOR_WHITE,
				secondaryColor: COLOR_BROWN,
			},
			safeGen: {
				color: COLOR_WHITE,
				secondaryColor: COLOR_BLUE,
			},
		},
	};
	DECAY_AMOUNT = {
		rampart: RAMPART_DECAY_AMOUNT, // 300
		road: ROAD_DECAY_AMOUNT, // 100
		container: CONTAINER_DECAY, // 5000
	};
	DECAYABLES = [STRUCTURE_ROAD, STRUCTURE_CONTAINER, STRUCTURE_RAMPART];
	MEM_SEGMENTS = {
		COSTMATRIX_CACHE: {
			start: 99,
			end: 95,
		},
	};
	ACTION_SAY = {
		// what gets said on creep.action.*.onAssignment
		ATTACK_CONTROLLER: String.fromCodePoint(0x1f680), // Ã°ÂÂÂ
		AVOIDING: String.fromCodePoint(0x1f440), // Ã°ÂÂÂ
		BOOSTING: String.fromCodePoint(0x1f525), // Ã°ÂÂÂ¥
		BUILDING: String.fromCodePoint(0x1f3d7), // Ã°ÂÂÂ
		BULLDOZING: String.fromCodePoint(0x1f69c), // Ã°ÂÂÂ
		CHARGING: String.fromCodePoint(0x1f50c), // Ã°ÂÂÂ
		CLAIMING: String.fromCodePoint(0x26f3), // Ã¢ÂÂ³
		DEFENDING: String.fromCodePoint(0x2694), // Ã¢ÂÂ
		DISMANTLING: String.fromCodePoint(0x26d1), // Ã¢ÂÂ
		DROPPING: String.fromCodePoint(0x1f4a9), // Ã°ÂÂÂ©
		FEEDING: String.fromCodePoint(0x1f355), // Ã°ÂÂÂ
		FORTIFYING: String.fromCodePoint(0x1f6a7), // Ã°ÂÂÂ§
		FUELING: String.fromCodePoint(0x26fd), // Ã¢ÂÂ½
		GUARDING: String.fromCodePoint(0x1f6e1), // Ã°ÂÂÂ¡
		HARVESTING: String.fromCodePoint(0x26cf), // Ã¢ÂÂ
		HEALING: String.fromCodePoint(0x1f48a), // Ã°ÂÂÂ
		IDLE: String.fromCodePoint(0x1f3b5), // Ã°ÂÂÂµ
		INVADING: String.fromCodePoint(0x1f52b), // Ã°ÂÂÂ«
		MINING: String.fromCodePoint(0x26cf), // Ã¢ÂÂ
		PICKING: String.fromCodePoint(0x1f9e4), // Ã°ÂÂ§Â¤
		REALLOCATING: String.fromCodePoint(0x1f52e), // Ã°ÂÂÂ®
		RECYCLING: String.fromCodePoint(0x1f504), // Ã°ÂÂÂ
		REPAIRING: String.fromCodePoint(0x1f527), // Ã°ÂÂÂ§
		RESERVING: String.fromCodePoint(0x1f6a9), // Ã°ÂÂÂ©
		ROBBING: String.fromCodePoint(0x1f47b), // Ã°ÂÂÂ»
		STORING: String.fromCodePoint(0x23ec), // Ã¢ÂÂ¬
		TRAVELLING: String.fromCodePoint(0x1f3c3), // Ã°ÂÂÂ
		UNCHARGING: String.fromCodePoint(0x1f50b), // Ã°ÂÂÂ
		UPGRADING: String.fromCodePoint(0x1f64f), // Ã°ÂÂÂ
		WITHDRAWING: String.fromCodePoint(0x23eb), // Ã¢ÂÂ«
		SAFEGEN: String.fromCodePoint(0x1f512), // Ã°ÂÂÂ
	};
}

export default new Constants();
