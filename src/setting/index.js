import { default as Role } from './_role'
import { default as Room } from './_room'

export default () => {
	let setting = {}
	console.log(Room)
	_.forEach(Room, room => {
		setting[room[0]] = {
			role: Role(room),
		}
	})
	Memory.setting = setting
	return setting;
}