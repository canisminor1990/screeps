import { default as Role } from './_role'
import { default as Room } from './_room'
export default (room = Game.rooms['W81S67']) => {
	return {
		room    : Room,
		role    : Role(room).sort((a, b) => a.priority - b.priority),
		repair  : {
			percent: 0.5,
			maxHits: 30000,
		},
		linkMain: '58d505eb204ecd9e507951f0',
	};
}