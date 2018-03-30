import { SetupUtils } from '../utils/SetupUtils';

export class CreepSetup {
  room: Room;

  constructor(room: Room) {
    this.room = room;
  }

  maxMulti = (fixedBody: any, multiBody: any): number => {
    const fixedCost = SetupUtils.getCost(SetupUtils.makeBodyArray(fixedBody)) as number;
    const multiCost = SetupUtils.getCost(SetupUtils.makeBodyArray(multiBody)) as number;
    return _.min([
      Math.floor((this.room.energyCapacityAvailable - fixedCost) / multiCost),
      Math.floor((50 / _.size(multiBody)) as number)
    ]);
  };
}
