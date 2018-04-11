export const CreepUtils = {
	bodyCosts(body: obj): number {
		let costs = 0;
		if (body) {
			body.forEach((part: string) => {
				costs += BODYPART_COST[part];
			});
		}
		return costs;
	},
	multi(room: Room, params: obj = {}): number {
		const minMulti: number = params.minMulti || 0;
		const fixedCosts: number = this.bodyCosts(params.fixedBody);
		const multiCosts: number = this.bodyCosts(params.multiBody);
		if (multiCosts === 0) return 0; // prevent divide-by-zero
		let maxThreatMulti = Infinity;
		if (params.minThreat) {
			const fixedThreat: number = this.bodyThreat(params.fixedBody);
			const multiThreat: number = this.bodyThreat(params.multiBody);
			maxThreatMulti = 0;
			let threat = fixedThreat;
			while (threat < params.minThreat) {
				maxThreatMulti += 1;
				threat += multiThreat;
			}
		}
		let minWeightMulti = 0;
		if (params.minWeight) {
			let weight = fixedCosts;
			while (weight < params.minWeight) {
				minWeightMulti += 1;
				weight += multiCosts;
			}
		}
		const maxPartsMulti = Math.floor((50 - params.fixedBody.length) / params.multiBody.length);
		const maxEnergy = params.currentEnergy ? room.energyAvailable : room.energyCapacityAvailable;
		const maxAffordableMulti = Math.floor((maxEnergy - fixedCosts) / multiCosts);
		const maxWeightMulti = params.maxWeight ? Math.floor((params.maxWeight - fixedCosts) / multiCosts) : Infinity;
		const maxMulti = params.maxMulti || Infinity;
		// find the smallest maximum to set our upper bound
		const max = _.min([maxAffordableMulti, maxThreatMulti, maxWeightMulti, maxMulti]);
		// ensure we are above our lower bound
		const min = _.max([minMulti, minWeightMulti, max]);
		// ensure this won't result in more than 50 parts
		return _.min([maxPartsMulti, min]);
	},
	partsComparator(a: string, b: string): number {
		let partsOrder: string[] = [TOUGH, CLAIM, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, MOVE];
		let indexOfA = partsOrder.indexOf(a);
		let indexOfB = partsOrder.indexOf(b);
		return indexOfA - indexOfB;
	},
	formatParts(parts: string[] | obj): string[] {
		if (parts && !Array.isArray(parts) && typeof parts === 'object') {
			const body: string[] = [];
			for (const part of BODYPARTS_ALL) {
				// @ts-ignore
				if (part in parts) body.push(..._.times(parts[part], n => part));
			}
			parts = body;
		}
		// @ts-ignore
		return parts;
	},
	formatBody(fixedBody: string[] | obj, multiBody: string[] | obj): obj {
		fixedBody = this.formatParts(fixedBody);
		multiBody = this.formatParts(multiBody);
		return { fixedBody, multiBody };
	},
	compileBody(room: Room, params: obj, sort: boolean = true): string[] {
		const { fixedBody, multiBody } = this.formatBody(params.fixedBody || [], params.multiBody || []);
		_.assign(params, { fixedBody, multiBody });
		if (params.sort !== undefined) sort = params.sort;
		let parts: string[] = [];
		const multi = this.multi(room, params);
		for (var i = 0; i < multi; i++) {
			parts = parts.concat(params.multiBody);
		}
		parts = parts.concat(params.fixedBody);
		if (sort) {
			const compareFunction = typeof sort === 'function' ? sort : this.partsComparator;
			parts.sort(compareFunction);
		}
		if (parts.includes(HEAL)) {
			let index = parts.indexOf(HEAL);
			parts.splice(index, 1);
			parts.push(HEAL);
		}
		return parts;
	},
	bodyThreat(body: obj): number {
		let threat = 0;
		if (body)
			_.forEach(body, (part: string | obj) => {
				// @ts-ignore
				threat += CREEP_PART_THREAT[part.type ? part.type : part][part.boost ? 'boosted' : 'common'];
			});
		return threat;
	},
};
