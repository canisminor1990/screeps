"use strict";

Room.prototype.getFriends = function (object) {
  return this.find(FIND_HOSTILE_CREEPS, {
    filter: function filter(object) {
      return brain.isFriend(object.owner.username);
    }
  });
};

Room.prototype.getEnemys = function (object) {
  return this.find(FIND_HOSTILE_CREEPS, {
    filter: function filter(object) {
      return !brain.isFriend(object.owner.username);
    }
  });
};