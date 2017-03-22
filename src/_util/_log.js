export default (title, ...content) => {
	if (Memory.log[title]) console.log(`[${title}]`, ...content)
}