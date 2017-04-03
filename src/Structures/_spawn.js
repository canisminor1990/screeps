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
	if (!Timer(4))return;
	const energy   = Memory.rooms[roomName].energyAvailable;
	const roleData = Memory.roles[roomName];
	let priority = false;
	_.forEach(roleData, role => {
		const roleName      = role.role,
		      roleTimeout   = (role.timeout) ? role.timeout : 10,
		      roleNumber    = role.number,
		      roleNumberNow = _.filter(Game.creeps, c =>
		      c.memory.role == role.role &&
		      c.memory.roomName == role.roomName &&
		      c.memory.roomType == role.roomType &&
		      c.ticksToLive >= roleTimeout).length
		
		if (roleNumberNow - roleNumber >= 0 || priority) return;
		Console.note(roleName,
			'Now:' + roleNumberNow, 'Need:' + roleNumber,
			'Cost:' + role.cost, 'Availabl:' + energy);
		if (role.cost > energy) {
			priority = true;
			return;
		}
		const spawnTime = Game.time,
		      spawnName = `${roleName}-${spawnTime.toString().substr(spawnTime.toString().length - 3, 3)}`;
		spawn.createCreep(role.body, spawnName, {
			bornRoom: spawn.room.name,
			bornTime: spawnTime,
			roomName: role.roomName,
			roomType: role.roomType,
			role    : roleName,
			name    : spawnName,
			target  : {}
		})
		priority = true;
	})
	
}