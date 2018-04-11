export const StrategyUtils = {
	decorateAgent(prototype, ...definitions) {
		if (!prototype.customStrategy) prototype.customStrategy = function(ids) {};
		if (!prototype.staticCustomStrategy) prototype.staticCustomStrategy = function(ids) {};
		prototype.getStrategyHandler = function(ids, method, ...args) {
			const currentStrategy = this.currentStrategy || this.strategy(ids);
			const returnValOrMethod = currentStrategy[method];
			const strategyKey = currentStrategy.key;
			const strategyName = currentStrategy.name;
			if (DEBUG && TRACE) Util.trace('Strategy', { agent: this.name, strategyKey, strategyName, method });
			if (returnValOrMethod === undefined) {
				Util.logError('strategy handler returned undefined', {
					agent: this.name || this.id,
					strategyKey,
					strategyName,
					method,
					stack: new Error().stack,
				});
				return;
			}
			if (args.length === 0) {
				return returnValOrMethod;
			}
			const returnVal = returnValOrMethod.apply(this.currentStrategy, args);
			if (returnVal !== undefined) {
				return returnVal;
			}
			Util.logError('handler returned undefined for args', {
				agent: this.name || this.id,
				strategyKey,
				strategyName,
				method,
				args: args.toString(),
				stack: new Error().stack,
			});
		};
		prototype._strategyCache = {};
		prototype.strategyKey = function(ids) {
			const key = [];
			for (let i = definitions.length - 1; i >= 0; i--) {
				if (ids[i]) key[i] = ids[i];
				else key[i] = definitions[i].default(this);
			}
			return key;
		};
		prototype.selectClient = function(ids, index) {
			return ids[index] && definitions[index].select(ids[index]);
		};
		prototype.strategy = function(ids) {
			const key = this.strategyKey(ids);

			let strategy = Util.getCachedStrategy(this, key);
			if (strategy) {
				return Util.customizeStrategy(this, key, strategy);
			}

			strategy = Util.buildStrategy(
				key,
				Util.strategyChainUtils,
				definitions,
				this.staticCustomStrategy.apply(this, key),
			);

			if (!strategy) {
				Util.logError('no strategy', { agent: this.name || this.id, key });
				return {};
			}
			Util.putCachedStrategy(this, key, strategy);
			return Util.customizeStrategy(this, key, strategy);
		};
		// Explain current activity
		prototype.explain = function() {
			const strategyKey = this.strategyKey([]);
			let explained = this.toString() + ': ';
			if (this.explainAgent) {
				explained += this.explainAgent() + ' ';
			}
			explained += `assigned:[${strategyKey}]`;
			for (let i = 0; i < strategyKey.length; i++) {
				const client = this.selectClient(i);
				if (client && client.explain) {
					explained += `\n\t${strategyKey[i]}: ${client.explain(this)}`;
				}
			}

			return explained;
		};
	},
	allocateStrategy(agent, ...definitions) {
		agent.currentStrategy = agent.strategy.apply(agent, definitions);
	},
	freeStrategy(agent) {
		Util.freeStrategyChain(agent.currentStrategy);
		delete agent.currentStrategy;
	},
	buildStrategy(key, utils, definitions, custom) {
		const currentStrategy = { key, name: [] };
		Util.appendStrategies(currentStrategy, undefined, [utils]);

		let head;
		for (let i = 0; i < definitions.length; i++) {
			const id = key[i];
			const selector = id && definitions[i].selector(id);
			const strategies = selector && selector.selectStrategies && selector.selectStrategies.apply(selector, key);
			head = Util.appendStrategies(currentStrategy, head, strategies);
		}
		if (custom) {
			head = Util.appendStrategies(currentStrategy, head, [custom]);
		}
		if (head) {
			return currentStrategy;
		}
	},
	appendStrategies(currentStrategy, head, strategies) {
		if (!strategies) return head;
		for (let i = 0; i < strategies.length; i++) {
			const strategy = strategies[i];
			if (strategy) {
				head = strategy;
				_.assign(currentStrategy, strategy, function(objectValue, sourceValue, key) {
					if (key === 'name') {
						objectValue.push(sourceValue);
						return objectValue;
					} else {
						return sourceValue;
					}
				});
			}
		}
		return head;
	},
	freeStrategyChain(chain) {
		// used to clean prototype changes (feature in performance testing)
	},
	customizeStrategy(agent, key, cachedStrategy) {
		const customStrategy = agent.customStrategy.apply(agent, key);
		if (!customStrategy) return cachedStrategy;

		return _.assign({}, cachedStrategy, customStrategy, function(objectValue, sourceValue, key) {
			if (key === 'name') {
				if (Array.isArray(sourceValue)) {
					return sourceValue.slice(0);
				} else {
					objectValue.push(sourceValue);
					return objectValue;
				}
			} else {
				return sourceValue;
			}
		});
	},
	strategyChainUtils: {
		toString: function() {
			const returnVal = this.name.toString();
			Util.freeStrategy(this);
			return returnVal;
		},
		[Symbol.toPrimitive]: function() {
			return this.toString();
		},
	},
	// TODO NEED cache invalidation
	getCachedStrategy(agent, key) {
		return _.get(agent._strategyCache, key);
	},
	putCachedStrategy(agent, key, strategy) {
		Object.freeze(strategy);
		_.set(agent._strategyCache, key, strategy);
	},
};
