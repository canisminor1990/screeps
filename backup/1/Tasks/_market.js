import Config from '../config'
export default () => {
	const rooms  = Config.room;
	let tasklist = []
	_.forEach(rooms, roomGroup => {
		const storage = Game.rooms[roomGroup[0]].storage
		if (storage.store.energy > Config.terminal.storage) tasklist.push(storage)
	})
	return tasklist
}