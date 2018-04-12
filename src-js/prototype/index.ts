let mod = {};
mod.extend = () => {
	require('./Global');
	// require('./Creep');
	// require('./Flag');
	// require('./Room');
	require('./RoomPosition');
	require('./RoomObject');
	require('./Structure');
	require('./Source');
	if (Memory.pavementArt === undefined) Memory.pavementArt = {};
};
module.exports = mod;
