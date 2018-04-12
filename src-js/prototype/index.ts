export const ProtoypeInstall = () => {
	require('./Global');
	require('./Creep');
	require('./Flag');
	require('./Room');
	require('./RoomPosition');
	require('./RoomObject');
	require('./Structure');
	require('./Source');

	if (Memory.pavementArt === undefined) Memory.pavementArt = {};
};
