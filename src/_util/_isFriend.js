const friends = [
	"Ruo",
	"FanHua"
];
export default (owner) => {
	if (!owner) return false;
	return (friends.toString().match(owner)) ? true : false
}