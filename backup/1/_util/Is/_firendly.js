import Config from '../../config'

export default (owner) => {
	const isFriendly = (_.indexOf(Config.friend, owner) >= 0)
		? true
		: false;

	return isFriendly
}
