import {logError} from '../../src/utils'



class cmMemory {
	numSaved = 0
	toActivate = {}
	activateSegment = (id, reset = false) => {
		if (id.start && id.end) {
			for (let i = id.start; i >= id.end; i--) {
				this.activateSegment(i, reset);
			}
			return;
		}
		if (id < 0 || id > 99) return logError('RawMemory', 'cannot activate invalid segment ' + id);
		const numActive = _.size(RawMemory.segments);
		if (this.numSaved >= 10) return logError('RawMemory', '10 segments saved, cannot activate segment ' + id);
		if (!reset) {
			if (numActive >= 10) return logError('RawMemory', '10 segments loaded, cannot activate segment ' + id);
			if (numActive + this.numSaved >= 10) return logError('RawMemory', 'combined loaded and saved exceeds limit(10), cannot activate segment ' + id);
		}
		this.toActivate[id] = true;
	}
	deactivateSegment = (id) => {
		if (id < 0 || id > 99) return logError('RawMemory', 'cannot deactivate invalid segment ' + id);
		if (_.size(this.toActivate) === 0) Object.keys(RawMemory.segments).forEach(id => this.toActivate[id] = true);
		delete this.toActivate[id];
	};
	cacheValid = (id) => {
		return global.cacheValid[id] === Memory.cacheValid[id];
	};
	processSegment = (id, process) => {
		if (_.isUndefined(Memory.cacheValid[id])) Memory.cacheValid[id] = false;
		const segment = RawMemory.segments[id];
		if (!this.cacheValid(id)) {
			try {
				let data = segment ? JSON.parse(segment) : {};
				process(data);
				global.cacheValid[id] = Memory.cacheValid[id];
			} catch (e) {
				console.log('<font style="color:FireBrick">Error loading segment' + id + ' caused by ' + (e.stack || e.toString()) + '</font>');
				RawMemory.segments[id] = '';
				delete global.cacheValid[id];
				delete Memory.cacheValid[id];
			}
		}
	}
	processSegments = () => {
		if (_.isUndefined(global.cacheValid)) global.cacheValid = {};
		if (_.isUndefined(Memory.cacheValid)) Memory.cacheValid = {};

		for (let id = MEM_SEGMENTS.COSTMATRIX_CACHE.start; id >= MEM_SEGMENTS.COSTMATRIX_CACHE.end; id--) {
			this.processSegment(id, Room.loadCostMatrixCache);
		}
	};
	saveSegment = (range, inputData) => {
		const numActive = _.size(RawMemory.segments);
		const keys = Object.keys(inputData);
		let keyNum = 0;
		let encodedData;
		for (let id = range.start; id >= range.end; id--) {
			if ((keys && keyNum < keys.length) || (encodedData && encodedData.length > 1)) { // more data to save
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
						return logError('RawMemory', `Cannot save data at key ${keyNum}, exceeds 100kb limit ${size}kb`);
					}
					if (global.DEBUG) logSystem('this.saveSegment', 'Saving ' + _.round(encodedData.length / 1024, 2) + 'kb of data to segment ' + id);
					RawMemory.segments[id] = encodedData + '}';
					Memory.cacheValid[id] = Game.time;
					encodedData = full && temp ? '{' + temp : '{';
					if (_.isUndefined(RawMemory.segments[id])) this.numSaved++;
				} else if (numActive > 10) {
					// TODO: also defer? (This should be impossible)
					return logError('RawMemory', 'cannot save segment ' + id + ' too many active segments.');
				} else if (numActive + this.numSaved > 10) {
					// TODO: defer one tick?
					return logError('RawMemory', 'cannot save segment ' + id + ' loaded + saved exceeds limit(10).');
				} else {
					logError('RawMemory', 'should not be here.');
				}
			} else if (Memory.cacheValid[id]) { // no more data, clear this segment
				if (global.DEBUG) logSystem('this.saveSegment', 'clearing unused segment ' + id);
				RawMemory.segments[id] = '';
				delete Memory.cacheValid[id];
			}
		}
	}
	cleanup = () => {
		if (_.size(this.toActivate) > 0) {
			RawMemory.setActiveSegments(Object.keys(this.toActivate));
		}
		this.toActivate = {};
		this.numSaved = 0;
	};
}










