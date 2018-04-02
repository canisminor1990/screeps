import { CreepAction } from '../action';

export class ActionHarvest extends CreepAction {
  name: 'harvest';
  renewTarget = false;

  isValidAction(): boolean {
    return !this.creep.isFull() && this.creep.room.sourcesEnergyAvailable() > 0;
  }

  isValidTarget(target?: Source): boolean {
    const Target = target || (this.creep.target() as Source | null);
    if (Target === null || Target.energy === null || Target.energy > 0) return false;
    if (Target.targetOf() === 0) return true;

    return (
      Target.targetOf() <= Target.accessibleFields() &&
      !_.some(
        Target.getTargetOfCreeps(),
        (c: Creep) =>
          (c.role() === 'miner' || c.role() === 'remoteMiner') && c.getBodyparts(WORK) >= 5
      )
    );
  }

  isAddableTarget(target?: Source): boolean {
    const Target = target || (this.creep.target() as Source | null);
    const controller = this.creep.room.controller;
    if (_.isUndefined(controller)) return true;
    const AddableRoom =
      controller &&
      (!controller.owner || controller.my) &&
      (!controller.reservation || controller.reservation.username === this.creep.owner.username);
    if (AddableRoom && Target !== null && Target.targetOf() <= Target.accessibleFields())
      return true;
    return false;
  }

  newTarget(): Source | null {
    const roomSources = _.sortBy(this.creep.room.sources(), (s: Source) =>
      this.creep.pos.getRangeTo(s)
    );
    for (let source of roomSources) {
      if (this.isValidTarget(source) && this.isAddableTarget(source)) {
        return source;
      }
    }
    return null;
  }

  work(): number {
    const Target = this.creep.target() as Source;
    if (Target === null) return ERR_INVALID_TARGET;
    return this.creep.harvest(Target);
  }
}
