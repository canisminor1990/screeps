export const setTickout = (func: Function, ticks: number): void => {
	if (Game.time % ticks === 0) func();
};

export const isFriend = (username: string) => {
	return WHITELIST.indexOf(username) !== -1;
};

export class getGame {
	static objById(id: string): RoomObject | null {
		return Game.getObjectById(id);
	}

	static objsByIdArray(idArray: string[]) {
		const GameObjects = [] as any[];
		_.forEach(idArray, id => GameObjects.push(Game.getObjectById(id)));
		return _.compact(GameObjects);
	}

	static objsToIdArray(objs: any[]): string[] {
		return _.map(objs, 'id');
	}

	static flagByName(name: string): Flag {
		return Game.flags[name];
	}

	static flagsByNameArray(nameArray: string[]) {
		const Flags = [] as Flag[];
		_.forEach(nameArray, name => Flags.push(Game.flags[name]));
		return _.compact(Flags);
	}

	static flagsToNameArray(flags: Flag[]): string[] {
		return _.map(flags, 'name');
	}
}
