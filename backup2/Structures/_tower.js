import {Target} from '../_util'
export default (tower) => {
	const tasklist = Memory.tasks[tower.room.name];
	if (tasklist.attack.length > 0) {
		tower.attack(Target.format(tower,tasklist.attack))
	} else if (tasklist.repair.length > 0) {
		tower.repair(Target.format(tower,tasklist.repair))
	}
}