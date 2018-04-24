import { RoomExtra } from '../Extra';

class ExtensionExtra extends RoomExtra {
	constructor() {
		super('extension');
	}
	analyzeRoom = (room, needMemoryResync) => {
		if (needMemoryResync) {
			room.saveExtensions();
		}
	};
	prototypeExtend = () => {
		this.assignRoomPrototype({
			saveExtensions: {
				value() {
					const extensions = this.find(FIND_MY_STRUCTURES, {
						filter: s => s instanceof StructureExtension,
					}).map(s => s.id);
					if (extensions.length > 0) this.memory.extensions = extensions;
					else delete this.memory.extensions;
				},
			},
		});
	};
}

export default new ExtensionExtra();
