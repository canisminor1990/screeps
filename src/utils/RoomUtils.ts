import { RoomType } from '../enums/room';

class RoomUtilsCalss {
  private roomDictionary: { [type: number]: Room[] };

  constructor() {
    this.roomDictionary = this.makeDictionary();
  }

  public getPublicRooms(): Room[] {
    const rooms = this.roomDictionary[RoomType.public];
    return rooms !== undefined ? rooms : [];
  }

  public getHostileRooms(): Room[] {
    const rooms = this.roomDictionary[RoomType.hostile];
    return rooms !== undefined ? rooms : [];
  }

  public getReservedRooms(): Room[] {
    const rooms = this.roomDictionary[RoomType.reserved];
    return rooms !== undefined ? rooms : [];
  }

  public getSpawnRooms(): Room[] {
    const rooms = this.roomDictionary[RoomType.spawn];
    return rooms !== undefined ? rooms : [];
  }

  public getJustClaimRooms(): Room[] {
    const rooms = this.roomDictionary[RoomType.justClaim];
    return rooms !== undefined ? rooms : [];
  }

  public getRemoteRooms(): Room[] {
    const rooms = this.roomDictionary[RoomType.remote];
    return rooms !== undefined ? rooms : [];
  }

  public getRemoteReservedRooms(): Room[] {
    const rooms = this.roomDictionary[RoomType.remoteReserved];
    return rooms !== undefined ? rooms : [];
  }

  private makeDictionary(): { [type: number]: Room[] } {
    const roomsGroup: { [type: number]: Room[] } = {};

    const signType = (room: Room, type: number) => {
      room.memory.type = type;
      if (!roomsGroup[type]) roomsGroup[type] = [];
      roomsGroup[type].push(room);
    };

    _.forEach(Game.rooms, (room: Room) => {
      if (room.controller === undefined) {
        return signType(room, RoomType.public);
      }

      if (room.controller.my) {
        if (room.controller.level > 0) {
          room.spawns().length > 0
            ? signType(room, RoomType.spawn)
            : signType(room, RoomType.justClaim);
        } else {
          signType(room, RoomType.remoteReserved);
        }
        return;
      }

      // TODO: friend(whitelist) / remote(flag)
      if (room.controller.level > 0) {
        signType(room, RoomType.hostile);
      }
    });

    return roomsGroup;
  }
}

export const RoomUtils = new RoomUtilsCalss();
