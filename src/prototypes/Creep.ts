import { TargetType } from '../enums/target';
import { RoleType } from '../enums/creep';
import { ActionType } from '../enums/action';

Object.defineProperties(Creep.prototype, {
	role: {
		get(): RoleType {
			return this.memory.role;
		},
	},
	homeRoom: {
		get(): Room {
			return Game.rooms[this.memory.homeRoom];
		},
	},
	isInHomeRoom: {
		get(): boolean {
			return this.memory.homeRoom === this.room.name;
		},
	},
	action: {
		get(): string {
			return this.memory.action;
		},
	},
	actionStatus: {
		get(): boolean {
			return this.memory.actionStatus;
		},
	},
	target: {
		get(): Target | undefined {
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
	totalCarry: {
		get(): number {
			return _.sum(this.carry);
		},
	},
	isEmpty: {
		get(): boolean {
			return this.totalCarry === 0;
		},
	},
	isFull: {
		get(): boolean {
			return this.totalCarry === this.carryCapacity;
		},
	},
	missingHits: {
		get(): number {
			return this.hitsMax - this.hits;
		},
	},
	isHurt: {
		get(): boolean {
			return this.hits < this.hitsMax;
		},
	},
	isMove: {
		get(): boolean {
			if (_.isUndefined(this.memory.unMove)) this.memory.unMove = 0;
			const lastPos = this.memory._pos;
			if (_.isUndefined(lastPos)) return false;
			return lastPos.x !== this.pos.x || lastPos.y !== this.pos.y;
		},
	},
});

Creep.prototype.setTarget = function(target: Target): void {
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

Creep.prototype.setAction = function(action: ActionType | undefined): void {
	this.memory.action = action;
};

Creep.prototype.setActionStatus = function(status: boolean): void {
	this.memory.actionStatus = status;
};

Creep.prototype.getBodyparts = function(partTypes: BodyPartConstant): number {
	return _(this.body)
		.filter({ partTypes })
		.value().length;
};

Creep.prototype.hasBodyparts = function(partTypes: BodyPartConstant | BodyPartConstant[], start: number = 0): boolean {
	const body = this.body;
	const limit = body.length;
	if (!_.isArray(partTypes)) partTypes = [partTypes];
	for (let i = start; i < limit; i++) {
		if (_.includes(partTypes, body[i].type)) return true;
	}
	return false;
};

Creep.prototype.hasActiveBodyparts = function(partTypes: BodyPartConstant | BodyPartConstant[]): boolean {
	return this.hasBodyparts(partTypes, this.body.length - Math.ceil(this.hits * 0.01));
};

Creep.prototype.travelTo = function(target: RoomPosition | { pos: RoomPosition }): number {
	if (this.isMove) {
		this.memory.unMove = 0;
	} else {
		this.memory.unMove = this.memory.unMove + 1;
	}
	if (this.fatigue > 0) return ERR_TIRED;

	const visual = {
		fill: 'transparent',
		stroke: '#fff',
		lineStyle: 'dashed',
		strokeWidth: 0.15,
		opacity: 0.1,
	};
	let callback = this.moveTo(target, {
		reusePath: Infinity,
		noPathFinding: true,
		visualizePathStyle: {
			...visual,
			stroke: '#000',
		},
	});
	this.memory._pos = this.pos;
	if (callback === OK) return OK;

	callback = this.moveTo(target, {
		reusePath: 3,
		maxOps: 200,
		plainCost: 10,
		swampCost: 50,
		ignoreCreeps: this.memory.unMove <= 3,
		costCallback: (roomName: string, costMatrix: CostMatrix) => {
			const unbuidRoads = _.filter(
				this.room.constructionSites,
				(s: ConstructionSite) => s.structureType === STRUCTURE_ROAD,
			);
			_.forEach(unbuidRoads, (road: ConstructionSite) => {
				costMatrix.set(road.pos.x, road.pos.y, 0);
			});
		},
		visualizePathStyle: {
			...visual,
			stroke: '#fff',
		},
	});
	this.memory._pos = this.pos;
	return callback;
};
