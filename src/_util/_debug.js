import { table } from './'
export default (e, name, creep, target,...other) => {
	let  error = {
		header: [`Error ${name} #${Game.time}`],
		body  : [
			[e],
			[`Creep: ${creep} Pos:${JSON.stringify(creep.pos)}`],
			[`Target: ${target} Json:${JSON.stringify(target)}`]
		]
	}
	error.body.push([...other])
	console.log(table(error))
}