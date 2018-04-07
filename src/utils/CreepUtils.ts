export function makeBodyArray(Body: BodySetup | BodyPartConstant[]): BodyPartConstant[] {
	if (_.isArray(Body)) return Body;
	let BodyArray = [] as BodyPartConstant[];
	_.forEach(Body, (num: number, bodypart: BodyPartConstant) => {
		BodyArray = BodyArray.concat(_.fill(Array(num), bodypart));
	});
	return BodyArray;
}

export function getCostForBodyPart(bodypart: BodyPartConstant): number {
	switch (bodypart) {
		case TOUGH:
			return 10;
		case MOVE:
			return 50;
		case CARRY:
			return 50;
		case ATTACK:
			return 80;
		case WORK:
			return 100;
		case RANGED_ATTACK:
			return 150;
		case HEAL:
			return 250;
		case CLAIM:
			return 600;
		default:
			return 0;
	}
}

export function getCost(body: BodyPartConstant[]): number {
	let cost = 0;
	for (let bodypart of body) cost += getCostForBodyPart(bodypart);
	return cost;
}
