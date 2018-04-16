export const Strategy = {
	decorateAgent(prototype, ...definitions) {
		if (!prototype.customStrategy) prototype.customStrategy = function(ids) {};
		if (!prototype.staticCustomStrategy) prototype.staticCustomStrategy = function(ids) {};
		prototype.getStrategyHandler = function(ids, method, ...args) {
			const currentStrategy = this.currentStrategy || this.strategy(ids);
			const returnValOrMethod = currentStrategy[method];
			const strategyKey = currentStrategy.key;
			const strategyName = currentStrategy.name;
			if (LOG_TRACE) Log.trace('Strategy', { agent: this.name, strategyKey, strategyName, method });
			if (returnValOrMethod === undefined) {
				Log.error('strategy handler returned undefined', {
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
			Log.error('handler returned undefined for args', {
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

			let strategy = Strategy.getCachedStrategy(this, key);
			if (strategy) {
				return Strategy.customizeStrategy(this, key, strategy);
			}

			strategy = Strategy.buildStrategy(
				key,
				Strategy.strategyChainUtils,
				definitions,
				this.staticCustomStrategy.apply(this, key),
			);

			if (!strategy) {
				Log.error('no strategy', { agent: this.name || this.id, key });
				return {};
			}
			Strategy.putCachedStrategy(this, key, strategy);
			return Strategy.customizeStrategy(this, key, strategy);
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

	// agent will prefer this strategy until it is free'd
	allocateStrategy(agent, ...definitions) {
		agent.currentStrategy = agent.strategy.apply(agent, definitions);
	},

	freeStrategy(agent) {
		Strategy.freeStrategyChain(agent.currentStrategy);
		delete agent.currentStrategy;
	},

	buildStrategy(key, utils, definitions, custom) {
		const currentStrategy = { key, name: [] };
		Strategy.appendstate(currentStrategy, undefined, [utils]);

		let head;
		for (let i = 0; i < definitions.length; i++) {
			const id = key[i];
			const selector = id && definitions[i].selector(id);
			const state = selector && selector.selectstate && selector.selectstate.apply(selector, key);
			head = Strategy.appendstate(currentStrategy, head, state);
		}
		if (custom) {
			head = Strategy.appendstate(currentStrategy, head, [custom]);
		}
		if (head) {
			return currentStrategy;
		}
	},

	appendstate(currentStrategy, head, state) {
		if (!state) return head;
		for (let i = 0; i < state.length; i++) {
			const strategy = state[i];
			if (strategy) {
				head = strategy;
				_.assign(currentStrategy, strategy, (objectValue, sourceValue, key) => {
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

		return _.assign({}, cachedStrategy, customStrategy, (objectValue, sourceValue, key) => {
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
		toString() {
			const returnVal = this.name.toString();
			Strategy.freeStrategy(this);
			return returnVal;
		},
		[Symbol.toPrimitive]() {
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
