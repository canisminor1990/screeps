import { Ui } from '../';

export default {
	error  : (title = Game.time, ...content) => {
		console.log(Ui.color.red('#', 'Error'), `[${Ui.color.purple(title)}]`, [...content].join(' | '))
	},
	warn   : (title = Game.time, ...content) => {
		console.log(Ui.color.yellow('#', 'Warn'), `[${Ui.color.purple(title)}]`, [...content].join(' | '))
	},
	succeed: (title = Game.time, ...content) => {
		console.log(Ui.color.green('#', 'Succeed'), `[${Ui.color.purple(title)}]`, [...content].join(' | '))
	},
	note   : (title = Game.time, ...content) => {
		console.log(Ui.color.blue('#', 'Note'), `[${Ui.color.purple(title)}]`, [...content].join(' | '))
	},
	info   : (...content) => {
		console.log(Ui.color.grey('#', ...content))
	}
}