export const inject = (base: any, alien: any, namespace?: string) => {
	let keys = _.keys(alien);
	for (const key of keys) {
		if (_.isFunction(alien[key])) {
			if (namespace) {
				let original = base[key];
				if (!base.baseOf) base.baseOf = {};
				if (!base.baseOf[namespace]) base.baseOf[namespace] = {};
				if (!base.baseOf[namespace][key]) base.baseOf[namespace][key] = original;
			}
			base[key] = alien[key].bind(base);
		} else if (
			alien[key] !== null &&
			typeof base[key] === 'object' &&
			!Array.isArray(base[key]) &&
			typeof alien[key] === 'object' &&
			!Array.isArray(alien[key])
		) {
			_.merge(base[key], alien[key]);
		} else {
			base[key] = alien[key];
		}
	}
};
