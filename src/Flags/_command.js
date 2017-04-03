export default (flag) => {
	let name = flag.name.split(' ');
	return {
		command       : name[0].replace('/',''),
		commandContent: name[1],
		pos           : flag.pos
	}
}