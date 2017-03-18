"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (x, y, type) {
	if (x && y && type) {
		switch (type) {
			case "spawn":
				type = STRUCTURE_SPAWN;
				break;
			case "extension":
				type = STRUCTURE_EXTENSION;
				break;
			case "road":
				type = STRUCTURE_ROAD;
				break;
			case "constructedWall":
				type = STRUCTURE_WALL;
				break;
			case "rampart":
				type = STRUCTURE_RAMPART;
				break;
			case "keeperLair":
				type = STRUCTURE_KEEPER_LAIR;
				break;
			case "portal":
				type = STRUCTURE_PORTAL;
				break;
			case "controller":
				type = STRUCTURE_CONTROLLER;
				break;
			case "link":
				type = STRUCTURE_LINK;
				break;
			case "storage":
				type = STRUCTURE_STORAGE;
				break;
			case "tower":
				type = STRUCTURE_TOWER;
				break;
			case "observer":
				type = STRUCTURE_OBSERVER;
				break;
			case "powerBank":
				type = STRUCTURE_POWER_BANK;
				break;
			case "powerSpawn":
				type = STRUCTURE_POWER_SPAWN;
				break;
			case "extractor":
				type = STRUCTURE_EXTRACTOR;
				break;
			case "lab":
				type = STRUCTURE_LAB;
				break;
			case "terminal":
				type = STRUCTURE_TERMINAL;
				break;
			case "container":
				type = STRUCTURE_CONTAINER;
				break;
			case "nuker":
				type = STRUCTURE_NUKER;
				break;
		}
		Game.spawns['Spawn1'].room.createConstructionSite(x, y, type);
		console.log("[Build] STRUCTURE_" + type.toUpperCase() + " in x:" + x + " y:" + y);
	} else {
		console.log("You can build: " + ['spawn', 'extension', 'road', 'constructedWall', 'rampart', 'keeperLair', 'portal', 'controller', 'link', 'storage', 'tower', 'observer', 'powerBank', 'powerSpawn', 'extractor', 'lab', 'terminal', 'container', 'nuker'].join('|'));
	}
};

module.exports = exports["default"];