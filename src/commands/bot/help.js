const { Command } = require("discord-akairo");

module.exports = class extends Command {
  constructor() {
    super("help", {
      aliases: ["help"],
      userPermissions: ["EMBED_LINKS"],
      cooldown: 9000,
      ratelimit: 1,
      channel: "guild",
    });
  }

  async exec(ctx, args) {

    const embed = this.client.util.embed()
      .setAuthor(ctx.author?.tag, ctx.author?.avatarURL())

    this.handler.categories.forEach((command, category) => {
      embed.addField(`**${category}**`, command.map((name) => `\`${name}\``).join(", "))
    });

    ctx.util.send(embed)

  }
}
