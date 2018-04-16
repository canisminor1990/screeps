import { RoomManager } from '../../class';

class ResourcesManager extends RoomManager {
	constructor() {
		super('resources');
	}

	analyzeRoom = (room, needMemoryResync) => {
		if (needMemoryResync) {
			room.saveMinerals();
		}
	};
	prototypeExtend = () => {
		this.assignRoomPrototype({
			resourcesStorage: {
				get() {
					if (_.isUndefined(this._resourcesStorage)) {
						this._resourcesStorage = {};

						if (!_.isUndefined(this.storage)) {
							Object.keys(this.storage.store).forEach(content => {
								if (_.isUndefined(this._resourcesStorage[content]))
									this._resourcesStorage[content] = this.storage.store[content];
							});
						}
					}
					return this._resourcesStorage;
				},
			},
			resourcesTerminal: {
				get() {
					if (_.isUndefined(this._resourcesTerminal)) {
						this._resourcesTerminal = {};

						if (!_.isUndefined(this.terminal)) {
							Object.keys(this.terminal.store).forEach(content => {
								if (_.isUndefined(this._resourcesTerminal[content]))
									this._resourcesTerminal[content] = this.terminal.store[content];
							});
						}
					}
					return this._resourcesTerminal;
				},
			},
			resourcesLabs: {
				get() {
					if (_.isUndefined(this._resourcesLabs)) {
						this._resourcesLabs = {};
						let data = this.memory.resources;

						if (!_.isUndefined(data) && !_.isUndefined(data.lab)) {
							for (let lab of data.lab) {
								if (lab.reactionState !== 'Storage') {
									const labStructure = Game.getObjectById(lab.id);
									const mineralType = labStructure.mineralType;
									const mineralAmount = labStructure.mineralAmount;

									if (!_.isUndefined(mineralType)) {
										if (_.isUndefined(this._resourcesLabs[mineralType]))
											this._resourcesLabs[mineralType] = mineralAmount;
										else this._resourcesLabs[mineralType] += mineralAmount;
									}
								}
							}
						}
					}
					return this._resourcesLabs;
				},
			},
			resourcesCreeps: {
				get() {
					if (_.isUndefined(this._resourcesCreeps)) {
						this._resourcesCreeps = {};

						for (let creep of this.creeps) {
							Object.keys(creep.carries).forEach(content => {
								if (_.isUndefined(this._resourcesCreeps[content]))
									this._resourcesCreeps[content] = creep.carry[content];
								else this._resourcesCreeps[content] += creep.carry[content];
							});
						}
					}
					return this._resourcesCreeps;
				},
			},
			resourcesOffers: {
				get() {
					if (_.isUndefined(this._resourcesOffers)) {
						this._resourcesOffers = {};
						let data = this.memory.resources;

						if (!_.isUndefined(data) && !_.isUndefined(data.offers))
							this._resourcesOffers = Util.sumCompoundType(data.offers);
					}
					return this._resourcesOffers;
				},
			},
			resourcesOrders: {
				get() {
					if (_.isUndefined(this._resourcesOrders)) {
						this._resourcesOrders = {};
						let data = this.memory.resources;

						if (!_.isUndefined(data) && !_.isUndefined(data.orders))
							this._resourcesOrders = Util.sumCompoundType(data.orders);
					}
					return this._resourcesOrders;
				},
			},
			resourcesReactions: {
				get() {
					if (_.isUndefined(this._resourcesReactions)) {
						this._resourcesReactions = {};
						let data = this.memory.resources;

						if (
							!_.isUndefined(data) &&
							!_.isUndefined(data.reactions) &&
							!_.isUndefined(data.reactions.orders) &&
							data.reactions.orders.length === 1
						) {
							const reaction = data.reactions;
							const reactionOrders = reaction.orders[0];

							const compound = reactionOrders.type;
							const amount = reactionOrders.amount;
							const ingredientA = LAB_REACTIONS[compound][0];
							const ingredientB = LAB_REACTIONS[compound][1];
							const labSeedA = Game.getObjectById(reaction.seed_a);
							const labSeedB = Game.getObjectById(reaction.seed_b);
							const mineralAmountA = labSeedA.mineralAmount;
							const mineralAmountB = labSeedB.mineralAmount;

							this._resourcesReactions[ingredientA] = amount - mineralAmountA;
							this._resourcesReactions[ingredientB] = amount - mineralAmountB;
						}
					}
					return this._resourcesReactions;
				},
			},
			resourcesAll: {
				get() {
					if (_.isUndefined(this._resourcesAll)) {
						this._resourcesAll = {};

						if (!_.isUndefined(this.storage)) {
							Object.keys(this.storage.store).forEach(content => {
								if (_.isUndefined(this._resourcesAll[content]))
									this._resourcesAll[content] = this.storedMinerals(content);
							});
						}
						if (!_.isUndefined(this.terminal)) {
							Object.keys(this.terminal.store).forEach(content => {
								if (_.isUndefined(this._resourcesAll[content]))
									this._resourcesAll[content] = this.storedMinerals(content);
							});
						}
					}
					return this._resourcesAll;
				},
			},
			droppedResources: {
				get() {
					if (_.isUndefined(this._droppedResources)) {
						this._droppedResources = this.find(FIND_DROPPED_RESOURCES);
					}
					return this._droppedResources;
				},
			},
			minerals: {
				get() {
					if (_.isUndefined(this._minerals)) {
						this._minerals = [];
						let add = id => {
							Util.addById(this._minerals, id);
						};
						_.forEach(this.memory.minerals, add);
					}
					return this._minerals;
				},
			},
			mineralType: {
				get() {
					if (_.isUndefined(this.memory.mineralType)) {
						let minerals = this.find(FIND_MINERALS);
						if (minerals && minerals.length > 0) this.memory.mineralType = minerals[0].mineralType;
						else this.memory.mineralType = '';
					}
					return this.memory.mineralType;
				},
			},
			sources: {
				get() {
					if (_.isUndefined(this.memory.sources) || this.name == 'sim') {
						this._sources = this.find(FIND_SOURCES);
						if (this._sources.length > 0) {
							this.memory.sources = this._sources.map(s => s.id);
						} else this.memory.sources = [];
					}
					if (_.isUndefined(this._sources)) {
						this._sources = [];
						let addSource = id => {
							Util.addById(this._sources, id);
						};
						this.memory.sources.forEach(addSource);
					}
					return this._sources;
				},
			},
			sourceAccessibleFields: {
				get() {
					if (_.isUndefined(this.memory.sourceAccessibleFields)) {
						let sourceAccessibleFields = 0;
						let sources = this.sources;
						let countAccess = source => (sourceAccessibleFields += source.accessibleFields);
						_.forEach(sources, countAccess);
						this.memory.sourceAccessibleFields = sourceAccessibleFields;
					}
					return this.memory.sourceAccessibleFields;
				},
			},
			sourceEnergyAvailable: {
				get() {
					if (_.isUndefined(this._sourceEnergyAvailable)) {
						this._sourceEnergyAvailable = 0;
						let countEnergy = source => (this._sourceEnergyAvailable += source.energy);
						_.forEach(this.sources, countEnergy);
					}
					return this._sourceEnergyAvailable;
				},
			},
			ticksToNextRegeneration: {
				get() {
					if (_.isUndefined(this._ticksToNextRegeneration)) {
						this._ticksToNextRegeneration =
							_(this.sources)
								.map('ticksToRegeneration')
								.min() || 0;
					}
					return this._ticksToNextRegeneration;
				},
			},
			saveMinerals: {
				value() {
					let toPos = o => {
						return {
							x: o.pos.x,
							y: o.pos.y,
						};
					};
					let extractorPos = this.structures.all
						.filter(structure => structure.structureType === STRUCTURE_EXTRACTOR && structure.active)
						.map(toPos);
					let hasExtractor = m =>
						_.some(extractorPos, {
							x: m.pos.x,
							y: m.pos.y,
						});
					const validMineral = this.find(FIND_MINERALS).filter(hasExtractor);
					if (validMineral.length > 0) {
						let id = o => o.id;
						this.memory.minerals = _.map(validMineral, id);
					} else delete this.memory.minerals;
				},
			},
		});
	};
}

export default new ResourcesManager();
