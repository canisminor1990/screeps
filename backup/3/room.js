// save original API functions
let find = Room.prototype.find;

let mod = {};
module.exports = mod;
mod.register = function() {
    // run register in each of our submodules
    for (const key of Object.keys(Room._ext)) {
        if (Room._ext[key].register) Room._ext[key].register();
    }
    Room.costMatrixInvalid.on(room => Room.rebuildCostMatrix(room.name || room));
    Room.RCLChange.on(room => room.structures.all.filter(s => ![STRUCTURE_ROAD, STRUCTURE_WALL, STRUCTURE_RAMPART].includes(s.structureType)).forEach(s => {
        if (!s.isActive()) _.set(room.memory, ['structures', s.id, 'active'], false);
    }));
};
Room.pathfinderCache = {};
Room.pathfinderCacheDirty = false;
Room.pathfinderCacheLoaded = false;
Room.COSTMATRIX_CACHE_VERSION = global.COMPRESS_COST_MATRICES ? 4 : 5; // change this to invalidate previously cached costmatrices
mod.extend = function(){
    // run extend in each of our submodules
    for (const key of Object.keys(Room._ext)) {
        if (Room._ext[key].extend) Room._ext[key].extend();
    }

    let Structures = function(room){
        this.room = room;

        Object.defineProperties(this, {
            'all': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._all) ){
                        this._all = this.room.find(FIND_STRUCTURES);
                    }
                    return this._all;
                }
            },
            'my': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._my) ){
                        this._my = this.room.find(FIND_MY_STRUCTURES);
                    }
                    return this._my;
                }
            },
            'towers': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._towers) ){
                        this._towers = [];
                        var add = id => { addById(this._towers, id); };
                        _.forEach(this.room.memory.towers, add);
                    }
                    return this._towers;
                }
            },
            'repairable': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._repairable) ){
                        let that = this;
                        this._repairable = _.sortBy(
                            that.all.filter(
                                structure => Room.shouldRepair(that.room, structure)
                            ),
                            'hits'
                        );
                    }
                    return this._repairable;
                }
            },
            'urgentRepairable': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._urgentRepairableSites) ){
                        var isUrgent = site => (site.hits < (LIMIT_URGENT_REPAIRING + (DECAY_AMOUNT[site.structureType] || 0)));
                        this._urgentRepairableSites = _.filter(this.repairable, isUrgent);
                    }
                    return this._urgentRepairableSites;
                }
            },
            'feedable': {
                configurable: true,
                get: function() {
                    if (_.isUndefined(this._feedable)) {
                        this._feedable = this.extensions.concat(this.spawns);
                    }
                    return this._feedable;
                }
            },
            'fortifyable': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._fortifyableSites) ){
                        let that = this;
                        this._fortifyableSites = _.sortBy(
                            that.all.filter(
                                structure => (
                                    that.room.my &&
                                    structure.hits < structure.hitsMax &&
                                    structure.hits < MAX_FORTIFY_LIMIT[that.room.controller.level] &&
                                    ( structure.structureType != STRUCTURE_CONTAINER || structure.hits < MAX_FORTIFY_CONTAINER ) &&
                                    ( !DECAYABLES.includes(structure.structureType) || (structure.hitsMax - structure.hits) > GAP_REPAIR_DECAYABLE*3 ) &&
                                    ( Memory.pavementArt[that.room.name] === undefined || Memory.pavementArt[that.room.name].indexOf('x'+structure.pos.x+'y'+structure.pos.y+'x') < 0 ) &&
                                    ( !FlagDir.list.some(f => f.roomName == structure.pos.roomName && f.color == COLOR_ORANGE && f.x == structure.pos.x && f.y == structure.pos.y) )
                                )
                            ),
                            'hits'
                        );
                    }
                    return this._fortifyableSites;
                }
            },
            'fuelable': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._fuelables) ){
                        var that = this;
                        var factor = that.room.situation.invasion ? 1 : 0.82;
                        var fuelable = target => (target.energy < (target.energyCapacity * factor));
                        this._fuelables = _.sortBy( _.filter(this.towers, fuelable), 'energy') ; // TODO: Add Nuker
                    }
                    return this._fuelables;
                }
            },
            'container' : {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._container) ){
                        this._container = new Room.Containers(this.room);
                    }
                    return this._container;
                }
            },
            'links' : {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._links) ){
                        this._links = new Room.Links(this.room);
                    }
                    return this._links;
                }
            },
            'labs' : {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._labs) ){
                        this._labs = new Room.Labs(this.room);
                    }
                    return this._labs;
                }
            },
            'virtual': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._virtual) ){
                        this._virtual = _(this.all).concat(this.piles);
                    }
                    return this._virtual;
                }
            },
            'piles': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._piles) ){
                        const room = this.room;
                        this._piles = FlagDir.filter(FLAG_COLOR.command.drop, room.getPositionAt(25,25), true)
                            .map(function(flagInformation) {
                                const flag = Game.flags[flagInformation.name];
                                const piles = room.lookForAt(LOOK_ENERGY, flag.pos.x, flag.pos.y);
                                return piles.length && piles[0] || flag;
                            });
                    }
                    return this._piles;
                }
            },
            'observer': {
                configurable: true,
                get: function() {
                    if (_.isUndefined(this._observer) && this.room.memory.observer) {
	                    this._observer = Game.getObjectById(this.room.memory.observer.id);
                    }
                    return this._observer;
                },
            },
            'nuker': {
                configurable: true,
                get: function() {
                    if (_.isUndefined(this._nuker)) {
                        if (this.room.memory.nukers && this.room.memory.nukers.length > 0) {
                            this._nuker = Game.getObjectById(this.room.memory.nukers[0].id);
                        }
                    }
                    return this._nuker;
                },
            },
            'nukers': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._nukers) ){
                        this._nukers = new Room.Nuker(this.room);
                    }
                    return this._nukers;
                }
            },
            'powerSpawn': {
                configurable: true,
                get: function() {
                    if (_.isUndefined(this._powerSpawn)) {
                        if (this.room.memory.powerSpawns && this.room.memory.powerSpawns.length > 0) {
                            this._powerSpawn = Game.getObjectById(this.room.memory.powerSpawns[0].id);
                        }
                    }
                    return this._powerSpawn;
                }
            },
            'powerSpawns': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._powerSpawns) ){
                        this._powerSpawns = new Room.PowerSpawn(this.room);
                    }
                    return this._powerSpawns;
                }
            },
            'extensions': {
                configurable: true,
                get: function() {
                    if (_.isUndefined(this.room.memory.extensions)) {
                        this.room.saveExtensions();
                    }
                    if (_.isUndefined(this._extensions)) {
                        this._extensions = _.map(this.room.memory.extensions, e => Game.getObjectById(e));
                    }
                    return this._extensions;
                },
            },
            'spawns': {
                configurable: true,
                get: function() {
                    if( _.isUndefined(this._spawns) ){
                        this._spawns = [];
                        var addSpawn = id => { addById(this._spawns, id); };
                        _.forEach(this.room.memory.spawns, addSpawn);
                    }
                    return this._spawns;
                }
            },
        });
    };

    Object.defineProperties(Room.prototype, {
        'flags': {
            configurable: true,
            get() {
                return Util.get(this, '_flags', _.filter(FlagDir.list, {roomName: this.name}));
            },
        },
        'structures': {
            configurable: true,
            get: function() {
                if( _.isUndefined(this._structures) ){
                    this._structures = new Structures(this);
                }
                return this._structures;
            }
        },
        'isCriticallyFortifyable': {
            configurable: true,
            get: function() {
                return _.some(this.structures.fortifyable, 'isCriticallyFortifyable');
            }
        },
        'relativeEnergyAvailable': {
            configurable: true,
            get: function() {
                if( _.isUndefined(this._relativeEnergyAvailable) ){
                    this._relativeEnergyAvailable = this.energyCapacityAvailable > 0 ? this.energyAvailable / this.energyCapacityAvailable : 0;
                }
                return this._relativeEnergyAvailable;
            }
        },
        'relativeRemainingEnergyAvailable': {
            configurable: true,
            get: function() {
                return this.energyCapacityAvailable > 0 ? this.remainingEnergyAvailable / this.energyCapacityAvailable : 0;
            }
        },
        'remainingEnergyAvailable': {
            configurable: true,
            get: function() {
                return this.energyAvailable - this.reservedSpawnEnergy;
            }
        },
        'reservedSpawnEnergy': {
            configurable: true,
            get: function() {
                if( _.isUndefined(this._reservedSpawnEnergy) ) {
                    this._reservedSpawnEnergy = 0;
                }
                return this._reservedSpawnEnergy;
            },
            set: function(value) {
                this._reservedSpawnEnergy = value;
            }
        },
        'creeps': {
            configurable: true,
            get: function() {
                if( _.isUndefined(this._creeps) ){
                    this._creeps = this.find(FIND_MY_CREEPS);
                }
                return this._creeps;
            }
        },
        'allCreeps': {
            configurable: true,
            get: function() {
                if( _.isUndefined(this._allCreeps) ){
                    this._allCreeps = this.find(FIND_CREEPS);
                }
                return this._allCreeps;
            }
        },
        'immobileCreeps': {
            configurable: true,
            get: function() {
                if( _.isUndefined(this._immobileCreeps) ){
                    this._immobileCreeps = _.filter(this.creeps, c => {
                        const s = c.data && c.data.determinatedSpot;
                        return s && c.pos.isEqualTo(c.room.getPositionAt(s.x, s.y));
                    });
                }
                return this._immobileCreeps;
            }
        },
        'situation': {
            configurable: true,
            get: function() {
                if( _.isUndefined(this._situation) ){
                    this._situation = {
                        noEnergy: this.sourceEnergyAvailable == 0,
                        invasion: this.hostiles.length > 0 && (!this.controller || !this.controller.safeMode)
                    }
                }
                return this._situation;
            }
        },
        'adjacentRooms': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this.memory.adjacentRooms) ) {
                    this.memory.adjacentRooms = Room.adjacentRooms(this.name);
                }
                return this.memory.adjacentRooms;
            }
        },
        'adjacentAccessibleRooms': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this.memory.adjacentAccessibleRooms) ) {
                    this.memory.adjacentAccessibleRooms = Room.adjacentAccessibleRooms(this.name);
                }
                return this.memory.adjacentAccessibleRooms;
            }
        },
        'privateerMaxWeight': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this._privateerMaxWeight) ) {
                    this._privateerMaxWeight = 0;
                    if ( !this.situation.invasion && !this.conserveForDefense ) {
                        let base = this.controller.level * 1000;
                        let that = this;
                        let adjacent, ownNeighbor, room, mult;

                        let flagEntries = FlagDir.filter(FLAG_COLOR.invade.exploit);
                        let countOwn = roomName => {
                            if( roomName == that.name ) return;
                            if( Room.isMine(roomName) ) ownNeighbor++;
                        };
                        let calcWeight = flagEntry => {
                            if( !this.adjacentAccessibleRooms.includes(flagEntry.roomName) ) return;
                            room = Game.rooms[flagEntry.roomName];
                            if( room ) {
                                adjacent = room.adjacentAccessibleRooms;
                                mult = room.sources.length;
                            } else {
                                adjacent = Room.adjacentAccessibleRooms(flagEntry.roomName);
                                mult = 1;
                            }
                            ownNeighbor = 1;
                            adjacent.forEach(countOwn);
                            that._privateerMaxWeight += (mult * base / ownNeighbor);
                        };
                        flagEntries.forEach(calcWeight);
                    }
                };
                return this._privateerMaxWeight;
            }
        },
        'claimerMaxWeight': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this._claimerMaxWeight) ) {
                    this._claimerMaxWeight = 0;
                    let base = 1250;
                    let maxRange = 2;
                    let that = this;
                    let distance, reserved, flag;
                    let rcl = this.controller.level;

                    let flagEntries = FlagDir.filter([FLAG_COLOR.claim, FLAG_COLOR.claim.reserve, FLAG_COLOR.invade.exploit]);
                    let calcWeight = flagEntry => {
                        // don't spawn claimer for reservation at RCL < 4 (claimer not big enough)
                        if( rcl > 3 || (flagEntry.color == FLAG_COLOR.claim.color && flagEntry.secondaryColor == FLAG_COLOR.claim.secondaryColor )) {
                            distance = Room.roomDistance(that.name, flagEntry.roomName);
                            if( distance > maxRange )
                                return;
                            flag = Game.flags[flagEntry.name];
                            if( flag.room && flag.room.controller && flag.room.controller.reservation && flag.room.controller.reservation.ticksToEnd > 2500)
                                return;

                            reserved = flag.targetOf && flag.targetOf ? _.sum( flag.targetOf.map( t => t.creepType == 'claimer' ? t.weight : 0 )) : 0;
                            that._claimerMaxWeight += (base - reserved);
                        };
                    };
                    flagEntries.forEach(calcWeight);
                };
                return this._claimerMaxWeight;
            }
        },
        'structureMatrix': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this._structureMatrix)) {
                    const cachedMatrix = Room.getCachedStructureMatrix(this.name);
                    if (cachedMatrix) {
                        this._structureMatrix = cachedMatrix;
                    } else {
                        if (global.DEBUG) logSystem(this.name, 'Calculating cost matrix');
                        const costMatrix = new PathFinder.CostMatrix;
                        let setCosts = structure => {
                            const site = structure instanceof ConstructionSite;
                            // don't walk on allied construction sites.
                            if (site && !structure.my && Task.reputation.allyOwner(structure)) return costMatrix.set(structure.pos.x, structure.pos.y, 0xFF);
                            if (structure.structureType === STRUCTURE_ROAD) {
                                if (!site || USE_UNBUILT_ROADS)
                                    return costMatrix.set(structure.pos.x, structure.pos.y, 1);
                            } else if (structure.structureType === STRUCTURE_PORTAL) {
                                return costMatrix.set(structure.pos.x, structure.pos.y, 0xFF); // only take final step onto portals
                            } else if (OBSTACLE_OBJECT_TYPES.includes(structure.structureType)) {
                                if (!site || Task.reputation.allyOwner(structure)) // don't set for hostile construction sites
                                    return costMatrix.set(structure.pos.x, structure.pos.y, 0xFF);
                            } else if (structure.structureType === STRUCTURE_RAMPART && !Task.reputation.allyOwner(structure) && !structure.isPublic) {
                                if (!site)
                                    return costMatrix.set(structure.pos.x, structure.pos.y, 0xFF);
                            }
                        };
                        this.structures.all.forEach(setCosts);
                        this.constructionSites.forEach(setCosts);
                        this.immobileCreeps.forEach(c => costMatrix.set(c.pos.x, c.pos.y, 0xFF));
                        const prevTime = _.get(Room.pathfinderCache, [this.name, 'updated']);
                        Room.pathfinderCache[this.name] = {
                            costMatrix: costMatrix,
                            updated: Game.time,
                            version: Room.COSTMATRIX_CACHE_VERSION
                        };
                        Room.pathfinderCacheDirty = true;
                        if( global.DEBUG && global.TRACE ) trace('PathFinder', {roomName:this.name, prevTime, structures:this.structures.all.length, PathFinder:'CostMatrix'}, 'updated costmatrix');
                        this._structureMatrix = costMatrix;
                    }
                }
                return this._structureMatrix;
            }
        },
        'avoidSKMatrix': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this._avoidSKMatrix)) {
                    const SKCreeps = this.hostiles.filter(c => c.owner.username === 'Source Keeper');
                    this._avoidSKMatrix = this.getAvoidMatrix({'Source Keeper': SKCreeps});
                }
                return this._avoidSKMatrix;
            }
        },
        'my': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this._my) ) {
                    this._my = this.controller && this.controller.my;
                }
                return this._my;
            }
        },
        'myReservation': {
            configurable: true,
            get: function (){
                if (_.isUndefined(this._myReservation)) {
                    this._myReservation = this.reservation === global.ME;
                }
                return this._myReservation;
            },
        },
        'reserved': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this._reserved) ) {
                    if (this.controller) {
                        const myName = _.find(Game.spawns).owner.username;
                        this._reserved = this.controller.my || (this.controller.reservation
                            && this.controller.reservation.username === myName);
                    } else {
                        this._reserved = false;
                    }
                }
                return this._reserved;
            },
        },
        'owner': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this._owner)) {
                    if (this.controller && this.controller.owner) {
                        this._owner = this.controller.owner.username;
                    } else {
                        this._owner = false;
                    }
                }
                return this._owner;
            },
        },
        'reservation': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this._reservation)) {
                    if (this.controller && this.controller.reservation) {
                        this._reservation = this.controller.reservation.username;
                    } else {
                        this._reservation = false;
                    }
                }
                return this._reservation;
            },
        },
        'ally': {
            configurable: true,
            get: function () {
                if (_.isUndefined(this._ally)) {
                    if (this.reserved) {
                        this._ally = true;
                    } else if (this.controller) {
                        this._ally = Task.reputation.isAlly(this.owner) || Task.reputation.isAlly(this.reservation);
                    } else {
                        this._ally = false;
                    }
                }
                return this._ally;
            },
        },
        'pavementArt': {
            configurable: true,
            get: function() {
                if( _.isUndefined(this.memory.pavementArt) ) {
                    this.memory.pavementArt = [];
                }
                return this.memory.pavementArt;
            }
        },
        'collapsed': {
            configurable: true,
            get: function() {
                if( _.isUndefined(this._collapsed) ) {
                    // only if owned
                    if( !this.my ) {
                        this._collapsed = false;
                        return;
                    }
                    // no creeps ? collapsed!
                    if( !this.population ) {
                        this._collapsed = true;
                        return;
                    }
                    // is collapsed if workers + haulers + pioneers in room = 0
                    let workers = this.population.typeCount['worker'] ? this.population.typeCount['worker'] : 0;
                    let haulers = this.population.typeCount['hauler'] ? this.population.typeCount['hauler'] : 0;
                    let pioneers = this.population.typeCount['pioneer'] ? this.population.typeCount['pioneer'] : 0;
                    this._collapsed = (workers + haulers + pioneers) === 0;
                }
                return this._collapsed;
            }
        },
        'RCL': {
            configurable: true,
            get() {
                if (!this.controller) return;
                return Util.get(this.memory, 'RCL', this.controller.level);
            },
        },
        'skip': {
            configurable: true,
            get() {
                return Util.get(this, '_skip', !!FlagDir.find(FLAG_COLOR.command.skipRoom, this));
            },
        },
    });

    Room.prototype.checkRCL = function() {
        if (!this.controller) return;
        if (this.memory.RCL !== this.controller.level) {
            Room.RCLChange.trigger(this);
            this.memory.RCL = this.controller.level;
        }
    };

    Room.prototype.countMySites = function() {
        const numSites = _.size(this.myConstructionSites);
        if (!_.isUndefined(this.memory.myTotalSites) && numSites !== this.memory.myTotalSites) {
            Room.costMatrixInvalid.trigger(this);
        }
        if (numSites > 0) this.memory.myTotalSites = numSites;
        else delete this.memory.myTotalSites;
    };

    Room.prototype.countMyStructures = function() {
        const numStructures = _.size(this.structures.my);
        if (!_.isUndefined(this.memory.myTotalStructures) && numStructures !== this.memory.myTotalStructures) {
            Room.costMatrixInvalid.trigger(this);
            // these are vital for feeding
            this.saveExtensions();
            this.saveSpawns();
        }
        else delete this.memory.myTotalStructures;
    };
    Room.prototype.getBorder = function(roomName) {
        return _.findKey(Game.map.describeExits(this.name), function(name) {
            return this.name === name;
        }, {name: roomName});
    };

    Room.prototype.find = function (c, opt) {
        if (_.isArray(c)) {
            return _(c)
                .map(x => find.call(this, x, opt))
                .flatten()
                .value();
        } else
            return find.apply(this, arguments);
    };

    Room.prototype.findRoute = function(destination, checkOwner = true, preferHighway = true, allowSK = true){
        if (this.name == destination)  return [];
        const options = { checkOwner, preferHighway, allowSK };
        return Game.map.findRoute(this, destination, {
            routeCallback: Room.routeCallback(this.name, destination, options)
        });
    };

    Room.prototype.recordMove = function(creep){
        if( !ROAD_CONSTRUCTION_ENABLE &&
        (!ROAD_CONSTRUCTION_FORCED_ROOMS[Game.shard.name] ||
        (ROAD_CONSTRUCTION_FORCED_ROOMS[Game.shard.name] &&
        ROAD_CONSTRUCTION_FORCED_ROOMS[Game.shard.name].indexOf(this.name)==-1)) ) return;
        let x = creep.pos.x;
        let y = creep.pos.y;
        if ( x == 0 || y == 0 || x == 49 || y == 49 ||
            creep.carry.energy == 0 || creep.data.actionName == 'building' )
            return;

        let key = `${String.fromCharCode(32+x)}${String.fromCharCode(32+y)}_x${x}-y${y}`;
        if( !this.roadConstructionTrace[key] )
            this.roadConstructionTrace[key] = 1;
        else this.roadConstructionTrace[key]++;
    };

    Room.prototype.isWalkable = function(x, y, look) {
        if (!look) look = this.lookAt(x,y);
        else look = look[y][x];
        let invalidObject = o => {
            return ((o.type == LOOK_TERRAIN && o.terrain == 'wall') ||
                OBSTACLE_OBJECT_TYPES.includes(o[o.type].structureType));
        };
        return look.filter(invalidObject).length == 0;
    };
    Room.prototype.exits = function(findExit, point) {
        if (point === true) point = 0.5;
        let positions;
        if (findExit === 0) {
            // portals
            positions = _.chain(this.find(FIND_STRUCTURES)).filter(function(s) {
                return s.structureType === STRUCTURE_PORTAL;
            }).map('pos').value();
        } else {
            positions = this.find(findExit);
        }

        // assuming in-order
        let maxX, maxY;
        let map = {};
        let limit = -1;
        const ret = [];
        for (let i = 0; i < positions.length; i++) {
            const pos = positions[i];
            if (!(_.get(map,[pos.x-1, pos.y]) || _.get(map,[pos.x,pos.y-1]))) {
                if (point && limit !== -1) {
                    ret[limit].x += Math.ceil(point * (maxX - ret[limit].x));
                    ret[limit].y += Math.ceil(point * (maxY - ret[limit].y));
                }
                limit++;
                ret[limit] = _.pick(pos, ['x','y']);
                maxX = pos.x;
                maxY = pos.y;
                map = {};
            }
            _.set(map, [pos.x, pos.y], true);
            maxX = Math.max(maxX, pos.x);
            maxY = Math.max(maxY, pos.y);
        }
        if (point && limit !== -1) {
            ret[limit].x += Math.ceil(point * (maxX - ret[limit].x));
            ret[limit].y += Math.ceil(point * (maxY - ret[limit].y));
        }
        return ret;
    }
    Room.prototype.showCostMatrix = function(matrix = this.structureMatrix, aroundPos) {
        const vis = new RoomVisual(this.name);
        let startY = 0;
        let endY = 50;
        let startX = 0;
        let endX = 50;
        if (aroundPos) {
            startY = Math.max(0, aroundPos.y - 3);
            endY = Math.min(50, aroundPos.y + 4);
            startX = Math.max(0, aroundPos.x - 3);
            endX = Math.min(50, aroundPos.x + 4);
        }
        const maxCost = _.max(matrix._bits);
        const getColourByPercentage = (value) => {
            const hue = ((1 - value) * 120).toString(10);
            return `hsl(${hue}, 100%, 50%)`;
        };
        for (var y = startY; y < endY; y++) {
            for (var x = startX; x < endX; x++) {
                const cost = matrix.get(x, y);
                if (cost) vis.text(cost, x, y);
                vis.rect(x - 0.5, y - 0.5, 1, 1, {fill: getColourByPercentage(cost / maxCost)});
            }
        }
    };
    // toAvoid - a list of creeps to avoid sorted by owner
    Room.prototype.getAvoidMatrix = function(toAvoid) {
        const avoidMatrix = this.structureMatrix.clone();
        for (const owner in toAvoid) {
            const creeps = toAvoid[owner];
            for (const creep of creeps) {
                for (let x = Math.max(0, creep.pos.x - 3); x <= Math.min(49, creep.pos.x + 3); x++) {
                    const deltaX = x < creep.pos.x ? creep.pos.x - x : x - creep.pos.x;
                    for (let y = Math.max(0, creep.pos.y - 3); y <= Math.min(49, creep.pos.y + 3); y++) {
                        if (this.isWalkable(x, y)) {
                            const deltaY = y < creep.pos.y ? creep.pos.y - y : y - creep.pos.y;
                            const cost = 17 - (2 * Math.max(deltaX, deltaY));
                            avoidMatrix.set(x, y, cost) // make it less desirable than a swamp
                        }
                    }
                }
            }
        }
        return avoidMatrix;
    };
    Room.prototype.invalidateCostMatrix = function() {
        Room.costMatrixInvalid.trigger(this.name);
    };

    Room.prototype.highwayHasWalls = function() {
        if (!Room.isHighwayRoom(this.name)) return false;
        return !!_.find(this.getPositionAt(25, 25).lookFor(LOOK_STRUCTURES), s => s instanceof StructureWall);
    };
    Room.prototype.isTargetAccessible = function(object, target) {
        if (!object || !target) return;
        // Checks. Accept RoomObject, RoomPosition, and mock position
        if (object instanceof RoomObject) object = object.pos;
        if (target instanceof RoomObject) target = target.pos;
        for (const prop of ['x', 'y', 'roomName']) {
            if (!Reflect.has(object, prop) || !Reflect.has(target, prop)) return;
        }

        if (!Room.isHighwayRoom(this.name)) return;
        if (!this.highwayHasWalls()) return true;

        const [x, y] = Room.calcCoordinates(this.name, (x, y) => [x, y]);

        const getVerHalf = o => Math.floor(o.x / 25) === 0 ? LEFT : RIGHT;

        const getHorHalf = o => Math.floor(o.y / 25) === 0 ? TOP : BOTTOM;

        const getQuadrant = o => {
            const verHalf = getVerHalf(o);
            const horHalf = getHorHalf(o);
            if (verHalf === LEFT) {
                return horHalf === TOP ? TOP_LEFT : BOTTOM_LEFT;
            } else {
                return horHalf === TOP ? TOP_RIGHT : BOTTOM_RIGHT;
            }
        };

        if (x % 10 === 0) {
            if (y % 10 === 0) { // corner room

                const top = !!_.find(this.getPositionAt(25, 24).lookFor(LOOK_STRUCTURES), s => s instanceof StructureWall);
                const left = !!_.find(this.getPositionAt(24, 25).lookFor(LOOK_STRUCTURES, s => s instanceof StructureWall));
                const bottom = !!_.find(this.getPositionAt(25, 26).lookFor(LOOK_STRUCTURES, s => s instanceof StructureWall));
                const right = !!_.find(this.getPositionAt(26, 25).lookFor(LOOK_STRUCTURES, s => s instanceof StructureWall));

                // both in same quadrant
                if (getQuadrant(object) === getQuadrant(target)) return true;

                if (top && left && bottom && right) {
                    // https://i.imgur.com/8lmqtbi.png
                    return getQuadrant(object) === getQuadrant(target);
                }

                if (top) {
                    if (bottom) {
                        // cross section
                        if (left) {
                            return Util.areEqual(RIGHT, getVerHalf(object), getVerHalf(target));
                        } else {
                            return Util.areEqual(LEFT, getVerHalf(object), getVerHalf(target));
                        }
                    }
                    if (left && right) {
                        // cross section
                        if (getHorHalf(object) !== getHorHalf(target)) return false;
                        return Util.areEqual(BOTTOM, getHorHalf(object), getHorHalf(target));
                    }
                    if (Util.areEqual(BOTTOM, getHorHalf(object), getHorHalf(target))) return true;
                    if (left) {
                        if (Util.areEqual(RIGHT, getVerHalf(object), getVerHalf(target))) return true;
                        if (getQuadrant(object) === TOP_LEFT && getQuadrant(target) !== TOP_LEFT) return false;
                    } else {
                        if (Util.areEqual(LEFT, getVerHalf(object), getVerHalf(target))) return true;
                        if (getQuadrant(object) === TOP_RIGHT && getQuadrant(target) !== TOP_RIGHT) return false;
                    }
                } else {
                    if (left && right) {
                        // cross section
                        if (getHorHalf(object) !== getHorHalf(target)) return false;
                        return Util.areEqual(TOP, getHorHalf(object), getHorHalf(target));
                    }
                    if (Util.areEqual(TOP, getHorHalf(object), getHorHalf(target))) return true;
                    if (left) {
                        if (Util.areEqual(RIGHT, getVerHalf(object), getVerHalf(target))) return true;
                        if (getQuadrant(object) === BOTTOM_LEFT && getQuadrant(target) !== BOTTOM_LEFT) return false;
                    } else {
                        if (Util.areEqual(LEFT, getVerHalf(object), getVerHalf(target))) return true;
                        if (getQuadrant(object) === BOTTOM_RIGHT && getQuadrant(target) !== BOTTOM_RIGHT) return false;
                    }
                }
                return true;
            }
            if (getVerHalf(object) === getVerHalf(target)) return true;
        }
        if (y % 10 === 0) {
            if (getHorHalf(object) === getHorHalf(target)) return true;
        }
        return true;
    };
    Room.prototype.targetAccessible = function(target) {
        if (!target) return;
        if (target instanceof RoomObject) target = target.pos;
        for (const prop of ['x', 'y', 'roomName']) {
            if (!Reflect.has(target, prop)) return;
        }

        if (!Room.isHighwayRoom(this.name)) return;
        if (!this.highwayHasWalls()) return true;

        const closestRoom = _(Game.rooms).filter('my').min(r => Game.map.getRoomLinearDistance(r.name, this.name));
        if (closestRoom === Infinity) return;

        const [x1, y1] = Room.calcGlobalCoordinates(this.name, (x, y) => [x, y]);
        const [x2, y2] = Room.calcGlobalCoordinates(closestRoom, (x, y) => [x, y]);
        let dir = '';
        if (y1 - y2 < 0) {
            dir += 'south';
        } else if (y1 - y2 > 0) {
            dir += 'north';
        }
        if (x1 - x2 < 0) {
            dir += 'east';
        } else if (x1 - x2 > 0) {
            dir += 'west';
        }
        if (x1 % 10 === 0) {
            if (y1 % 10 === 0) {
                // corner room
                if (dir.includes('south') && dir.includes('east')) {
                    return this.isTargetAccessible(this.getPositionAt(49, 49), target);
                }
                if (dir.includes('south') && dir.includes('west')) {
                    return this.isTargetAccessible(this.getPositionAt(0, 49), target);
                }
                if (dir.includes('north') && dir.includes('east')) {
                    return this.isTargetAccessible(this.getPositionAt(49, 0), target);
                }
                if (dir.includes('north') && dir.includes('west')) {
                    return this.isTargetAccessible(this.getPositionAt(0, 0), target);
                }
            }
            if (dir.includes('east')) {
                return this.isTargetAccessible(this.getPositionAt(49, 25), target);
            }
            if (dir.includes('west')) {
                return this.isTargetAccessible(this.getPositionAt(0, 25), target);
            }
        }
        if (y1 % 10 === 0) {
            if (dir.includes('south')) {
                return this.isTargetAccessible(this.getPositionAt(25, 49), target);
            }
            if (dir.includes('north')) {
                return this.isTargetAccessible(this.getPositionAt(25, 0), target);
            }
        }
        return true;
    };

    Room.prototype.switchRamparts = function() {
        if (!this.my) return;

        const accessString = String.fromCodePoint(0x1f44b) + String.fromCodePoint(0x1f3fe) + String.fromCodePoint(0x1F6AA) + String.fromCodePoint(0x1f510);

        // Close Ramparts
        this.structures.my                                  // Iterate over all room structures
            .filter(s => s instanceof StructureRampart)     // Filter out structures not a rampart
            .filter(rampart => rampart.isPublic)            // Filter out any rampart already closed
            .forEach(rampart => rampart.setPublic(false));  // Close any public rampart

        // Open Ramparts
        this.allCreeps                                          // Iterate over all creeps
            .filter(creep => creep.saying === accessString)     // Filter out any creeps not requesting access
            .filter(creep => Task.reputation.allyOwner(creep))  // Filter out any non-friendly creeps
            .forEach(creep => {
                const radius = 2;
                const [x, y] = [creep.pos.x, creep.pos.y];
                const bounds = [
                    y - radius < 0 ? 0 : y - radius,    // TOP
                    x - radius < 0 ? 0 : x - radius,    // LEFT
                    y + radius > 49 ? 49 : y + radius,  // BOTTOM
                    x + radius > 49 ? 49 : x + radius,  // RIGHT
                ];
                creep.room.lookForAtArea(LOOK_STRUCTURES, ...bounds, true)      // Iterate over positions within bounds to the creep
                    .filter(look => look.structure instanceof StructureRampart) // Filter out structures not a rampart
                    .map(look => look.structure)                                // Map the array to ramparts
                    .forEach(rampart => rampart.setPublic(true));               // Open closed ramparts
            });
    };

    Room.prototype.getCreepMatrix = function(structureMatrix = this.structureMatrix) {
        if (_.isUndefined(this._creepMatrix) ) {
            const costs = structureMatrix.clone();
            // Avoid creeps in the room
            this.allCreeps.forEach(function(creep) {
                costs.set(creep.pos.x, creep.pos.y, 0xff);
            });
            this._creepMatrix = costs;
        }
        return this._creepMatrix;
    };
    Room.prototype.GCOrders = function () {

        let data = this.memory.resources,
            GCAllRoomOffers = function () {

            console.log(`running GCAllRoomOffers()`);

            let myRooms = _.filter(Game.rooms, {'my': true});

            for (let room of myRooms) {
                let offers = room.memory.resources.offers,
                    targetOfferIdx;
                for (let i = 0; i < offers.length; i++) {
                    let offer = offers[i];
                    let targetRoom = Game.rooms[offer.room];
                    if (!(targetRoom && targetRoom.memory && targetRoom.memory.resources && targetRoom.memory.resources.orders)) continue;
                    let order = targetRoom.memory.resources.orders.find((o) => {
                        return o.id === offer.id && o.type === offer.type;
                    });
                    if (order)
                        targetOfferIdx = order.offers.findIndex((o) => {
                            return o.room === this.name;
                        });
                    if (!order || targetOfferIdx === -1) {
                        global.logSystem(room.name, `Orphaned offer found and deleted in ${room.name}`);
                        offers.splice(i, 1);
                        i--;
                    }
                }
            }
        };

        if (_.isUndefined(data)) {
            if (global.DEBUG)
                global.logSystem(this.name, `there is no ${this.name}.memory.resources.`);
            return;
        }

        if (data.orders.length === 0)
            return;

        if (global.DEBUG)
            global.logSystem(this.name, `garbage collecting ${this.name} roomOrders`);

        let orders = data.orders,
            validOrders,
            reactions = data.reactions,
            reactionInProgress = reactions.orders.length > 0 && reactions.orders[0].amount > 0;

        // garbage collecting room.orders
        if (reactionInProgress) {

            let reactionsOrders = reactions.orders[0],
                componentA = global.LAB_REACTIONS[reactionsOrders.type][0],
                componentB = global.LAB_REACTIONS[reactionsOrders.type][1];

            console.log(`componentA: ${componentA} componentB: ${componentB}`);

            validOrders = _.filter(orders, order => {
                let offerExist = _.some(order.offers, offer => {
                   let offerRoom = Game.rooms[offer.room];
                   return _.some(offerRoom.memory.resources.offers, offer => {
                       return offer.id === order.id && order.type === offer.type;
                   })
                });
                return offerExist && order.amount > 0 && (order.type === componentA || order.type === componentB || (!_.isUndefined(global.COMPOUNDS_TO_ALLOCATE[order.type]) && global.COMPOUNDS_TO_ALLOCATE[order.type].allocate));
            });
        } else {
            validOrders = _.filter(orders, order => {
                let offerExist = _.some(order.offers, offer => {
                    let offerRoom = Game.rooms[offer.room];
                    return _.some(offerRoom.memory.resources.offers, offer => {
                        return offer.id === order.id && order.type === offer.type;
                    })
                });
                return offerExist && order.amount > 0 && !_.isUndefined(global.COMPOUNDS_TO_ALLOCATE[order.type]) && global.COMPOUNDS_TO_ALLOCATE[order.type].allocate;
            });
        }

        console.log(`orders: ${orders.length}`);
        //global.BB(orders);
        console.log(`validOrders: ${validOrders.length}`);
        //global.BB(validOrders);

        // write it back to memory if it is needed
        if (orders.length > validOrders.length) {
            if (global.DEBUG)
                global.logSystem(this.name, `found invalid orders in ${this.name}, orders fixed.`);
            this.memory.resources.orders = validOrders;
        }

        if (!this.ordersWithOffers()) {
            if (global.DEBUG) {
                global.logSystem(this.name, `not enough or no offers found. Updating room orders in room ${this.name}`);
                global.BB(this.memory.resources.orders);
            }

            GCAllRoomOffers();
            this.updateRoomOrders();
            data.boostTiming.ordersPlaced = Game.time;
            data.boostTiming.checkRoomAt = Game.time + 1;
            return true;
        } else {
            data.boostTiming.checkRoomAt = Game.time + global.CHECK_ORDERS_INTERVAL;
            return false;
        }



    };
    Room.prototype.GCOffers = function () {

        let data = this.memory.resources;

        if (_.isUndefined(data)) {
            if (global.DEBUG)
                global.logSystem(this.name, `there is no ${this.name}.memory.resources.`);
            return;
        }
        let offers = data.offers,
            validOffers,
            terminalOrderPlaced = false,
            readyOffersFound = 0;

        if (offers.length === 0)
            return false;

        if (global.DEBUG)
            global.logSystem(this.name, `garbage collecting ${this.name} roomOffers`);

        // garbage collecting room.offers
        validOffers = _.filter(offers, offer => {

            let orderRoom = Game.rooms[offer.room],
                orderRoomOrders = orderRoom.memory.resources.orders;
            if (!_.isUndefined(orderRoomOrders) && orderRoomOrders.length > 0) {

                return _.some(orderRoomOrders, order => {
                    let resourcesAll = this.resourcesAll[offer.type];
                    return offer.id === order.id && !_.isUndefined(resourcesAll) && resourcesAll >= 0;
                });
            }
        });

        global.logSystem(this.name, `room offers: ${offers.length}`);
        //global.BB(offers);
        global.logSystem(this.name, `room validOffer: ${validOffers.length}`);
        //global.BB(validOffers);

        // write it back to memory if it is needed
        if (offers.length > validOffers.length) {
            if (global.DEBUG)
                global.logSystem(this.name, `found invalid offers in ${this.name}, offers fixed.`);
            this.memory.resources.offers = validOffers;
            offers = validOffers;
        }
        // checking terminal orders
        if (offers.length > 0) {

            for (let offer of offers) {

                let readyAmount = this.terminal.store[offer.type] || 0;

                global.logSystem(this.name, `${readyAmount} / ${offer.amount} ${offer.type} are in ${this.name} terminal`);

                if ((readyAmount >= offer.amount * 0.5 && readyAmount < offer.amount - global.MIN_OFFER_AMOUNT) || readyAmount >= offer.amount){
                    if (global.DEBUG)
                        global.logSystem(offer.room, `${Math.min(readyAmount, offer.amount)} ${offer.type} are ready to send from ${this.name}`);
                    readyOffersFound ++;
                    break;
                } else {
                    // make order in offerRoom terminal.orders
                    let terminalOrders = this.memory.resources.terminal[0].orders,
                        terminalId = this.memory.resources.terminal[0].id,
                        terminal = this.terminal,
                        validTerminalOrders;

                    // garbage collecting offerRoom terminal orders
                    validTerminalOrders = _.filter(terminalOrders, order => {
                        return (order.orderAmount > 0 || order.orderRemaining > 0 || order.storeAmount > 0) && _.some(offers, offer => {
                            return (offer.type === order.type && offer.amount === order.orderRemaining + (terminal.store[offer.type] || 0)) || order.orderAmount === global.MIN_OFFER_AMOUNT;
                        });
                    });

                    global.logSystem(this.name, `${this.name} terminalOrders: ${terminalOrders.length}`);
                    //global.BB(terminalOrders);
                    global.logSystem(this.name, `${this.name} valid terminalOrders: ${validTerminalOrders.length}`);
                    //global.BB(validTerminalOrders);

                    // write orders
                    if (terminalOrders.length > validTerminalOrders.length) {
                        global.logSystem(this.name, `found invalid terminal orders in ${this.name}, orders fixed.`);
                        this.memory.resources.terminal[0].orders = validTerminalOrders;
                    }

                    // making terminal orders if it does not exist
                    for (let offer of offers) {

                        let ordered = global.sumCompoundType(validTerminalOrders, 'orderRemaining'),
                            allResources = (ordered[offer.type] || 0) + (terminal.store[offer.type] || 0);
                        global.logSystem(this.name, `${this.name} offers: ${offer.amount} terminal ordered: ${(ordered[offer.type] || 0)} terminal stored: ${(terminal.store[offer.type] || 0)} allResources: ${allResources}`);
                        if (offer.amount > allResources) {
                            this.placeOrder(terminalId, offer.type, Math.max(offer.amount, global.MIN_OFFER_AMOUNT));
                            terminalOrderPlaced = true;
                            if (global.DEBUG) {
                                global.logSystem(this.name, `no / not enough terminal order found in ${this.name} for ${offer.type} ${offer.amount}, terminal stores ${(terminal.store[offer.type] || 0)} terminal order placed for ${offer.amount - allResources} ${offer.type}`);
                            }
                        } else if (offer.amount < allResources && offer.type !== this.mineralType && allResources > 100) {
                            this.placeOrder(terminalId, offer.type, Math.max(offer.amount - allResources, global.MIN_OFFER_AMOUNT));
                            if (global.DEBUG) {
                                global.logSystem(this.name, `too much terminal order found in ${this.name} for ${offer.type} ${offer.amount}, terminal stores ${(terminal.store[offer.type] || 0)} terminal order placed for ${offer.amount - allResources} ${offer.type}`);
                            }
                        }
                    }
                }
            }
        }

        global.logSystem(this.name, `GCOffers returns -> readyOffersFound: ${readyOffersFound} terminalOrderPlaced: ${terminalOrderPlaced} `);

        return {
            readyOffersFound: readyOffersFound,
            terminalOrderPlaced: terminalOrderPlaced
        };



    };
    Room.prototype.GCLabs = function () {

        if (global.DEBUG)
            global.logSystem(this.name, `garbage collecting labOrders in ${this.name}`);

        let data = this.memory.resources,
            labs = data.lab,
            reactions = data.reactions,
            reactionsOrders = reactions.orders[0];

        for (let i = 0; i < labs.length; i++) {

            let lab = labs[i],
                order;

            if (lab.orders.length > 0) {

                if (data.reactions.orders.length > 0) {

                    let componentA = global.LAB_REACTIONS[reactionsOrders.type][0],
                        componentB = global.LAB_REACTIONS[reactionsOrders.type][1];

                        order = _.filter(lab.orders, liveOrder => {
                        if ((liveOrder.orderAmount > 0 || liveOrder.orderRemaining > 0 || liveOrder.storeAmount > 0)
                            && (liveOrder.type === componentA || liveOrder.type === componentB || liveOrder.type === 'energy'
                                || lab.reactionState === 'Storage'))

                            return liveOrder;
                    });
                } else {

                    order =_.filter(lab.orders, liveOrder => {
                        if (liveOrder.type === 'energy' || lab.reactionState === 'Storage')
                            return liveOrder;
                    });

                }

                if (lab.orders.length > order.length) {
                    this.memory.resources.lab[i].orders = order;
                    if (global.DEBUG)
                        global.logSystem(this.name, `lab orders fixed in ${this.name}, ${lab.id}`);
                }
            }
        }
    };
    Room.prototype.checkOffers = function () {

        let data = this.memory.resources,
            orders = data.orders,
            candidates = [],
            returnValue;

        for (let order of orders) {
            if (order.offers.length > 0) {
                for (let offer of order.offers) {

                    let roomTested = _.some(candidates, room => {
                        return room.room === offer.room;
                    });

                    if (!roomTested) {
                        let offerRoom = Game.rooms[offer.room];

                            returnValue = offerRoom.GCOffers();

                        if (returnValue.readyOffersFound > 0) {
                            candidates.push({
                                room: offer.room,
                                readyOffers: returnValue.readyOffersFound
                            });
                        }
                    }
                }
            }
        }

        if (candidates.length === 1 && candidates[0].readyOffers === 1) {
            let currentRoom = Game.rooms[candidates[0].room];
            global.logSystem(this.name, `${candidates[0].room} there is only one offersReady for ${this.name}, running fillARoomOrder()`);
            let fillARoomOrdersReturn = false;
            console.log(`cooldown: ${currentRoom.terminal.cooldown}`);
            if (currentRoom.terminal.cooldown === 0) {
                fillARoomOrdersReturn = currentRoom.fillARoomOrder();
                console.log(`fillARoomOrder: ${fillARoomOrdersReturn}`);
                if (fillARoomOrdersReturn === true && data.orders.length === 0 || _.sum(data.orders, 'amount') === 0) {
                    if (Memory.boostTiming && Memory.boostTiming.compoundAllocationEnabled === false) {
                        data.boostTiming.reactionMaking = Game.time;
                        data.boostTiming.roomState = 'reactionMaking';
                        this.countCheckRoomAt();
                    } else
                        data.boostTiming.checkRoomAt = Game.time + global.CHECK_ORDERS_INTERVAL;

                    global.logSystem(currentRoom.name, `${currentRoom.name} terminal send was successful. And there are no more orders`);
                    global.logSystem(currentRoom.name, `${currentRoom.name} time: ${Game.time} boostTiming:`);
                    global.BB(data.boostTiming);

                } else if (fillARoomOrdersReturn === true) {
                    data.boostTiming.checkRoomAt = Game.time + global.CHECK_ORDERS_INTERVAL;
                    global.logSystem(currentRoom.name, `${currentRoom.name} terminal send was successful. And there are MORE orders`);
                    global.logSystem(currentRoom.name, `${currentRoom.name} time: ${Game.time}, boostTiming:`);
                    global.BB(data.boostTiming);
                }

            } else {
                data.boostTiming.checkRoomAt = Game.time + currentRoom.terminal.cooldown;
                global.logSystem(currentRoom.name, `${currentRoom.name} terminal cooldown is: ${currentRoom.terminal.cooldown}`);
                global.logSystem(currentRoom.name, `${currentRoom.name} time: ${Game.time}, boosTiming:`);
                global.BB(data.boostTiming);

            }
            return fillARoomOrdersReturn;

        } else if (candidates.length >= 1 || (candidates.length === 1 && candidates[0].readyOffers > 1)) {
            global.logSystem(this.name, `${this.name} has more than one offers ready, boostTiming.ordersReady created`);
            global.BB(candidates);
            data.boostTiming.ordersReady = {
                time: Game.time,
                orderCandidates: candidates
            };
            if (!Memory.boostTiming)
                Memory.boostTiming = {};
            Memory.boostTiming.multiOrderingRoomName = this.name;
            data.boostTiming.checkRoomAt = Game.time + _.sum(candidates, 'readyOffers');
            return true;
        } else if (returnValue.terminalOrderPlaced) {
            console.log(`terminal orders placed for room ${this.name}`);
            data.boostTiming.checkRoomAt = Game.time + global.CHECK_ORDERS_INTERVAL;
            return false;
        } else {
            global.logSystem(this.name, `${this.name} no readyOffers found`);
            data.boostTiming.checkRoomAt = Game.time + global.CHECK_ORDERS_INTERVAL;
            return false;
        }


    };
    Room.prototype.ordersWithOffers = function () {
        let orders = this.memory.resources.orders;
        if (orders.length === 0)
            return false;
        return _.some(orders, order => {
            let orderOffersAmount = _.sum(order.offers, 'amount') || 0;
            return orderOffersAmount >= order.amount && order.amount > 0;
        });
    };
    Room.prototype.makeReaction = function () {

        let roomFound = {},
            amountToMake,
            makeCompound = function (roomName, compound, amount) {

                let currentRoom = Game.rooms[roomName];

                if (_.isUndefined(currentRoom.memory.resources))
                    return false;
                if (_.isUndefined(currentRoom.memory.resources.reactions))
                    return false;

                let data = currentRoom.memory.resources.reactions,
                    whatNeeds = function (compound, amount) {

                        if (compound.length === 1 && compound !== 'G')
                            return;

                        let sumStorage = function (mineral) {

                                let myRooms =  _.filter(Game.rooms, {'my': true}),
                                    roomStored = 0;

                                for (let room of myRooms) {
                                    roomStored += room.resourcesAll[mineral] || 0;
                                }

                                return roomStored;
                            },
                            ingredientNeeds = function (compound, amount) {
                                // this amount has to be produced in this room
                                let storedAll = sumStorage(compound),
                                    storedRoom = currentRoom.resourcesAll[compound] || 0,
                                    storedOffRoom = storedAll - storedRoom,
                                    ingredientNeeds;

                                if (storedOffRoom < global.TRADE_THRESHOLD) {
                                    ingredientNeeds = amount - storedRoom;
                                    if (ingredientNeeds < 0)
                                        ingredientNeeds = 0;
                                    else if (ingredientNeeds < global.MIN_COMPOUND_AMOUNT_TO_MAKE)
                                        ingredientNeeds = global.MIN_COMPOUND_AMOUNT_TO_MAKE;
                                } else {
                                    ingredientNeeds = amount - storedAll;
                                    if (ingredientNeeds < 0)
                                        ingredientNeeds = 0;
                                    else if (ingredientNeeds < global.MIN_COMPOUND_AMOUNT_TO_MAKE)
                                        ingredientNeeds = global.MIN_COMPOUND_AMOUNT_TO_MAKE;
                                }

                                return global.divisibleByFive(ingredientNeeds);
                            },
                            findIngredients = function (compound, amount) {

                                let ingredientA = (global.LAB_REACTIONS[compound][0]),
                                    ingredientB = (global.LAB_REACTIONS[compound][1]);

                                return {
                                    [ingredientA]: ingredientNeeds(ingredientA, amount),
                                    [ingredientB]: ingredientNeeds(ingredientB, amount)
                                };
                            },
                            slicer = function (compound, amount) {

                                let product = {},
                                    returnValue = {},
                                    slice = function (stuff) {
                                        if (Object.keys(stuff).length === 0)
                                            return false;
                                        else
                                            return stuff;
                                    };

                                product[compound] = findIngredients(compound, amount);

                                Object.keys(product).forEach(ingredients => {

                                    Object.keys(product[ingredients]).forEach(ingredient => {

                                        if (ingredient.length > 1 || ingredient === 'G')
                                            returnValue[ingredient] = product[ingredients][ingredient];

                                    });
                                });

                                return {
                                    product: product,
                                    slice: slice(returnValue)
                                };
                            },
                            returnObject = slicer(compound, amount),
                            product = returnObject.product,
                            slices = returnObject.slice;

                        do {

                            let returnArray = [];

                            Object.keys(slices).forEach(slice => {
                                returnObject = slicer(slice, slices[slice]);
                                product[slice] = returnObject.product[slice];
                                returnArray.push(returnObject.slice);
                            });
                            slices = {};
                            for (let slice of returnArray)
                                slices = Object.assign(slices, slice);

                        } while (_.some(slices, Object));

                        return product;
                    },
                    purchaseMinerals = function (roomName, mineral, amount) {

                        if (!global.PURCHASE_MINERALS) {
                            if (global.DEBUG)
                                console.log(`${roomName} needs to buy ${amount} ${mineral} but PURCHASE_MINERALS is false`);
                            return false;
                        }

                        if (currentRoom.storage.charge < 0.9) {
                            if (global.DEBUG)
                                console.log(`storage.charge in ${roomName} is ${currentRoom.storage.charge}, purchase for ${mineral} is delayed`);
                            return false;

                        }

                        if (currentRoom.terminal.cooldown > 0) {
                            if (global.DEBUG)
                                console.log(`terminal.coolDown in ${roomName} is ${currentRoom.terminal.cooldown}, purchase for ${mineral} is delayed`);
                            return false;
                        }

                        if (data.reactorMode !== 'idle') {
                            if (global.DEBUG)
                                console.log(`Labs are currently making ${data.orders[0].amount} ${data.orders[0].type} in ${roomName}, meanwhile there is a shortage on ${mineral}, purchase delayed`);
                            return false;
                        }

                        if (global.DEBUG)
                            console.log(`buying ${amount} ${mineral} in ${roomName}`);

                        let sellRatio;

                        if (global.AUTOMATED_RATIO_COUNT) {
                            sellRatio = global.countPrices('sell', mineral, roomName);
                            if (global.DEBUG)
                                console.log(`average sellRatio: ${roomName} ${mineral} ${sellRatio}`);
                        } else
                            sellRatio = global.MAX_BUY_RATIO[mineral];

                        let order,
                            returnValue,
                            resOrders = Game.market.getAllOrders(o => {

                                let currentRoom = Game.rooms[roomName],
                                    transactionCost,
                                    credits;

                                if (o.type !== 'sell')
                                    return false;
                                if (o.resourceType !== mineral)
                                    return false;

                                o.transactionAmount = Math.min(o.amount, amount);

                                transactionCost = Game.market.calcTransactionCost(o.transactionAmount, o.roomName, roomName);

                                if (transactionCost > currentRoom.terminal.store[RESOURCE_ENERGY])
                                    return false;

                                credits = o.transactionAmount * o.price;

                                if (Game.market.credits < credits) {
                                    o.transactionAmount = Game.market.credits / o.price;
                                    if (o.transactionAmount === 0) return false;
                                }
                                o.ratio = (credits - (transactionCost * global.ENERGY_VALUE_CREDITS)) / o.transactionAmount;

                                if (o.ratio > sellRatio || o.amount < 100)
                                    return false;

                                return true;
                            });

                        if (resOrders.length > 0) {

                            order = _.min(resOrders, 'ratio');
                            console.log('selected order: ');
                            global.BB(order);


                            if (global.DEBUG && order) {
                                console.log(`Game.market.deal("${order.id}", ${order.transactionAmount}, "${roomName}");`);
                            }
                            returnValue = Game.market.deal(order.id, order.transactionAmount, roomName);
                            if (returnValue === OK) {
                                console.log(`Purchased ${order.transactionAmount} ${mineral} at price: ${order.price} it costs: ${order.transactionAmount * order.price}`);
                                return true;
                            } else {
                                console.log(`purchase was FAILED error code: ${translateErrorCode(returnValue)}`);
                                console.log(returnValue);
                                return false;
                            }

                        } else {
                            if (global.DEBUG) {
                                if (sellRatio === 0)
                                    console.log(`There are no sellOrders for ${mineral}`);
                                else {
                                    console.log(`No sell order found for ${amount} ${mineral} at ratio ${global.MAX_BUY_RATIO[mineral]} in room ${roomName}`);
                                    console.log(`You need to adjust MAX_BUY_RATIO or use AUTOMATED_RATIO_COUNT: true in parameters, current is: ${global.MAX_BUY_RATIO[mineral]}, recommended: ${sellRatio}`);
                                }

                            }

                            return false;
                        }


                    },
                    makeIngredient = function (roomName, ingredient, amount) {

                        if (_.isUndefined(data)) {
                            if (global.DEBUG)
                                console.log(`labs in room ${roomName} are not registered as flower`);
                            return false;
                        } else if (data.reactorType !== 'flower') {
                            if (global.DEBUG)
                                console.log(`labs in room ${roomName} are not registered as flower`);
                            return false;
                        }

                        let currentRoom = Game.rooms[roomName],
                            returnValue = false;

                        if (data.reactorMode === 'idle') {
                            if (global.DEBUG)
                                global.logSystem(roomName, `${currentRoom.name} - placeReactionOrder(${ingredient}, ${ingredient}, ${amount})`);

                            // garbage collecting labs
                            currentRoom.GCLabs();

                            // place the reaction order
                            currentRoom.placeReactionOrder(ingredient, ingredient, amount);
                            global.logSystem(currentRoom, `${currentRoom.name}, placeReaction time: ${Game.time}`);
                            // logging time
                            let boostTiming = currentRoom.memory.resources.boostTiming;
                            boostTiming.reactionPlaced = Game.time;
                            boostTiming.roomState = 'reactionPlaced';
                            returnValue = true;
                        }

                        return returnValue;
                    },
                    product = whatNeeds(compound, amount),
                    mineralPurchased = false,
                    ingredientMade = false,
                    compoundArray = [],
                    currentCompound;

                if (!currentRoom.storage || !currentRoom.terminal) {
                    if (global.DEBUG)
                        console.log(`there are no storage/terminal in ${currentRoom.name}`);
                    return false;
                }

                if (_.isUndefined(currentRoom.memory.labs) || currentRoom.memory.labs.length === 0) {
                    if (global.DEBUG)
                        console.log(`there are no labs in ${currentRoom.name}`);
                    return false;
                }

                if (currentRoom.terminal.isActive() === false || currentRoom.storage.isActive() === false || Game.getObjectById(currentRoom.memory.labs[0].id).isActive() === false)
                    return false;

                Object.keys(product).forEach(ingredients => {

                    Object.keys(product[ingredients]).forEach(ingredient => {

                        let ingredientAmount = product[ingredients][ingredient];

                        if (ingredientAmount > 0 && !mineralPurchased) {

                            // purchase minerals if it can not be ordered
                            if (ingredient.length === 1 && ingredient !== 'G' && (currentRoom.resourcesAll[ingredient] || 0) < ingredientAmount && !mineralPurchased) {
                                if (global.DEBUG)
                                    console.log(`purchaseMinerals(${roomName}, ${ingredient}, ${ingredientAmount})`);
                                mineralPurchased = purchaseMinerals(roomName, ingredient, ingredientAmount);
                                if (!mineralPurchased)
                                    return {
                                        ingredientMade: ingredientMade,
                                        mineralPurchased: mineralPurchased
                                    }
                            }
                            // if ingredient can make, collect the compounds
                            if (!mineralPurchased) {
                                if (ingredient.length > 1 || ingredient === 'G')
                                    compoundArray.push({
                                        compound: ingredient,
                                        amount: ingredientAmount
                                    });
                            }
                        }
                    });
                });
                // define tier 3 compound
                if (compoundArray.length === 0)
                    compoundArray.push({
                        compound: compound,
                        amount: amount
                    });
                // make the compound
                if (!mineralPurchased) {
                    currentCompound = compoundArray[compoundArray.length - 1];
                    ingredientMade = makeIngredient(roomName, currentCompound.compound, currentCompound.amount);
                }
                return {
                    ingredientMade: ingredientMade,
                    mineralPurchased: mineralPurchased
                }
            };

        Object.keys(global.COMPOUNDS_TO_MAKE).forEach(compound => {

            if (global.COMPOUNDS_TO_MAKE[compound].make && !roomFound.ingredientMade && (this.name.indexOf(global.COMPOUNDS_TO_MAKE[compound].rooms) > -1 || global.COMPOUNDS_TO_MAKE[compound].rooms.length === 0)) {

                // TODO + (this.resourcesLabs[compound] || 0); ?
                let storedResources = (this.resourcesAll[compound] || 0) + (this.resourcesLabs[compound] || 0);

                if (storedResources === 0) {
                    amountToMake = global.divisibleByFive(global.COMPOUNDS_TO_MAKE[compound].amount + global.COMPOUNDS_TO_MAKE[compound].threshold);
                    roomFound = makeCompound(this.name, compound, amountToMake);
                    if (roomFound.ingredientMade && global.DEBUG)
                        global.logSystem(this.name, `there is no ${compound}, so making ${global.COMPOUNDS_TO_MAKE[compound].amount} ${compound} in ${this.name}`);
                } else if (storedResources <= global.COMPOUNDS_TO_MAKE[compound].threshold) {
                    amountToMake = global.divisibleByFive(global.COMPOUNDS_TO_MAKE[compound].amount + global.COMPOUNDS_TO_MAKE[compound].threshold - storedResources);
                    roomFound = makeCompound(this.name, compound, amountToMake);
                    if (roomFound.ingredientMade && global.DEBUG)
                        global.logSystem(this.name, `it is below the threshold, so making ${amountToMake} ${compound} in ${this.name}`);
                }
            }
        });

        return roomFound.ingredientMade || roomFound.mineralPurchased;

    };
    Room.prototype.storedMinerals = function (mineral) {

        let returnValue = (this.resourcesStorage[mineral] || 0) + (this.resourcesTerminal[mineral] || 0) - (this.resourcesOffers[mineral] || 0) - (this.resourcesReactions[mineral] || 0);
        if (returnValue < 0)
            returnValue = 0;
        return returnValue;
    };
    Room.prototype.countCheckRoomAt = function () {
        let data = this.memory.resources,
            boostTiming = data.boostTiming,
            numberOfLabs = data.lab.length,
            reactionCoolDown = REACTION_TIME[data.reactions.orders[0].type],
            producedAmountPerTick = LAB_REACTION_AMOUNT,
            allLabsProducedAmountPerTick = (producedAmountPerTick * (numberOfLabs - 2)) / reactionCoolDown,
            amount = data.reactions.orders[0].amount;
        boostTiming.checkRoomAt = boostTiming.reactionMaking + global.roundUp(amount / allLabsProducedAmountPerTick);
    };


    RoomPosition.prototype.findClosestByPathFinder = function(goals, itr=_.identity) {
	    let mapping = _.map(goals, itr);
	    if(_.isEmpty(mapping))
		    return {goal: null};
	    let result = PathFinder.search(this, mapping, {
		    maxOps: 16000,
		    roomCallback: (roomName) => {
		        let room = Game.rooms[roomName];
		        if (!room) return;
		        return room.structureMatrix;
		    }
	    });
	    let last = _.last(result.path);
	    if(last == undefined)
		    last = this;
		    // return {goal: null};
	    let goal = _.min(goals, g => last.getRangeTo(g.pos));
	    return {
		    goal: (Math.abs(goal)!==Infinity)?goal:null,
		    cost: result.cost,
		    ops: result.ops,
		    incomplete: result.incomplete
	    }
    }
    RoomPosition.prototype.findClosestSpawn = function() {
	    return this.findClosestByPathFinder(Game.spawns, (spawn) => ({pos: spawn.pos, range: 1})).goal;
    }
};
mod.flush = function(){
    // run flush in each of our submodules
    for (const key of Object.keys(Room._ext)) {
        if (Room._ext[key].flush) Room._ext[key].flush();
    }
    let clean = room => {
        for (const key of Object.keys(Room._ext)) {
            if (Room._ext[key].flushRoom) Room._ext[key].flushRoom(room);
        }
    };
    _.forEach(Game.rooms, clean);
};
mod.totalSitesChanged = function() {
    const numSites = _.size(Game.constructionSites);
    const oldSites = Memory.rooms.myTotalSites || 0;
    if (numSites > 0) Memory.rooms.myTotalSites = numSites;
    else delete Memory.rooms.myTotalSites;
    return oldSites && oldSites !== numSites;
};
mod.totalStructuresChanged = function() {
    const numStructures = _.size(Game.structures);
    const oldStructures = Memory.rooms.myTotalStructures || 0;
    if (numStructures > 0) Memory.rooms.myTotalStructures = numStructures;
    else delete Memory.rooms.myTotalStructures;
    return oldStructures && oldStructures !== numStructures;
};
mod.needMemoryResync = function(room) {
    if (_.isUndefined(room.memory.initialized)) {
        room.memory.initialized = Game.time;
        return true;
    }
    return Game.time % global.MEMORY_RESYNC_INTERVAL === 0 || room.name == 'sim';
};
mod.analyze = function() {
    const p = Util.startProfiling('Room.analyze', {enabled:PROFILING.ROOMS});
    // run analyze in each of our submodules
    for (const key of Object.keys(Room._ext)) {
        if (Room._ext[key].analyze) Room._ext[key].analyze();
    }
    const totalSitesChanged = Room.totalSitesChanged();
    const totalStructuresChanged = Room.totalStructuresChanged();
    const getEnvironment = room => {
        try {
            const needMemoryResync = Room.needMemoryResync(room);
            // run analyzeRoom in each of our submodules
            for (const key of Object.keys(Room._ext)) {
                if (Room._ext[key].analyzeRoom) Room._ext[key].analyzeRoom(room, needMemoryResync);
            }
            if (totalSitesChanged) room.countMySites();
            if (totalStructuresChanged) room.countMyStructures();
            room.checkRCL();
            room.switchRamparts();
        }
        catch(err) {
            Game.notify('Error in room.js (Room.prototype.loop) for "' + room.name + '" : ' + err.stack ? err + '<br/>' + err.stack : err);
            console.log( dye(CRAYON.error, 'Error in room.js (Room.prototype.loop) for "' + room.name + '": <br/>' + (err.stack || err.toString()) + '<br/>' + err.stack));
        }
    };
    _.forEach(Game.rooms, r => {
        if (r.skip) return;
        getEnvironment(r);
        p.checkCPU(r.name, PROFILING.ANALYZE_LIMIT / 5);
    });
};
mod.execute = function() {
    const p = Util.startProfiling('Room.execute', {enabled:PROFILING.ROOMS});
    // run execute in each of our submodules
    for (const key of Object.keys(Room._ext)) {
        if (Room._ext[key].execute) Room._ext[key].execute();
    }
    let run = (memory, roomName) => {
        try {
            // run executeRoom in each of our submodules
            for (const key of Object.keys(Room._ext)) {
                if (Room._ext[key].executeRoom) Room._ext[key].executeRoom(memory, roomName);
            }
            const room = Game.rooms[roomName];
            if (room) { // has sight
                if (room.collapsed) {
                    const p2 = Util.startProfiling(roomName + 'execute', {enabled:PROFILING.ROOMS});
                    Room.collapsed.trigger(room);
                    p2.checkCPU('collapsed', 0.5);
                }
            }
        } catch (e) {
            Util.logError(e.stack || e.message);
        }
    };
    _.forEach(Memory.rooms, (memory, roomName) => {
        run(memory, roomName);
        p.checkCPU(roomName + '.run', 1);
        if (Game.time % MEMORY_RESYNC_INTERVAL === 0 && !Game.rooms[roomName] && typeof Memory.rooms[roomName].hostile !== 'boolean') {
            // clean up stale room memory for rooms no longer in use, but preserve manually set 'hostile' entries
            delete Memory.rooms[roomName];
        }
    });
};
mod.cleanup = function() {
    // run cleanup in each of our submodules
    for (const key of Object.keys(Room._ext)) {
        if (Room._ext[key].cleanup) Room._ext[key].cleanup();
    }
    // flush changes to the pathfinderCache but wait until load
    if (!_.isUndefined(Memory.pathfinder)) {
        OCSMemory.saveSegment(MEM_SEGMENTS.COSTMATRIX_CACHE, Memory.pathfinder);
        delete Memory.pathfinder;
    }
    if (Room.pathfinderCacheDirty && Room.pathfinderCacheLoaded) {
        // store our updated cache in the memory segment
        let encodedCache = {};
        for (const key in Room.pathfinderCache) {
            const entry = Room.pathfinderCache[key];
            if (entry.version === Room.COSTMATRIX_CACHE_VERSION) {
                encodedCache[key] = {
                    serializedMatrix: entry.serializedMatrix || (global.COMPRESS_COST_MATRICES ?
                        CompressedMatrix.serialize(entry.costMatrix) : entry.costMatrix.serialize()),
                    updated: entry.updated,
                    version: entry.version
                };
                // only set memory when we need to
                if (entry.stale) encodedCache[key].stale = true;
            }
        }
        OCSMemory.saveSegment(MEM_SEGMENTS.COSTMATRIX_CACHE, encodedCache);
        Room.pathfinderCacheDirty = false;
    }
};

