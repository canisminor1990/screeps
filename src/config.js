const _ME = _(Game.rooms)
  .map('controller')
  .filter('my')
  .map('owner.username')
  .first();

const Config = {
  ME: _ME,
  CONTROLLER_SIGN_MESSAGE: `Sign by ${_ME}`,
  LOG_LEVEL: 'debug',
  LOG_EMOJI: true,
};

Memory.config = Config;
module.exports = Config;
