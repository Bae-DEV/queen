import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping", "latency"],
      userPermissions: ["EMBED_LINKS"],
      description: {
        usage: "ping",
        examples: ["ping"],
        description: "",
      },
      cooldown: 9000,
      ratelimit: 1,
      channel: "guild",
    });
  }

  async exec(ctx: Message) {
    ctx.util?.send(`:ping_pong: \`${this.client?.ws.ping}\` Pong!`);
  }
}
