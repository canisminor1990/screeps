export const ProtoypeInstall = () => {
	require('./Global');
	require('./Creep');
	require('./Structure');
	require('./Source');
	require('./RoomPosition');
	require('./RoomObject');

	if (Memory.pavementArt === undefined) Memory.pavementArt = {};
};
