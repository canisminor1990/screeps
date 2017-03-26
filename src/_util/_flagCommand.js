export default (flag) => {
	let name = flag.name;
	if (!name.match(/\//)) flag.remove();
	let command, commandContent;
	command = name.replace('/', '');
	if (name.match(' ')) {
		command        = command.match(/[a-z]+ /)
		commandContent = name.replace('/' + command, '')
	}
	if (command) command = command.replace(/ /g,'')
	return {
		command       : command,
		commandContent: commandContent,
		pos           : flag.pos
	}
}