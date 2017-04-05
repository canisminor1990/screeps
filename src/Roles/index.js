import Config from '../config';  // name: [body , num[main,extra], time]
import roleBody from './_body';
import roleNumber from './_number';
export default (roomGroup = []) => {
	if (!Memory.roles) {
		Memory.roles = {};
	}

	const energy    = Game.rooms[roomGroup[0]].energyCapacityAvailable;
	let i           = 0,
	      prioprity = 0,
	      roomRoles = {};
	_.forEach(roomGroup, (roomName) => {
		_.forEach(Config.role, (array, key) => {
			const roomType = (i == 0) ? 'main' : 'extra';
			const number   = roleNumber(key, (i > 0) ? array[1][1] : array[1][0], roomName, roomType);
			if (number == 0) {
				return;
			}
			const body      = roleBody(array[0], energy),
			      name      = (i > 0) ? `${key}-${roomName}` : key;
			roomRoles[name] = {
				role     : key,
				roomName : roomName,
				roomType : roomType,
				body     : body.body,
				cost     : body.cost,
				number   : number,
				timeout  : (i > 0) ? array[2] + 100 : array[2],
				prioprity: (key.match('attacker')) ? 0 : prioprity
			};
			prioprity++;
		});
		i++;
	});
	Memory.roles[roomGroup[0]] = _.sortBy(roomRoles, 'prioprity');
};