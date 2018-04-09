import { RoleType } from '../../enums/creep';
import { Setup } from '../Setup';

export class WorkerSetup extends Setup {
	constructor() {
		super(RoleType.worker);
	}

	get RCL(): Rcl {
		return {
			1: this.low,
			2: this.low,
			3: this.default,
			4: this.default,
			5: this.default,
			6: this.default,
			7: this.default,
			8: this.default,
		};
	}

	get default() {
		const body = {
			[CARRY]: 1,
			[WORK]: 1,
			[MOVE]: 1,
		};
		return {
			fixedBody: body,
			multiBody: body,
			minMulti: 0,
			maxMulti: this.maxMulti(body, body),
			maxCount: this.maxCount(),
		};
	}

	get low() {
		const body = {
			[CARRY]: 1,
			[WORK]: 1,
			[MOVE]: 2,
		};
		return {
			fixedBody: body,
			multiBody: body,
			minMulti: 0,
			maxMulti: this.maxMulti(body, body),
			maxCount: this.maxCount(),
		};
	}

	private maxCount(): number {
		let count: number = 0;
		if (!this.hasMinerOrHauler()) {
			if (this.room.rcl <= 2) {
				_.forEach(this.room.sources, s => (count += s.pos.getFreeSpaces(1).length));
				return count;
			}
			count++;
		}
		count += Math.floor(this.room.constructionSites.length / 10);

		return _.max([1, count]);
	}

	private hasMinerOrHauler(): boolean {
		return this.room.getRoleCount(RoleType.miner) > 0 || this.room.getRoleCount(RoleType.hauler) > 0;
	}
}
