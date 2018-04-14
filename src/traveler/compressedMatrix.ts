// Wrapper class for PathFinder.CostMatrix to define our own compression
const CompressedMatrix = {};
module.exports = CompressedMatrix;
CompressedMatrix.serialize = function(costMatrix) {
	let ret = `${costMatrix._bits[0]}x`;
	let count = 1;
	for (let i = 1; i < costMatrix._bits.length; i++) {
		let curr = costMatrix._bits[i];
		if (curr !== costMatrix._bits[i - 1]) {
			ret += `${count},${curr}x`;
			count = 1;
		} else {
			count++;
		}
	}
	ret += `${count}`;
	return ret;
};
CompressedMatrix.deserialize = function(data) {
	const matrix = new PathFinder.CostMatrix();
	const entries = data.split(',');
	let total = 0;
	let len = entries.length;
	let entry, cost, count;
	entries.forEach(e => {
		entry = e.split('x');
		cost = entry[0];
		count = entry[1];
		if (cost) {
			_.times(count, i => {
				matrix._bits[total] = cost;
				total++;
			});
		} else {
			total += count;
		}
	});
	return matrix;
};
CompressedMatrix.compareEfficiency = function(count, costMatrix = new PathFinder.CostMatrix(), verbose = true) {
	const threshold = verbose ? 0 : 5; // don't display for each unless verbose
	let serialized, stringified, normalStringified, compressedStringified;
	for (let i = 0; i < count; i++) {
		serialized = costMatrix.serialize();
		if (verbose) console.log('normal', serialized);
		stringified = JSON.stringify(serialized);
		normalStringified = stringified;
		if (verbose)
			console.log('normal-deserialize', PathFinder.CostMatrix.deserialize(JSON.parse(stringified)).serialize());
		serialized = CompressedMatrix.serialize(costMatrix);
		if (verbose) console.log('comp-serialize', serialized);
		stringified = JSON.stringify(serialized);
		compressedStringified = stringified;
		if (verbose) console.log('comp-deserialize', CompressedMatrix.deserialize(JSON.parse(stringified)).serialize());
	}
	nSize = normalStringified.length / 1024;
	cSize = compressedStringified.length / 1024;
	console.log(
		'normal size:',
		_.round(nSize, 2),
		'compressed size:',
		_.round(cSize, 2),
		'reduction(% of original size):',
		_.round(cSize / nSize, 2),
	);
};
