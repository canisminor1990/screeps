import { RoomType } from '../enums/room';

// 获取之类型的房间列表
export const getRooms = (type: RoomType): Room[] => {
	const RoomList: Room[] = [];
	_.forEach(_.get(Memory.managers, ['RoomManager', 'roomToc', type]), (name: string) => {
		RoomList.push(Game.rooms[name]);
	});
	return _.compact(RoomList);
};
