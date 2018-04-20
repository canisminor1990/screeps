export const roomUtils = {
	resetRoomLayout(roomName: string): void {
		Memory.rooms[roomName].RBL = 0;
		Memory.rooms[roomName].RDL = 0;
		Log.success(roomName, 'RBL/RBL are reseted.');
	},
	setRoomCenter(roomName: string, x: number, y: number): void {
		Memory.rooms[roomName].center = { x, y };
		Log.success(roomName, 'center set at', x, y);
	},
	/**
	 * 获取当前可见房间
	 */
	getVisibleRooms(age: number): string[] {
		const since = Game.time - (age || 5);
		const visibleRooms = [];
		for (const roomName in Memory.rooms) {
			const room = Memory.rooms[roomName];
			if (room.lastViewed && room.lastViewed > since) {
				visibleRooms.push(roomName);
			}
		}
		return visibleRooms;
	},
	/**
	 * 取得两点之间直线距离
	 */
	getDistance(point1: RoomPosition | Pos, point2: RoomPosition | Pos): number {
		return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	},

	/**
	 * 取得两个房间之间直线距离, respecting natural walls
	 */
	routeRange(fromRoom: string | Room, toRoom: string | Room): number {
		if (fromRoom === toRoom) return 0;

		return Util.get(Memory, `routeRange.${fromRoom}.${toRoom}`, () => {
			const room = fromRoom instanceof Room ? fromRoom : Game.rooms[fromRoom];
			if (!room) return Room.roomDistance(fromRoom, toRoom, false);

			const route = room.findRoute(toRoom, false, false);
			if (!route) return Room.roomDistance(fromRoom, toRoom, false);

			return route === ERR_NO_PATH ? Infinity : route.length;
		});
	},

	/**
	 * Paves the room utilising Brown/Brown Pavement Art flags TODO: ?
	 */
	pave(roomName: string) {
		const flags = _.values(Game.flags).filter(
			(f: Flag) => f.pos.roomName === roomName && f.compareTo(FLAG_COLOR.pavementArt),
		);
		const val = Memory.pavementArt[roomName] === undefined ? '' : Memory.pavementArt[roomName];
		const posMap = (f: Flag) => `x${f.pos.x}y${f.pos.y}`;
		Memory.pavementArt[roomName] = val + flags.map(posMap).join('') + 'x';
		const setSite = (f: Flag) => f.pos.createConstructionSite(STRUCTURE_WALL);
		flags.forEach(setSite);
		const remove = (f: Flag) => f.remove();
		flags.forEach(remove);
	},

	/**
	 * Unpaves the room
	 */
	unpave(roomName: string): boolean {
		if (!Memory.pavementArt || !Memory.pavementArt[roomName]) return false;
		const room = Game.rooms[roomName] as Room;
		if (!room) return false;
		const unpaved = (s: Structure) => Memory.pavementArt[roomName].indexOf(`x${s.pos.x}y${s.pos.y}x`) >= 0;
		const structures = room.structures.all.filter(unpaved);
		const destroy = (s: Structure) => s.destroy();
		if (structures) structures.forEach(destroy);
		delete Memory.pavementArt[roomName];
		return true;
	},

	/**
	 * Iterates over all your structures and adds them to a layout array, and returns the JSON.
	 */
	getRoomLayout(pos: RoomPosition | Pos, filter: Function): string | undefined {
		const layout: any[] = [];
		const room = Game.rooms[pos.roomName as string] as Room;
		if (!room) return;
		const startX = pos.x;
		const startY = pos.y;
		_(room.find(FIND_STRUCTURES))
			.reject((s: Structure) => s instanceof StructureController)
			.filter((s: Structure) => s.pos.x >= startX && s.pos.y >= startY)
			.filter((s: Structure) => {
				if (filter) return filter(s);
				return true;
			})
			.value() // for some reason _.set is broken in _.forEach
			.forEach((s: Structure) => _.set(layout, [s.pos.x - startX, s.pos.y - startY], s.structureType));
		// RegEx Magic
		const replacementMap = {
			null: '',
			'"extension"': 'STRUCTURE_EXTENSION',
			'"road"': 'STRUCTURE_ROAD',
			'"tower"': 'STRUCTURE_TOWER',
			'"spawn"': 'STRUCTURE_SPAWN',
			'"link"': 'STRUCTURE_LINK',
			'"storage"': 'STRUCTURE_STORAGE',
			'"terminal"': 'STRUCTURE_TERMINAL',
			'"nuker"': 'STRUCTURE_NUKER',
			'"powerSpawn"': 'STRUCTURE_POWER_SPAWN',
			'"observer"': 'STRUCTURE_OBSERVER',
			'"rampart"': 'STRUCTURE_RAMPART',
			'"lab"': 'STRUCTURE_LAB',
		};
		const re = new RegExp(Object.keys(replacementMap).join('|'), 'g');
		return JSON.stringify(layout).replace(re, match => replacementMap[match]);
	},
	makeRoomUrl(name) {
		return '<a href="#!/room/' + Game.shard.name + '/' + name + '">' + name + '</a>';
	},
	makeFlagUrl(name) {
		return '<a href="#!/room/' + Game.shard.name + '/' + Memory.flags[name].roomName + '">' + name + '</a>';
	},
};
