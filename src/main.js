import 'screeps-perf';
import Visual from './visual';
import * as Manager from './manager'
import * as Gui from './gui'
import {timer} from  './_util'
import {log, trigger} from  './task'
import profiler from 'screeps-profiler';
const rooms = ['W81S67', 'W81S66', 'W82S67'];
profiler.enable();
console.log('# Coding Update!')
trigger.install()
module.exports.loop = () => {
	if (Game.cpuLimit > 100) {
		profiler.wrap(() => {
			trigger()
			Manager.root()
			Manager.memory(rooms)
			Manager.global(rooms)
			Manager.role(rooms)
			Manager.structure(rooms)
			// Gui.creepBar(rooms[0])
			Gui.room(rooms[0])
			Gui.role(rooms[0])
		});
	}
	if (timer(10)) log(rooms[0], 10)
	visualizePaths()
	RawVisual.commit()
}


function visualizePaths(){
	let colors = []
	let COLOR_BLACK = colors.push('#000000') - 1
	let COLOR_PATH = colors.push('rgba(255,255,255,0.5)') - 1
	_.each(Game.rooms,(room,name)=>{
		let visual = new Visual(name)
		visual.defineColors(colors)
		visual.setLineWidth = 0.5
		_.each(Game.creeps,creep=>{
			if(creep.room != room) return
			let mem = creep.memory
			if(mem._move){
				let path = Room.deserializePath(mem._move.path)
				if(path.length){
					visual.drawLine(path.map(p=>([p.x,p.y])),COLOR_PATH,{ lineWidth: 0.1 })
				}
			}
		})
		visual.commit()
	})
}