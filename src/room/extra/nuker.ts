import { RoomExtra } from '../Extra';

class NukerExtra extends RoomExtra {
	constructor() {
		super('nuker');
	}
	analyzeRoom = (room, needMemoryResync) => {
		if (needMemoryResync) {
			room.saveNuker();
		}
	};
	prototypeExtend = () => {
		this.assignRoomPrototype({
			saveNuker: {
				value() {
					let nukers = this.find(FIND_MY_STRUCTURES, {
						filter: structure => structure.structureType == STRUCTURE_NUKER,
					});
					if (nukers.length > 0) {
						this.memory.nukers = [];

						// for each entry add to memory ( if not contained )
						let add = nuker => {
							let nukerData = this.memory.nukers.find(l => l.id == nuker.id);
							if (!nukerData) {
								this.memory.nukers.push({
									id: nuker.id,
								});
							}
						};
						nukers.forEach(add);
					} else delete this.memory.nukers;
				},
			},
		});
	};
	roomManagerExtend = () => {
		this.assignRoomManager({
			Nuker: function(room) {
				this.room = room;
				Object.defineProperties(this, {
					all: {
						get() {
							if (_.isUndefined(this._all)) {
								this._all = [];
								let add = entry => {
									let o = Game.getObjectById(entry.id);
									if (o) {
										_.assign(o, entry);
										this._all.push(o);
									}
								};
								_.forEach(this.room.memory.nukers, add);
							}
							return this._all;
						},
					},
				});
			},
		});
	};
}
export default new NukerExtra();
