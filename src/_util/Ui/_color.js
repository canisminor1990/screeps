import c from './_c'

const color  = (color, ...content) => {
	return `<font color=${color}>${[...content].join(' ')}</font>`
}
color.yellow = (...content) => {
	return `<font color=${c.yellow}>${[...content].join(' ')}</font>`
}
color.blue   = (...content) => {
	return `<font color=${c.blue}>${[...content].join(' ')}</font>`
}
color.red    = (...content) => {
	return `<font color=${c.red}>${[...content].join(' ')}</font>`
}
color.purple = (...content) => {
	return `<font color=${c.purple}>${[...content].join(' ')}</font>`
}
color.grey   = (...content) => {
	return `<font color=${c.grey}>${[...content].join(' ')}</font>`
}
color.orange = (...content) => {
	return `<font color=${c.orange}>${[...content].join(' ')}</font>`
}
color.green  = (...content) => {
	return `<font color=${c.green}>${[...content].join(' ')}</font>`
}
export default color;
