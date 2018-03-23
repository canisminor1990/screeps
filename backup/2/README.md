# Screeps

## Result codes

```js
{
	OK                       : 0,
	ERR_NOT_OWNER            : -1,
	ERR_NO_PATH              : -2,
	ERR_NAME_EXISTS          : -3,
	ERR_BUSY                 : -4,
	ERR_NOT_FOUND            : -5,
	ERR_NOT_ENOUGH_ENERGY    : -6,
	ERR_NOT_ENOUGH_RESOURCES : -6,
	ERR_INVALID_TARGET       : -7,
	ERR_FULL                 : -8,
	ERR_NOT_IN_RANGE         : -9,
	ERR_INVALID_ARGS         : -10,
	ERR_TIRED                : -11,
	ERR_NO_BODYPART          : -12,
	ERR_NOT_ENOUGH_EXTENSIONS: -6,
	ERR_RCL_NOT_ENOUGH       : -14,
	ERR_GCL_NOT_ENOUGH       : -15,
}
```

## Structures

```js
{
	"spawn": 15000,
	"extension": 3000,
	"road": 300,
	"constructedWall": 1,
	"rampart": 1,
	"link": 5000,
	"storage": 30000,
	"tower": 5000,
	"observer": 8000,
	"powerSpawn": 100000,
	"extractor": 5000,
	"lab": 50000,
	"terminal": 100000,
	"container": 5000,
	"nuker": 100000
}
```

## Bodypart cost

```js
{
	"move": 50,
	"work": 100,
	"attack": 80,
	"carry": 50,
	"heal": 250,
	"ranged_attack": 150,
	"tough": 10,
	"claim": 600
}
```

## Color

```js
{
	COLOR_RED    "red"
  COLOR_PURPLE "purple"
  COLOR_BLUE   "blue"
  COLOR_CYAN   "cyan"
  COLOR_GREEN  "green"
  COLOR_YELLOW "yellow"
  COLOR_ORANGE "orange"
  COLOR_BROWN  "brown"
  COLOR_GREY   "grey"
  COLOR_WHITE  "white"
}
```