mod.routeCallback = function(origin, destination, options) {
    if (_.isUndefined(origin) || _.isUndefined(destination)) logError('Room.routeCallback', 'both origin and destination must be defined - origin:' + origin + ' destination:' + destination);
    return function(roomName) {
        if (Game.map.getRoomLinearDistance(origin, roomName) > options.restrictDistance)
            return false;
        if( roomName !== destination && ROUTE_ROOM_COST[Game.shard.name] && ROUTE_ROOM_COST[Game.shard.name][roomName]) {
            return ROUTE_ROOM_COST[Game.shard.name][roomName];
        }
        let isHighway = false;
        if( options.preferHighway ){
            const parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
            isHighway = (parsed[1] % 10 === 0) || (parsed[2] % 10 === 0);
        }
        let isMyOrNeutralRoom = false;
        const hostile = _.get(Memory.rooms[roomName], 'hostile', false);
        if( options.checkOwner ){
            const room = Game.rooms[roomName];
            // allow for explicit overrides of hostile rooms using hostileRooms[roomName] = false
            isMyOrNeutralRoom = !hostile || (room &&
                                room.controller &&
                                (room.controller.my ||
                                (room.controller.owner === undefined)));
        }
        if (!options.allowSK && mod.isSKRoom(roomName)) return 10;
        if (!options.allowHostile && hostile &&
            roomName !== destination && roomName !== origin) {
            return Number.POSITIVE_INFINITY;
        }
        if (isMyOrNeutralRoom || roomName == origin || roomName == destination)
            return 1;
        else if (isHighway)
            return 3;
        else if( Game.map.isRoomAvailable(roomName))
            return (options.checkOwner || options.preferHighway) ? 11 : 1;
        return Number.POSITIVE_INFINITY;
    };
};
mod.getCostMatrix = function(roomName) {
    var room = Game.rooms[roomName];
    if(!room) return;
    return room.costMatrix;
};
mod.isMine = function(roomName) {
    let room = Game.rooms[roomName];
    return( room && room.my );
};

