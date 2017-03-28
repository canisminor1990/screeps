import { table } from './'
export default (e, name, creep, target, ...other) => {
	let error = {
		header: [`Error ${name} #${Game.time}`],
		body  : [
			[e],
			[`Creep: ${creep}<br />Pos:${JSON.stringify(creep.pos, null, 2)}`],
			[`Target: ${target}<br />Json:${JSON.stringify(target, null, 2)}`]
		]
	}
	error.body.push([...other])
	console.log(table(error))
}