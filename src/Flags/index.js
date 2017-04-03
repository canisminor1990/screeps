import flagCommand from './_command'
export default (roomGroup) => {
	if (!Memory.flags) Memory.flags = {}
	_.forEach(roomGroup, roomName => {
		const flagsRaw  = Memory.rooms[roomName].flags.all
		let flagsMemory = {};
		_.forEach(flagsRaw, flagRaw => {
			const flag           = flagCommand(flagRaw),
			      command        = flag.command,
			      commandContent = flag.commandContent;
			flagsMemory[command] = {
				id: commandContent,
				pos    : flagRaw.pos
			}
		})
		Memory.flags[roomName]= flagsMemory
	})
}