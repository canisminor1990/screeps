export default (room = Game.rooms['W81S67']) => {
	const needBuild = room.memory.structures.needBuild;
	const repair = {
		percent: 0.5,
		maxHits: 15000,
	}
	const role = [
		{
			role: "claim",
			body: {claim: 2, move: 1},
			timeout: 80,
			number: 1,
			priority: 7
		},
		{
			role: "farMiner",
			body: {move: 2, work: 4, carry: 2},
			timeout: 80,
			number: 1,
			priority: 4
		},
		{
			role: 'farHarvester',
			body: {tough: 1, move: 3, carry: 4, attack: 1},
			number: 2,
			priority: 5
		},
		{
			role: 'farBuilder',
			body: {carry: 9, work: 3, move: 3},
			number: 2,
			priority: 5
		},
		{
			role: 'harvester',
			body: {carry: 12, move: 4},
			number: 4,
			priority: 2
		},
		{
			role: 'upgrader',
			body: {carry: 2, work: 4, move: 1},
			number: 2,
			priority: 3
		},
		{
			role: 'builder',
			body: {work: 3, carry: 3, move: 3},
			number: (needBuild.length > 0) ? 1 : 0,
			priority: 6
		},
		{
			role: "miner",
			body: {carry: 1, work: 8, move: 2},
			number: 2,
			timeout: 40,
			priority: 1
		},
		{
			role: 'cleaner',
			body: {carry: 2, move: 1},
			number: 2,
			priority: 0
		}
	]

	return {
		role: role.sort((a, b) => a.priority - b.priority),
		repair: repair,
	};
}