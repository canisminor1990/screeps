import { ErrorType } from '../enum/error';

export const logUtils = {
	translateErrorCode(code: number): string {
		return ErrorType[code];
	},

	css(style: obj): string {
		let css = '';
		const format = (value: string | number, key: string) => {
			css += `${_.kebabCase(key)}: ${value};`;
		};
		_.forEach(style, format);
		return css;
	},

	jsonToTable(json: obj): string {
		let content = '';
		const tableStyle = Util.css({
			background: 'rgba(0,0,0,.25)',
			border: '1px solid rgba(0,0,0,.5)',
		});
		const tdStyle = Util.css({
			padding: '2px 5px',
		});
		_.forEach(json, (value: any, key: string) => {
			const Left = Dye(COLOR_GREEN, key) + Dye(COLOR_RED, ':');
			let Right = '';
			if (_.isNumber(value)) {
				if (value.toString().indexOf('.') !== -1) value = value.toFixed(3);
				Right = Dye(COLOR_PURPLE, value);
			} else if (_.isObject(value) || _.isArray(value)) {
				value = JSON.stringify(value).replace(/(\{|\}|\[|\]|,)/g, (m, m1) => Dye(COLOR_GREY, m1));
				Right = Dye(COLOR_YELLOW, value);
			} else {
				Right = Dye(COLOR_YELLOW, value);
			}

			content += `<tr><td style="${tdStyle}">${Left}</td><td style="${tdStyle}">${Right}</td></tr>`;
		});

		const Table = `<table style="${tableStyle}"><tbody>${content}</tbody></table>`;

		return Table;
	},
};
