import config from '../config'

export default (owner) => {
	return (_.indexOf(config.friends, owner)) ? true : false
}