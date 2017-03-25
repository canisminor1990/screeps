const colorType = {
	yellow: '#E6DB74',
	blue  : '#66D9EF',
	red   : '#F92672',
	purple: '#AE81FF',
	grey  : '#75715E',
	orange: '#FD971F',
	green : '#A6E22E',
};

const color  = (color, content) => {
	return `<font color=${color}>${content}</font>`
}
color.yellow = (content) => {
	"use strict";
	return `<font color=${colorType.yellow}>${content}</font>`
}
color.blue   = (content) => {
	"use strict";
	return `<font color=${colorType.blue}>${content}</font>`
}
color.red    = (content) => {
	"use strict";
	return `<font color=${colorType.red}>${content}</font>`
}
color.purple = (content) => {
	"use strict";
	return `<font color=${colorType.purple}>${content}</font>`
}
color.grey   = (content) => {
	"use strict";
	return `<font color=${colorType.grey}>${content}</font>`
}
color.orange = (content) => {
	"use strict";
	return `<font color=${colorType.orange}>${content}</font>`
}
color.green  = (content) => {
	"use strict";
	return `<font color=${colorType.green}>${content}</font>`
}
export default color;