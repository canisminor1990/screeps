import { TaskComponent } from '../../class/Task';

const NPC = {
	'Source Keeper': true,
	Invader: true,
};
const CONST = {
	MY_SCORE: 1000,
	WHITELIST_SCORE: 200,
	ALLY: 100,
	NEUTRAL: 1,
	NPC_SCORE: -200,
};

class ReputationTask extends TaskComponent {
	constructor() {
		super('reputation');
	}

	myName = () => ME;
	isNPC = username => NPC[username] === true;
	npcOwner = creep => creep.owner && this.isNPC(creep.owner.username);
	isAlly = username => this.score(username) >= CONST.ALLY;
	notAlly = username => !this.isAlly(username);
	allyOwner = creep => creep.owner && this.isAlly(creep.owner.username);
	isHostile = username => this.score(username) < CONST.NEUTRAL;
	notHostile = username => !this.isHostile(username);
	hostileOwner = creep => creep.owner && this.isHostile(creep.owner.username);
	whitelist = () => this.cache('whitelist');

	whitelist = () => this.cache('whitelist');
	score = username => {
		const reps = this.cache('score');
		if (username === undefined) {
			return reps;
		}
		const name = username && username.toLowerCase();
		if (reps[name]) {
			return reps[name];
		} else {
			return (reps[name] = 0);
		}
	};

	setScore = (username, score) => {
		const name = username && username.toLowerCase();
		this.score()[name] = score;
		this.playerMemory(name).score = score;
	};

	flush = () => {
		this._loadWhitelist();
		this._loadScore();
	};
	cache = table => Task.cache(this.name, table);
	killScoreCache = () => {
		Task.clearCache(this.name, 'score');
		return this.score();
	};
	killWhitelistCache = () => {
		Task.clearCache(this.name, 'score');
		Task.clearCache(this.name, 'whitelist');
		return this.whitelist();
	};
	memory = table => Task.memory(this.name, table);
	playerMemory = username => {
		const playerMemory = this.memory('players');
		const name = username && username.toLowerCase();
		if (playerMemory[name]) {
			return playerMemory[name];
		} else {
			return (playerMemory[name] = {});
		}
	};

	_loadScore = () => {
		const etc = this.cache('etc');
		const playerMemory = this.memory('players');
		const whitelist = this.whitelist();
		let score = this.score();
		if (_.keys(playerMemory).length + _.keys(whitelist).length !== _.keys(score).length + etc.whitelistRepUnion) {
			score = this.killScoreCache();
			for (const n in NPC) {
				score[n] = CONST.NPC_SCORE;
			}
			_.keys(whitelist).forEach(function(player) {
				score[player] = CONST.WHITELIST_SCORE;
			});

			etc.whitelistRepUnion = 0;
			_.reduce(
				playerMemory,
				function(list, player, name) {
					if (typeof player.score === 'number') {
						if (whitelist[name]) {
							etc.whitelistRepUnion++;
						}
						list[name] = player.score;
					}
					return list;
				},
				score,
			);

			this.setScore(this.myName(), CONST.MY_SCORE);
		}
	};
	_loadWhitelist = () => {
		let whitelist = this.whitelist();
		if (_.keys(whitelist).length !== PLAYER_WHITELIST.length) {
			whitelist = this.killWhitelistCache();

			_.forEach(PLAYER_WHITELIST, function(playerName) {
				whitelist[playerName.toLowerCase()] = true;
			});
		}
	};
}

export default new ReputationTask();
