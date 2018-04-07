import { TargetType } from '../enums/target';

Object.defineProperties(Creep.prototype, {
	target: {
		get(): RoomObject | Flag | Room | undefined {
			const target = this.memory.target;
			if (target === null) return undefined;
			switch (this.memory.targetType) {
				case TargetType.id:
					const obj = Game.getObjectById(target) as RoomObject;
					return _.isNull(obj) ? undefined : obj;
				case TargetType.flag:
					return Game.flags[target];
				case TargetType.room:
					return Game.rooms[target];
			}
		},
	},
});

Creep.prototype.setTarget = function(target: RoomObject | Flag | Room): void {
	if (!_.isUndefined(_.get(target, 'id'))) {
		this.memory.target = _.get(target, 'id');
		this.memory.targetType = TargetType.id;
	} else {
		this.memory.target = _.get(target, 'name');
		if (!_.isUndefined(_.get(target, 'color'))) {
			this.memory.targetType = TargetType.flag;
		} else {
			this.memory.targetType = TargetType.room;
		}
	}
};
