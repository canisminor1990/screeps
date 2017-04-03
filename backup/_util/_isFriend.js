const friends = [
	"Ruo",
	"FanHua"
];
export default (owner) => {
	if (!owner || owner == 'Invader') return false;
	return (friends.toString().match(owner)) ? true : false
}