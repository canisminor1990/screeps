const strategy = require('../util/strategy');
import {Component} from "../class";

class CreepClass extends Component{
	public extend = (): void => {

		strategy.decorateAgent(
				Creep.prototype,
				{
					default: (creep: Creep) => creep.action && creep.action.name,
					selector: (actionName: string) => Creep.action[actionName],
				},
				{
					default: (creep: Creep) => creep.data.creepType,
					selector: (behaviourName: string) => Creep.behaviour[behaviourName] && Creep.behaviour[behaviourName],
				},
				{
					default: (creep: Creep) => creep.data.destiny && creep.data.destiny.task,
					selector: (taskName: string) => Task[taskName] && Task[taskName],
				},
		);
	};
	execute = () => {
		if (global.DEBUG && Memory.CPU_CRITICAL)
			Util.logSystem(
					'system',
					`${Game.time}: CPU Bucket level is critical (${Game.cpu.bucket}). Skipping non critical creep roles.`,
			);
		let run = creep => {
			try {
				creep.run();
			} catch (e) {
				console.log(
						'<span style="color:FireBrick">Creep ' + creep.name + (e.stack || e.toString()) + '</span>',
						Util.stack(),
				);
			}
		};
		_.forEach(Game.creeps, run);
	};
	bodyCosts = (body) => {
		let costs = 0;
		if (body) {
			body.forEach(function (part) {
				costs += BODYPART_COST[part];
			});
		}
		return costs;
	};
	// params: {minThreat, minWeight, maxWeight, minMulti, maxMulti}
	// calculates the multi that is above the smallest minimum, and below the largest maximum based on parameters
	multi = (room, params = {}) => {
		const minMulti = params.minMulti || 0;
		const fixedCosts = this.bodyCosts(params.fixedBody);
		const multiCosts = this.bodyCosts(params.multiBody);
		if (multiCosts === 0) return 0; // prevent divide-by-zero
		let maxThreatMulti = Infinity;
		if (params.minThreat) {
			const fixedThreat = this.bodyThreat(params.fixedBody);
			const multiThreat = this.bodyThreat(params.multiBody);
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
	};
	partsComparator = (a, b) => {
		let partsOrder = [TOUGH, CLAIM, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, MOVE];
		let indexOfA = partsOrder.indexOf(a);
		let indexOfB = partsOrder.indexOf(b);
		return indexOfA - indexOfB;
	};
	formatParts = (parts) => {
		if (parts && !Array.isArray(parts) && typeof parts === 'object') {
			const body = [];
			for (const part of BODYPARTS_ALL) {
				if (part in parts) body.push(..._.times(parts[part], n => part));
			}
			parts = body;
		}
		return parts;
	};
	formatBody = (fixedBody, multiBody) => {
		fixedBody = this.formatParts(fixedBody);
		multiBody = this.formatParts(multiBody);
		return {fixedBody, multiBody};
	};
	// params: {minThreat, maxWeight, maxMulti}
	compileBody = (room, params, sort = true) => {
		const {fixedBody, multiBody} = this.formatBody(params.fixedBody || [], params.multiBody || []);
		_.assign(params, {fixedBody, multiBody});
		if (params.sort !== undefined) sort = params.sort;
		let parts = [];
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
	};

	bodyThreat = (body) => {
		let threat = 0;
		let evaluatePart = part => {
			threat += CREEP_PART_THREAT[part.type ? part.type : part][part.boost ? 'boosted' : 'common'];
		};
		if (body) body.forEach(evaluatePart);
		return threat;
	};
	register = () => {
		for (const action in Creep.action) {
			if (Creep.action[action].register) Creep.action[action].register(this);
		}
		for (const behaviour in Creep.behaviour) {
			if (Creep.behaviour[behaviour].register) Creep.behaviour[behaviour].register(this);
		}
		for (const setup in Creep.setup) {
			if (Creep.setup[setup].register) Creep.setup[setup].register(this);
		}
	};
}

module.exports = new CreepClass;