mod.calcCardinalDirection = function(roomName) {
    const parsed = /^([WE])[0-9]+([NS])[0-9]+$/.exec(roomName);
    return [parsed[1], parsed[2]];
};
mod.calcGlobalCoordinates = function(roomName, callBack) {
    if (!callBack) return null;
    const parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
    const x = +parsed[1];
    const y = +parsed[2];
    return callBack(x, y);
};
mod.calcCoordinates = function(roomName, callBack){
    if (!callBack) return null;
    return Room.calcGlobalCoordinates(roomName, (x, y) => {
        return callBack(x % 10, y % 10);
    });
};
mod.isCenterRoom = function(roomName){
    return Room.calcCoordinates(roomName, (x,y) => {
        return x === 5 && y === 5;
    });
};
mod.isCenterNineRoom = function(roomName){
    return Room.calcCoordinates(roomName, (x,y) => {
        return x > 3 && x < 7 && y > 3 && y < 7;
    });
};
mod.isControllerRoom = function(roomName){
    return Room.calcCoordinates(roomName, (x,y) => {
        return x !== 0 && y !== 0 && (x < 4 || x > 6 || y < 4 || y > 6);
    });
};
mod.isSKRoom = function(roomName){
    return Room.calcCoordinates(roomName, (x,y) => {
        return x > 3 && x < 7 && y > 3 && y < 7 && (x !== 5 || y !== 5);
    });
};
mod.isHighwayRoom = function(roomName){
    return Room.calcCoordinates(roomName, (x,y) => {
        return x === 0 || y === 0;
    });
};
mod.adjacentRooms = function(roomName){
    let parts = roomName.split(/([NESW])/);
    let dirs = ['N','E','S','W'];
    let toggle = q => dirs[ (dirs.indexOf(q)+2) % 4 ];
    let names = [];
    for( let x = parseInt(parts[2])-1; x < parseInt(parts[2])+2; x++ ){
        for( let y = parseInt(parts[4])-1; y < parseInt(parts[4])+2; y++ ){
            names.push( ( x < 0 ? toggle(parts[1]) + '0' : parts[1] + x ) + ( y < 0 ? toggle(parts[3]) + '0' : parts[3] + y ) );
        }
    }
    return names;
};
mod.adjacentAccessibleRooms = function(roomName, diagonal = true) {
    let validRooms = [];
    let exits = Game.map.describeExits(roomName);
    let addValidRooms = (roomName, direction) => {
        if( diagonal ) {
            let roomExits = Game.map.describeExits(roomName);
            let dirA = (direction + 1) % 8 + 1;
            let dirB = (direction + 5) % 8 + 1;
            if( roomExits && roomExits[dirA] && !validRooms.includes(roomExits[dirA]) )
                validRooms.push(roomExits[dirA]);
            if( roomExits && roomExits[dirB] && !validRooms.includes(roomExits[dirB]) )
                validRooms.push(roomExits[dirB]);
        }
        validRooms.push(roomName);
    }
    _.forEach(exits, addValidRooms);
    return validRooms;
};
mod.roomDistance = function(roomName1, roomName2, diagonal, continuous){
    if( diagonal ) return Game.map.getRoomLinearDistance(roomName1, roomName2, continuous);
    if( roomName1 == roomName2 ) return 0;
    let posA = roomName1.split(/([NESW])/);
    let posB = roomName2.split(/([NESW])/);
    let xDif = posA[1] == posB[1] ? Math.abs(posA[2]-posB[2]) : posA[2]+posB[2]+1;
    let yDif = posA[3] == posB[3] ? Math.abs(posA[4]-posB[4]) : posA[4]+posB[4]+1;
    //if( diagonal ) return Math.max(xDif, yDif); // count diagonal as 1
    return xDif + yDif; // count diagonal as 2
};
mod.rebuildCostMatrix = function(roomName) {
    if (global.DEBUG) logSystem(roomName, 'Invalidating costmatrix to force a rebuild when we have vision.');
    _.set(Room, ['pathfinderCache', roomName, 'stale'], true);
    _.set(Room, ['pathfinderCache', roomName, 'updated'], Game.time);
    Room.pathfinderCacheDirty = true;
};
mod.loadCostMatrixCache = function(cache) {
    let count = 0;
    for (const key in cache) {
        if (!Room.pathfinderCache[key] || Room.pathfinderCache[key].updated < cache[key].updated) {
            count++;
            Room.pathfinderCache[key] = cache[key];
        }
    }
    if (global.DEBUG && count > 0) logSystem('RawMemory', 'loading pathfinder cache.. updated ' + count + ' stale entries.');
    Room.pathfinderCacheLoaded = true;
};
mod.getCachedStructureMatrix = function(roomName) {
    const cacheValid = (roomName) => {
        if (_.isUndefined(Room.pathfinderCache)) {
            Room.pathfinderCache = {};
            Room.pathfinderCache[roomName] = {};
            return false;
        } else if (_.isUndefined(Room.pathfinderCache[roomName])) {
            Room.pathfinderCache[roomName] = {};
            return false;
        }
        const mem = Room.pathfinderCache[roomName];
        const ttl = Game.time - mem.updated;
        if (mem.version === Room.COSTMATRIX_CACHE_VERSION && (mem.serializedMatrix || mem.costMatrix) && !mem.stale && ttl < COST_MATRIX_VALIDITY) {
            if (global.DEBUG && global.TRACE) trace('PathFinder', {roomName:roomName, ttl, PathFinder:'CostMatrix'}, 'cached costmatrix');
            return true;
        }
        return false;
    };

    if (cacheValid(roomName)) {
        const cache = Room.pathfinderCache[roomName];
        if (cache.costMatrix) {
            return cache.costMatrix;
        } else if (cache.serializedMatrix) {
            // disabled until the CPU efficiency can be improved
            const costMatrix = global.COMPRESS_COST_MATRICES ? CompressedMatrix.deserialize(cache.serializedMatrix)
                : PathFinder.CostMatrix.deserialize(cache.serializedMatrix);
            cache.costMatrix = costMatrix;
            return costMatrix;
        } else {
            Util.logError('Room.getCachedStructureMatrix', `Cached costmatrix for ${roomName} is invalid ${cache}`);
            delete Room.pathfinderCache[roomName];
        }
    }
};
mod.getStructureMatrix = function(roomName, options) {
    const room = Game.rooms[roomName];
    let matrix;
    if (Room.isSKRoom(roomName) && options.avoidSKCreeps) {
        matrix = _.get(room, 'avoidSKMatrix');
    } else {
        matrix = _.get(room, 'structureMatrix');
    }

    if (!matrix) {
        matrix = _.get(Room.getCachedStructureMatrix(roomName), 'costMatrix');
    }

    return matrix;
};
mod.validFields = function(roomName, minX, maxX, minY, maxY, checkWalkable = false, where = null) {
    const room = Game.rooms[roomName];
    const look = checkWalkable ? room.lookAtArea(minY,minX,maxY,maxX) : null;
    let fields = [];
    for( let x = minX; x <= maxX; x++) {
        for( let y = minY; y <= maxY; y++){
            if( x > 1 && x < 48 && y > 1 && y < 48 ){
                if( !checkWalkable || room.isWalkable(x, y, look) ){
                    let p = new RoomPosition(x, y, roomName);
                    if( !where || where(p) )
                        fields.push(p);
                }
            }
        }
    }
    return fields;
};
// args = { spots: [{pos: RoomPosition, range:1}], checkWalkable: false, where: ()=>{}, roomName: abc ) }
mod.fieldsInRange = function(args) {
    let plusRangeX = args.spots.map(spot => spot.pos.x + spot.range);
    let plusRangeY = args.spots.map(spot => spot.pos.y + spot.range);
    let minusRangeX = args.spots.map(spot => spot.pos.x - spot.range);
    let minusRangeY = args.spots.map(spot => spot.pos.y - spot.range);
    let minX = Math.max(...minusRangeX);
    let maxX = Math.min(...plusRangeX);
    let minY = Math.max(...minusRangeY);
    let maxY = Math.min(...plusRangeY);
    return Room.validFields(args.roomName, minX, maxX, minY, maxY, args.checkWalkable, args.where);
};
mod.shouldRepair = function(room, structure) {
    return (
        // is not at 100%
        structure.hits < structure.hitsMax &&
        // not owned room or hits below RCL repair limit
        ( !room.my || structure.hits < global.MAX_REPAIR_LIMIT[room.controller.level] || structure.hits < (global.LIMIT_URGENT_REPAIRING + (2*global.DECAY_AMOUNT[structure.structureType] || 0))) &&
        // not decayable or below threshold
        ( !DECAYABLES.includes(structure.structureType) || (structure.hitsMax - structure.hits) > global.GAP_REPAIR_DECAYABLE ) &&
        // not pavement art
        ( Memory.pavementArt[room.name] === undefined || Memory.pavementArt[room.name].indexOf('x'+structure.pos.x+'y'+structure.pos.y+'x') < 0 ) &&
        // not flagged for removal
        ( !FlagDir.list.some(f => f.roomName == structure.pos.roomName && f.color == COLOR_ORANGE && f.x == structure.pos.x && f.y == structure.pos.y) )
    );
}
