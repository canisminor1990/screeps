const _ME = _(Game.rooms)
	.map('controller')
	.filter('my')
	.map('owner.username')
	.first();
_.assign(global, {
	ME: _ME,
	CONTROLLER_SIGN_MESSAGE: `Sign by ${_ME}`,
	LOG_LEVEL: 'debug',
	LOG_EMOJI: true,
});
