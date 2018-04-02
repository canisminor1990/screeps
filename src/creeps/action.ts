import { ErrorType } from '../enums/error';

export class CreepAction {
  name: string;
  creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  // max allowed creeps per target
  maxPerTarget: number = Infinity;
  // max allowed creeps per action (and room)
  maxPerAction: number = Infinity;
  // range within which the action can be executed (e.g. upgrade controller = 3)
  targetRange: number = 1;
  // range until which the target has been reached. (e.g. can be less than targetRange)
  reachedRange: number = 1;
  // if true, will try to find new target if a target has become invalid
  // if false, an invalid target wil invalidate the action as well (causing to get a new action)
  renewTarget: boolean = true;
  // determines, if an action is (still) valid. Gets validated each tick.
  // check possible override in derived action
  isValidAction(): boolean {
    return true;
  }

  // determines, if a target is (still) valid. Gets validated each tick.
  // check possible override in derived action
  isValidTarget(target?: Source): boolean {
    const Target = target || (this.creep.target() as RoomObject | null);
    return Target !== null;
  }

  // determines, if a target is valid. Gets validated only once upon assignment.
  // check possible override in derived action
  isAddableTarget(target?: Source): boolean {
    const Target = target || (this.creep.target() as RoomObject | null);
    return (
      (Target !== null && Target.targetOf() < this.maxPerTarget) || this.maxPerTarget === Infinity
    );
  }

  // find a new target for that action
  // needs implementation in derived action
  newTarget(): RoomObject | null {
    return null;
  }

  // assign the action to a creep
  // optionally predefine a fixed target
  assign(): boolean {
    let ifNewTarget = false;
    if (this.creep.target() === null) {
      const newTarget = this.newTarget();
      if (newTarget === null) return false;
      this.creep.setTarget(newTarget);
      ifNewTarget = true;
    }
    if (this.isAddableTarget()) {
      if (this.creep.action() !== this.name || ifNewTarget) this.onAssignment();
      return true;
    }
    return false;
  }

  unAssign(): void {
    this.creep.memory.actionName = null;
    this.creep.memory.targetId = null;
  }

  showAssignment(): void {
    this.creep.say(this.name);
  }

  onAssignment(): void {
    this.showAssignment();
  }

  // order for the creep to execute each tick, when assigned to that action
  step(): any {
    const Target = this.creep.target();
    if (Target === null) return;
    // if (global.CHATTY) creep.say(this.name, global.SAY_PUBLIC);
    let range = this.creep.pos.getRangeTo(Target);
    if (range <= this.targetRange) {
      const workResult = this.work();
      if (workResult !== OK) {
        Log.error(
          `[${this.name}]`,
          ErrorType[workResult],
          `${this.creep.name}: ${this.creep.targetId()}`
        );
        return this.unAssign();
      }
    }
    if (this.creep.hasActiveBodyparts(MOVE)) {
      if (range > this.targetRange) {
        this.creep.travelTo(Target, { range: this.targetRange });
      } else if (range > this.reachedRange) {
        // low CPU pathfinding for last few steps.
        const direction = this.creep.pos.getDirectionTo(Target);
        // TODO: Traveler
        const targetPos = Traveler.positionAtDirection(this.creep.pos, direction);
        if (this.creep.room.isWalkable(targetPos.x, targetPos.y)) {
          // low cost last steps if possible
          this.creep.move(direction);
        } else if (!this.creep.pos.isNearTo(Target)) {
          // travel there if we're not already adjacent
          this.creep.travelTo(Target, { range: this.reachedRange });
        }
      }
    }
  }

  // order for the creep to execute when at target
  work(): number {
    return ERR_INVALID_ARGS;
  }

  // validate, if this action is still valid for a certain creep and target
  // returns the target (could be a ne one) if valid or null
  validateActionTarget(): any {
    if (this.isValidAction()) {
      // validate target or new
      if (!this.isValidTarget()) {
        if (this.renewTarget) {
          // invalid. try to find a new one...
          delete this.creep.memory.path;
          return this.newTarget();
        }
      } else return this.creep.target();
    }
    return null;
  }
}
