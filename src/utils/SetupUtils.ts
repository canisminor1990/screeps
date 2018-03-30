import { RoleType } from '../enums/role';

class SetupUtilsClass {
  makeRoleName(role: RoleType): string {
    return RoleType[role];
  }

  makeBodyArray(Body: { [type: string]: number } | BodyPartConstant[]): BodyPartConstant[] {
    if (_.isArray(Body)) return Body;
    let BodyArray = [] as BodyPartConstant[];
    _.forEach(Body, (num: number, part: BodyPartConstant) => {
      BodyArray = BodyArray.concat(_.fill(Array(num), part));
    });
    return BodyArray;
  }

  getCostForBodyPart(bodypart: BodyPartConstant): number {
    switch (bodypart) {
      case TOUGH:
        return 10;
      case MOVE:
        return 50;
      case CARRY:
        return 50;
      case ATTACK:
        return 80;
      case WORK:
        return 100;
      case RANGED_ATTACK:
        return 150;
      case HEAL:
        return 250;
      case CLAIM:
        return 600;
      default:
        return 0;
    }
  }

  getCost(body: BodyPartConstant[]): number {
    let cost = 0;
    for (let bodypart of body) {
      cost += this.getCostForBodyPart(bodypart);
    }
    return cost;
  }
}

export const SetupUtils = new SetupUtilsClass();
