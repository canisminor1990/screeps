export default (flag) => {
	let name = flag.name.split(' ');
	if (!name.match(/\//)) flag.remove();
	let command, commandContent;
	command = name.replace('/', '');
	if (name.match(' ')) {
		command        = command.match(/[a-z]+ /)[0]
		commandContent = name.replace('/' + command, '')
	}

	return {
		command       : name[0].replace('/',''),
		commandContent: name[1],
		pos           : flag.pos
	}
}