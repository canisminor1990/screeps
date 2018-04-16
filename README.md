# <img src="https://raw.githubusercontent.com/stybbe/Screeps-SC/master/icons/icon48.png" width="24"> Screeps AI

AI for the game [screeps.com](https://screeps.com/).

## Command

#### Room

```js
// W8N45: O | O + H => OH | GH + OH => GH2O
Game.rooms["E8N45"].placeReactionOrder(
	Game.rooms["E8N45"].terminal.id,
	"OH",
	"20000"
);
Game.rooms["E8N45"].placeReactionOrder(
	Game.rooms["E8N45"].terminal.id,
	"GH2O",
	"20000"
);

// E9N47: U | U + L => UL
Game.rooms["E9N47"].placeReactionOrder(
	Game.rooms["E9N47"].terminal.id,
	"UL",
	"20000"
);

// E12N42: Z | Z + K => ZK
Game.rooms["E12N42"].placeReactionOrder(
	Game.rooms["E12N42"].terminal.id,
	"ZK",
	"20000"
);

// E12N42: U | UL + ZK => G
Game.rooms["E3N38"].placeReactionOrder(
	Game.rooms["E3N38"].terminal.id,
	"G",
	"20000"
);

// W2N41: H | G + H => GH
Game.rooms["W2N41"].placeReactionOrder(
	Game.rooms["W2N41"].terminal.id,
	"GH",
	"9000"
);

// E14N49: X | X + GH2O => XGH2O
Game.rooms["E14N49"].placeReactionOrder(
	Game.rooms["E14N49"].terminal.id,
	"XGH2O",
	"9000"
);
```

#### PowerSpawn / Nuker

```js
// powerSpawn
Game.rooms["E8N45"].setStore(
	Game.rooms["E8N45"].structures.powerSpawn.id,
	RESOURCE_ENERGY,
	5000
);
Game.rooms["E8N45"].setStore(
	Game.rooms["E8N45"].structures.powerSpawn.id,
	"power",
	100
);
// nuker
Game.rooms["E8N45"].setStore(
	Game.rooms["E8N45"].structures.nuker.id,
	RESOURCE_ENERGY,
	300000
);
Game.rooms["E8N45"].setStore(
	Game.rooms["E8N45"].structures.nuker.id,
	RESOURCE_GHODIUM,
	5000
);
```

#### Lab

```js
// if something goes wrong use Util.resetBoostProduction() to reset all rooms
Util.resetBoostProduction();

// Util.resetBoostProduction('roomName'), and MAKE_COMPOUNDS: false to turn off the process;
Util.resetBoostProduction("roomName");

// Order all labs to store 2000 energy
_.values(Game.structures)
	.filter(i => i.structureType === "lab")
	.map(i => i.room.setStore(i.id, RESOURCE_ENERGY, 2000));

// room.registerReactorFlower(...)
Game.rooms["roomName"].registerReactorFlower("a_id", "b_id");

//resource management  - stat labs
Game.rooms["roomName"].placeReactionOrder("id", "OH", "100000");

//resource management - maintain set amount in container
Game.rooms["roomName"].setStore("id", "OH", "100000");

//resource management - one off amount in container
Game.rooms["roomName"].placeOrder("id", "OH", "100000");
```

#### Market

```js
// create market order (replace [roomName] with target room or remove it for subscription tokens)
Game.market.createOrder(ORDER_BUY, "OH", 0.3, 100000, "roomName");
Game.market.createOrder(ORDER_SELL, "OH", 0.3, 100000, "roomName");

//accept market sell or buy order
Game.market.deal("orderId", 100000, "roomName");
Game.market.changeOrderPrice("orderId", 0.4);
Game.market.cancelOrder("orderId");
```

#### Memory

```js
// Safely wipe all Memory except creep role memory
_.forEach(Memory, (v, k) => !["population"].includes(k) && delete Memory[k]);

// clean all Memory
_.forEach(Memory, (value, key) => delete Memory[key]);

// flush road construction traces
_.forEach(Memory.rooms, r => delete r.roadConstructionTrace);

//flush visuals heatmap
_.forEach(Memory.rooms, r => delete r.heatmap);
```

#### Flag

```
// red / red = invade flag
// red / green = invade.exploit flag
// red / yellow = invade.robbing flag
// red / cyan = invade.attackController flag
// yellow / yellow = defense flag
// orange / orange = destroy flag
// orange / yellow = dismantle flag
// green / green = claim flag
// green / gray = claim.reserve flag
// green / brown = claim.mining flag
// green / white = claim.spawn flag
// green / red = claim.pioneer flag
// purple / white = labTech flag

// Shift all defense flags to a single room
FlagDir.filter(FLAG_COLOR.defense)
	.map(i => Game.flags[i.name])
	.map(i => i.setPosition(new RoomPosition(i.pos.x, i.pos.y, '<roomName>')));
```

#### Creep

```js
// kill all creeps
_.forEach(Game.creeps, c => c.suicide());

// Recycle a creep
Creep.action.recycling.assign(Game.creeps["<creepName>"]);

// spawn something...
Game.spawns["<spawnName>"].createCreepBySetup(Creep.setup.worker);
// or
Game.rooms["<roomName>"].spawnQueueLow.push({
	parts: [MOVE, WORK, CARRY],
	name: "max",
	setup: "worker"
});
// or
Task.forceSpawn(Task.claim.creep.claimer, "W0N0");
// or
Task.forceSpawn(
	Task.guard.creep.guard,
	{ targetRoom: "W0N0", allowTargetRoom: true },
	"Flag22"
);

// clear spawn queues for a room
// clear low priority queue
Memory.rooms["<roomName>"].spawnQueueLow = [0];

// clear medium priority queue
Memory.rooms["<roomName>"].spawnQueueMedium = [0];

// clear high priority queue
Memory.rooms["<roomName>"].spawnQueueHigh = [0];

// check if a specific creep type is in queue
Util.inQueue("defender");

// or
Util.inQueue({ behaviour: "defender" });

// You can also limit by target room:
Util.inQueue({ behaviour: "remoteMiner", room: "W0N0" });

// move Creep
Game.creeps["<creepName>"].move(RIGHT);

// force recycle a Creep
Game.creeps["<creepName>"].data.creepType = "recycler";

// Examine the low priority spawn queue in all rooms
_.chain(Game.spawns)
	.values()
	.map(i => i.room)
	.unique()
	.filter(i => i.spawnQueueLow.length)
	.map(i => [`====${i.name}====>`, i.spawnQueueLow.map(j => j.name)])
	.value();

// Show histogram of remoteHauler weight
JSON.stringify(
	_.chain(Game.creeps)
		.filter(i => i.data.creepType === "remoteHauler")
		.groupBy("data.weight")
		.mapValues(i => i.length)
);
```

#### Structure

```js
// remove all construction Sites
_.forEach(Game.constructionSites, s => s.remove());
```

## Config

配置 `./config/config.example.json` 并另存为 `config.json`

```json
{
	"email": "private server only",
	"password": "private server only",
	"serverPassword": "private server only",
	"token": "account token",
	"serverUrl": "https://screeps.com",
	"branch": "dev",
	"winPath": "local path on windows",
	"macPath": "local path on mac"
}
```

## Dev

```bash
# 本地服务器测试
$ yarn start

# 官方服务器测试
$ yarn start:remote

# 打包上传至官方服务器
$ yarn build

# 生成API文档
$ yarn doc
```

## Third Party Tools

* [ScreepsPlus Grafana](https://screepspl.us/services/grafana)
* [ScreepsSC Chrome extension](https://github.com/stybbe/Screeps-SC)

## Docs Link

* [Screeps Doc](http://docs.screeps.com/index.html)
* [Screeps Api](http://docs.screeps.com/api/)
* [Lodash](https://lodash.com/docs/4.17.5)
* [ES6](http://es6.ruanyifeng.com/#docs/class)
* [TypeScript](https://ts.xcatliu.com/basics/index.html)
* [TypeDoc](http://typedoc.org/guides/doccomments/)
