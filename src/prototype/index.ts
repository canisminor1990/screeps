export const ProtoypeInstall = () => {
	require('./Structure');
	require('./Source');
	require('./RoomPosition');
	require('./RoomObject');
	if (Memory.pavementArt === undefined) Memory.pavementArt = {};
};
