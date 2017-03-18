'use strict';

/*
 * defendmelee is called after 'threshold' when a room is attacked
 *
 * Tries to fight against the hostile creeps
 */

roles.defendmelee = {};

roles.defendmelee.settings = {
  layoutString: 'MA',
  amount: [5, 5]
};

roles.defendmelee.execute = function (creep) {
  var hostile = creep.findClosestEnemy();
  if (hostile === null) {
    return Creep.recycleCreep(creep);
  }
  var search = PathFinder.search(creep.pos, hostile.pos, {
    roomCallback: creep.room.getAvoids(creep.room)
  });
  var direction = creep.pos.getDirectionTo(search.path[0]);
  creep.moveCreep(search.path[0], (direction + 3) % 8 + 1);
  var returnCode = creep.move(direction);
  creep.attack(hostile);
};