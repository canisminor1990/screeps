import { table } from './'
export default (e, name, creep, target) => {
	const error = {
		header: `Error ${name} #${Game.time}`,
		body  : [
			[e],
			[`Creep: ${creep} Pos:${JSON.stringify(creep.pos)}`],
			[`Target: ${target} Json:${JSON.stringify(target)}`]
		]
	}
	console.log(table(error))
}