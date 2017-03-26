export default (flag) => {
	let name = flag.name;
	if (!name.match(/\//)) flag.remove();
	let command, commandContent;
	command = name.replace('/', '');
	if (name.match(' ')) {
		command        = command.match(/[a-z]+ /)[0]
		commandContent = name.replace('/' + command, '')
	}

	return {
		command       : command.replace(/ /g,''),
		commandContent: commandContent,
		pos           : flag.pos
	}
}