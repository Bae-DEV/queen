const { Command } = require("discord-akairo");

module.exports = class extends Command {
  constructor() {
    super("serverlist", {
      aliases: ["serverlist", "slist"],
      userPermissions: ["EMBED_LINKS"],
      ownerOnly: true,
      cooldown: 9000,
      ratelimit: 1,
      channel: "guild",
    });
  }

  async exec(ctx) {
    
    const serverMap = this.client.guilds?.cache.map((server => `\`${server?.name}\``)).join("\n")
  
    ctx.util.send(serverMap, { split: true })
  }
}
