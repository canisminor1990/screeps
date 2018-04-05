Object.defineProperties(Room.prototype, {
  // Logging
  // =====================================================================================================
  print: {
    get(): string {
      return '<a href="#!/room/' + Game.shard.name + '/' + this.name + '">' + this.name + '</a>';
    },
  },

  // Room properties
  // =====================================================================================================
  rcl: {
    get(): string {
      return this.controller.level;
    },
  },
  my: {
    get(): boolean {
      return this.controller && this.controller.my;
    },
  },
  reservedByMe: {
    get() {
      return this.controller && this.controller.reservation && this.controller.reservation.username === ME;
    },
  },
  signedByMe: {
    get() {
      return this.controller && this.controller.sign && this.controller.sign.text === CONTROLLER_SIGN_MESSAGE;
    },
  },
});
