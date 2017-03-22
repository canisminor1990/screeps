import config from '../config'

export default (owner) => {
	return (config.friends.toString().match(owner)) ? true : false
}