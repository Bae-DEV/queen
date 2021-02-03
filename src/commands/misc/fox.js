const { Command } = require("discord-akairo");
const axios = require("axios");
const { bot } = require("../../../config.json");

module.exports = class extends Command {
  constructor() {
    super("fox", {
      aliases: ["fox"],
      userPermissions: ["EMBED_LINKS"],
      args: [
        {
          id: "member",
          type: "member",
          default: (ctx) => ctx.member,
        },
      ],
      cooldown: 9000,
      ratelimit: 1,
      channel: "guild",
    });
  }

  exec(ctx, args) {
    axios.get(`https://some-random-api.ml/img/fox`).then((response) => {
      const embed = this.client.util.embed()  
        .setImage(response.data?.link)
        .setTitle(
          args.member.user.id === ctx.author.id
            ? "You're a fox right now"
            : `${args.member.user?.username} a fox right now`
        )
          
    	ctx.util.send(embed)
    });
  }
}
