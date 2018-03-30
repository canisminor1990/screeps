export class ActionHarvest {
  creep: Creep;

  // constructor(creep: Creep) {
  //   super('harvest');
  //   this.creep = creep;
  // }

  renewTarget = false;

  isValidAction = (): boolean => {
    return this.creep.sum < this.creep.carryCapacity && this.creep.room.sourceEnergyAvailable > 0;
  };

  isValidTarget = (target: Source): boolean => {
    if (target === null || target.energy === null || target.energy > 0) return false;
    if (_.isUndefined(target.targetOf)) return true;

    return (
      target.targetOf.length <= target.accessibleFields &&
      !_.some(
        target.targetOf,
        (c: Creep) =>
          (c.memory.role === 'miner' || c.memory.role === 'remoteMiner') &&
          c.body.work >= 5 &&
          (c.ticksToLive || CREEP_LIFE_TIME) >= ((c.data && c.data.predictedRenewal) || 0)
      )
    );
  };

  isAddableTarget = (target: Source): boolean => {
    const AddableRoom =
      _.isUndefined(this.creep.room.controller) ||
      // my room or not owned
      ((!this.creep.room.controller.owner || this.creep.room.controller.my) &&
        // my reservation or none
        (!this.creep.room.controller.reservation ||
          this.creep.room.controller.reservation.username === this.creep.owner.username));
    const AddableTarget =
      _.isUndefined(target.targetOf) || target.targetOf.length <= target.accessibleFields;
    return AddableRoom && AddableTarget;
  };

  newTarget = (): Source | null => {
    const roomSources = _.sortBy(this.creep.room.sources, s => this.creep.pos.getRangeTo(s));
    for (let source of roomSources) {
      if (this.isValidTarget(source) && this.isAddableTarget(source)) {
        return source;
      }
    }
    return null;
  };

  work = (): number => {
    return this.creep.harvest(this.creep.target);
  };
}
