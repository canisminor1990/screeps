const Color = {
	[COLOR_RED]: '#F92672',
	[COLOR_PURPLE]: '#AE81FF',
	[COLOR_BLUE]: '#66D9EF',
	[COLOR_CYAN]: '#529B2F',
	[COLOR_GREEN]: '#A6E22E',
	[COLOR_YELLOW]: '#E6DB74',
	[COLOR_ORANGE]: '#FD971F',
	[COLOR_BROWN]: '#75715E',
	[COLOR_GREY]: '#999999',
	[COLOR_WHITE]: '#F8F8F0',
};
const Style = {
	...Color,
	link: { color: '#428bca', fontSize: '9px' },
	black: { color: 'black', fontWeight: 'bold' },
	system: { color: Color[COLOR_GREY], fontSize: '9px' },
	success: { color: Color[COLOR_GREEN], fontSize: '9px' },
	error: { color: Color[COLOR_RED], fontSize: '9px' },
	warn: { color: Color[COLOR_ORANGE], fontSize: '9px' },
	info: { color: Color[COLOR_BLUE], fontSize: '9px' },
	debug: { color: Color[COLOR_BROWN], fontSize: '9px' },
	room: { color: Color[COLOR_PURPLE], fontSize: '9px' },
};

export default (style: string | number, ...text: any[]): string => {
	const applyStyle = Style[style] as string | Object;
	const msg = text.join(' ');
	if (_.isObject(applyStyle)) {
		return `<span style="${Util.css(applyStyle)}">${msg}</span>`;
	} else {
		return `<span style="color: ${applyStyle}">${msg}</span>`;
	}
};
