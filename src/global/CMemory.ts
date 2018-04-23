import { Component } from '../class';

class CMemoryConstructor extends Component {
	numSaved: number = 0;
	toActivate: { [type: number]: any } = {};
	extend = (): void => {
		// custom extend
		this.activateSegment(MEM_SEGMENTS.COSTMATRIX_CACHE, true);
		// ensure required memory namespaces
		_.defaults(Memory, {
			cloaked: {},
			debugTrace: { error: true, no: {} },
			pavementArt: {},
		});
	};
	fresh = (): void => {
		Memory.CPU_CRITICAL = Memory.CPU_CRITICAL
			? Game.cpu.bucket < CRITICAL_BUCKET_LEVEL + CRITICAL_BUCKET_OVERFILL
			: Game.cpu.bucket < CRITICAL_BUCKET_LEVEL;
		// loaded memory segments
		this.processSegments();
	};
	cleanup = (): void => {
		if (_.size(this.toActivate) > 0) {
			RawMemory.setActiveSegments(Object.keys(this.toActivate) as number[]);
		}
		this.toActivate = {};
		this.numSaved = 0;
	};
	activateSegment = (id: obj | number, reset = false): void => {
		if (id.start && id.end) {
			for (let i = id.start; i >= id.end; i--) {
				this.activateSegment(i, reset);
			}
			return;
		}
		if (id < 0 || id > 99) return Log.error('[CMemory]', 'cannot activate invalid segment ', id);
		const numActive = _.size(RawMemory.segments);
		if (this.numSaved >= 10) return Log.error('[CMemory]', '10 segments saved, cannot activate segment ', id);
		if (!reset) {
			if (numActive >= 10) return Log.error('[CMemory]', '10 segments loaded, cannot activate segment ', id);
			if (numActive + this.numSaved >= 10)
				return Log.error(
					'[CMemory] RawMemory',
					'combined loaded and saved exceeds limit(10), cannot activate segment ',
					id,
				);
		}
		this.toActivate[id] = true;
	};
	deactivateSegment = (id: number): void => {
		if (id < 0 || id > 99) return Log.error('[CMemory]', 'cannot deactivate invalid segment ', id);
		if (_.size(this.toActivate) === 0) Object.keys(RawMemory.segments).forEach(id => (this.toActivate[id] = true));
		delete this.toActivate[id];
	};
	cacheValid = (id: number): boolean => {
		return Util.cacheValid[id] === Memory.cacheValid[id];
	};
	processSegment = (id: number, process: Function): void => {
		if (_.isUndefined(Memory.cacheValid[id])) Memory.cacheValid[id] = false;
		const segment = RawMemory.segments[id];
		if (!this.cacheValid(id)) {
			try {
				let data = segment ? JSON.parse(segment) : {};
				process(data);
				Util.cacheValid[id] = Memory.cacheValid[id];
			} catch (e) {
				Log.error('[CMemory] Error loading segment', id, ' caused by ', e.stack || e.toString());
				RawMemory.segments[id] = '';
				delete Util.cacheValid[id];
				delete Memory.cacheValid[id];
			}
		}
	};
	processSegments = (): void => {
		if (_.isUndefined(Util.cacheValid)) Util.cacheValid = {};
		if (_.isUndefined(Memory.cacheValid)) Memory.cacheValid = {};

		for (let id = MEM_SEGMENTS.COSTMATRIX_CACHE.start; id >= MEM_SEGMENTS.COSTMATRIX_CACHE.end; id--) {
			this.processSegment(id, Room.loadCostMatrixCache);
		}
	};
	saveSegment = (range: obj, inputData: obj): void => {
		const numActive = _.size(RawMemory.segments);
		const keys = Object.keys(inputData);
		let keyNum = 0;
		let encodedData;
		for (let id = range.start; id >= range.end; id--) {
			if ((keys && keyNum < keys.length) || (encodedData && encodedData.length > 1)) {
				// more data to save
				if (!_.isUndefined(RawMemory.segments[id]) || numActive + this.numSaved < 10) {
					let temp;
					let full = false;
					while (keyNum < keys.length) {
						const key = keys[keyNum];
						keyNum++;
						const stringified = JSON.stringify(inputData[key]);
						temp = `"${key}":${stringified}`;
						full = (_.get(encodedData, 'length', 0) + _.get(temp, 'length', 0) + 2) / 1024 > 100;
						if (full) break;
						encodedData = encodedData ? encodedData + ',' + temp : '{' + temp;
					}
					if (!encodedData && temp && temp.length > 0) {
						const size = _.round((temp.length + 2) / 1024, 2);
						return Log.error('[CMemory]', `Cannot save data at key ${keyNum}, exceeds 100kb limit ${size}kb`);
					}

					Log.module(
						'CMemory',
						'Segment: Saving ' + _.round(encodedData.length / 1024, 2) + 'kb of data to segment ' + id,
					);
					RawMemory.segments[id] = encodedData + '}';
					Memory.cacheValid[id] = Game.time;
					encodedData = full && temp ? '{' + temp : '{';
					if (_.isUndefined(RawMemory.segments[id])) this.numSaved++;
				} else if (numActive > 10) {
					// TODO: also defer? (This should be impossible)
					return Log.error('[CMemory]', 'cannot save segment ' + id + ' too many active segments.');
				} else if (numActive + this.numSaved > 10) {
					// TODO: defer one tick?
					return Log.error('[CMemory]', 'cannot save segment ' + id + ' loaded + saved exceeds limit(10).');
				} else {
					Log.error('[CMemory] RawMemory', 'should not be here.');
				}
			} else if (Memory.cacheValid[id]) {
				// no more data, clear this segment
				Log.module('CMemory', 'Segment: clearing unused segment ' + id);
				RawMemory.segments[id] = '';
				delete Memory.cacheValid[id];
			}
		}
	};
}

export default new CMemoryConstructor();
