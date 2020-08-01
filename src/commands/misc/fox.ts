import { Message, GuildMember, MessageEmbed } from "discord.js";
import { Command } from "discord-akairo";
import axios from "axios";
import { bot } from "../../../config.json";

export default class extends Command {
  constructor() {
    super("fox", {
      aliases: ["fox"],
      userPermissions: ["EMBED_LINKS"],
      description: {
        usage: "fox [member]",
        examples: ["fox @eggsy"],
        description: "",
      },
      args: [
        {
          id: "member",
          type: "member",
          default: (ctx: Message) => ctx.member,
        },
      ],
      cooldown: 9000,
      ratelimit: 1,
      channel: "guild",
    });
  }

  async exec(ctx: Message, args: { member: GuildMember }): Promise<void> {
    axios.get(`https://some-random-api.ml/img/fox`).then((response) => {
      ctx.util?.send(
        new MessageEmbed()
          .setColor(bot.embedColor)
          .setImage(response.data.link)
          .setTimestamp()
          .setTitle(
            args.member.user.id === ctx.author.id
              ? "You're a fox right now"
              : `${args.member.user.username} a fox right now`
          )
      );
    });
  }
}
