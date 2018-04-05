import Loop from './loop';

function* main() {
	console.log();
	console.log('* * * * * * * * * * * * * * * * * * * * *');
	console.log('* * * * * * * Code Update ! * * * * * * *');
	console.log('* * * * * * * * * * * * * * * * * * * * *');
	console.log();
	while (true) {
		Loop();
		yield null;
	}
}
function a({ a: string = 2 }) {
	console.log(string);
}
exports.loop = function() {
	if (Object.keys(Game.rooms).length === 0) return;
	let thread;
	try {
		if (Memory.thread) {
			try {
				thread = regeneratorRuntime.deserializeGenerator(Memory.thread);
			} finally {
				delete Memory.thread;
			}
		} else {
			thread = main();
		}
		let result = thread.next();
		if (!result.done) {
			Memory.thread = regeneratorRuntime.serializeGenerator(thread);
		}
	} catch (e) {
		console.log(String.fromCodePoint(0x1f503), `Code Changing at ${Game.time} ...`);
	}
};
