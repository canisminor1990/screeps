import { RoleType } from '../../enums/role';
import { CreepSetup } from '../setup';

export default class extends CreepSetup {
  get RCL() {
    return {
      1: this.low,
      2: this.low,
      3: this.default,
      4: this.default,
      5: this.default,
      6: this.default,
      7: this.default,
      8: this.default
    };
  }

  get default(): any {
    return {
      fixedBody: [],
      multiBody: {
        [CARRY]: 1,
        [WORK]: 1,
        [MOVE]: 1
      },
      minMulti: 1,
      maxMulti: this.maxMulti(this.default.fixedBody, this.default.multiBody),
      maxCount: this.maxCount()
    };
  }

  get low(): any {
    return {
      fixedBody: [],
      multiBody: {
        [CARRY]: 1,
        [WORK]: 1,
        [MOVE]: 2
      },
      minMulti: 1,
      maxMulti: 8,
      maxCount: this.maxCount()
    };
  }

  private maxCount(): number {
    let count: number = 0;

    if (this.room.rcl() <= 2) {
      if (!this.hasMinerOrHauler) return this.room.sources().length * 5;
      count += this.room.sources().length;
    }
    if (!this.hasMinerOrHauler) count++;
    count += Math.floor(this.room.constructionSite().length / 10);
    return _.min([1, count]);
  }

  private hasMinerOrHauler(): boolean {
    return this.room.roleCount(RoleType.miner) > 0 || this.room.roleCount(RoleType.hauler) > 0;
  }
}
