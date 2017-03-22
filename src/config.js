export default (room = Game.rooms['W81S67']) => {
	const needBuild = room.memory.structures.needBuild;
	const friends = ["Ruo",
	                 "FanHua"]
	const repair = {
		percent: 0.5,
		maxHits: 10000,
	}
	const role = [
		{
			role: "claim",
			body: {move: 1, claim: 1},
			number: 1,
			priority: 7
		},
		{
			role: "farMiner",
			body: {move: 3, work: 4, carry: 3},
			number: 1,
			priority: 4
		},
		{
			role: 'farHarvester',
			body: {move: 4, attack: 2, carry: 4, tough: 2},
			number: 3,
			priority: 5
		},
		{
			role: 'harvester',
			body: {move: 4, work: 0, carry: 8},
			number: 4,
			priority: 2
		},
		{
			role: 'upgrader',
			body: {move: 1, work: 4, carry: 2},
			number: 2,
			priority: 3
		},
		{
			role: 'builder',
			body: {move: 3, work: 3, carry: 3},
			number: 1,
			priority: 6
		},
		{
			role: "miner",
			body: {move: 3, work: 8, carry: 1},
			number: 2,
			priority: 1
		},
		{
			role: 'cleaner',
			body: {move: 2, work: 1, carry: 2},
			number: 1,
			priority: 0
		}
	]

	return {
		role: role.sort((a, b) => a.priority - b.priority),
		friends: friends,
		repair: repair,
	};
}