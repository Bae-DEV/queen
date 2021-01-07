const { Command } = require("discord-akairo");

module.exports = class extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping", "latency"],
      userPermissions: ["EMBED_LINKS"],
      cooldown: 9000,
      ratelimit: 1,
      channel: "guild",
    });
  }

  async exec(ctx) {
    ctx.util.send(`:ping_pong: \`${this.client?.ws.ping}\` Pong!`);
  }
}
