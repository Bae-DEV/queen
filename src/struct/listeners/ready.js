const { Listener } = require("discord-akairo");
const chalk = require("chalk");

module.exports = class extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
      category: "client",
    });
  }

  async exec() {
    this.client.user.setActivity({
      type: "PLAYING",
      name: "with bae",
    });

    console.log(chalk.green(`[ ready ] logged in as ${this.client.user.username}`));
  }
}
