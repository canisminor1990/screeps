export const dateUtils = {
	/**
	 * 时区转换
	 */
	toLocalDate(date: Date): Date {
		if (!date) date = new Date();
		let offset = TIME_ZONE;
		if (USE_SUMMERTIME && Util.isSummerTime(date)) offset++;
		return new Date(date.getTime() + 3600000 * offset);
	},

	/**
	 * Formats the date object to a date-time string
	 */
	toDateTimeString(date: Date): string {
		const pad = Util.pad;
		return (
			pad(date.getFullYear(), 0, 4) +
			'-' +
			pad(date.getMonth() + 1) +
			'-' +
			pad(date.getDate()) +
			' ' +
			Util.toTimeString(date)
		);
	},

	/**
	 * Formats the date object to a time string
	 */
	toTimeString(date: Date): string {
		const pad = Util.pad;
		return pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
	},

	/**
	 * Checks if it's summertime/daylight savings in the date provided
	 */
	isSummerTime(date: Date): boolean {
		if (!Reflect.has(Date.prototype, 'stdTimezoneOffset')) {
			Object.defineProperty(Date.prototype, 'stdTimezoneOffset', {
				value(): boolean {
					const jan = new Date(this.getFullYear(), 0, 1);
					const jul = new Date(this.getFullYear(), 6, 1);
					return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
				},
			});
		}
		if (!Reflect.has(Date.prototype, 'dst')) {
			Object.defineProperty(Date.prototype, 'dst', {
				get(): boolean {
					return this.getTimezoneOffset() < this.stdTimezoneOffset();
				},
				configurable: true,
			});
		}

		return date.dst;
	},
};
