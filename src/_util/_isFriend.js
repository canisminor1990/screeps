export default (owner) => {
	return (Memory.config.friends.toString().match(owner)) ? true : false
}