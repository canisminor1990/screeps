import {Ui, Console, Timer} from '../_util'
const spawnUi = (spawn) => {
	const percent = Math.round((1 - spawn.spawning.remainingTime / spawn.spawning.needTime) * 100),
	      text    = [Ui.emoji.build,
	                 spawn.spawning.name.split('-')[0],
	                 `(${percent}%)`].join(' ');
	console.log(text);
	spawn.room.visual.text(text, spawn.pos.x + 1, spawn.pos.y, {
		align : 'left',
		stroke: '#111111',
		color : '#ffffff',
		font  : 0.5
	});
	return true;
}

export default (spawn) => {
	const roomName = spawn.room.name;
	if (spawn.spawning && spawnUi(spawn)) return;
	
	const energy   = Memory.rooms[roomName].energyAvailable;
	const roleData = Memory.roles[roomName]
	
	for (let i in roleData) {
		const roleName      = roleData[i].role,
		      roleTimeout   = (roleData[i].timeout) ? roleData[i].timeout : 10,
		      roleNumber    = roleData[i].number,
		      roleNumberNow = _.filter(Game.creeps, c =>
		      c.memory.role == roleData[i].role &&
		      c.memory.roomName == roleData[i].roomName &&
		      c.memory.roomType == roleData[i].roomType &&
		      c.ticksToLive >= roleTimeout).length;
		Console.note(i,
			'Now:' + roleNumberNow, 'Need:' + roleNumber,
			'Cost:' + roleData[i].cost, 'Availabl:' + energy);
		if (roleNumberNow - roleNumber >= 0) continue;
		if (roleData[i].cost > energy) {
			Console.note(i,
				'Now:' + roleNumberNow, 'Need:' + roleNumber,
				'Cost:' + roleData[i].cost, 'Availabl:' + energy);
			return;
		}
		const spawnTime = Game.time,
		      spawnName = `${i}-${spawnTime.toString().substr(spawnTime.toString().length - 3, 3)}`;
		if (spawn.createCreep(roleData[i].body, spawnName, {
				bornRoom: spawn.room.name,
				bornTime: spawnTime,
				roomName: roleData[i].roomName,
				roomType: roleData[i].roomType,
				role    : roleName,
				name    : spawnName,
				target  : {}
			}) == OK) return
	}
}