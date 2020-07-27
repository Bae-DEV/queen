import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import chalk from "chalk";

export default class extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
      category: "client",
    });
  }

  async exec(msg: Message): Promise<void> {
    this.client.user?.setActivity({
      type: "PLAYING",
      name: "with bae",
    });

    console.log(chalk.green(`[ ready ] logged in as ${this.client.user?.username}`));
  }
}
