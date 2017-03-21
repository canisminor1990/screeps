import config from '../config';
const factory = config.role;

export default (spawn) => {

}

function getNowFormatDate() {
	const date = new Date();
	return [
		date.getHours(),
		date.getMinutes(),
		date.getSeconds()
	].join('')
}

function buildBody(obj) {
	let array = [];
	for (let key in obj) {
		for (let num = 0; num < obj[key]; num++) {
			array.push(key)
		}
	}
	return array;
}