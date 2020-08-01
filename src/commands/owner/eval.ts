import { Command } from "discord-akairo";
import { Message } from "discord.js";
import hastebin from "hastebin-gen";
import { MessageEmbed } from "discord.js";
import { bot } from "../../../config.json";

export default class extends Command {
  constructor() {
    super("eval", {
      aliases: ["eval"],
      ownerOnly: true,
      category: "Owner",
      args: [
        {
          id: "code",
          match: "content",
          prompt: {
            start:
              "Missing arguments! please type code for eval command or cancel if youu dont want to",
            retry:
              "Missing arguments! please type code for eval command or cancel if youu dont want to",
          },
        },
      ],
    });
  }
  async clean(text: string): Promise<string> {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }

  async exec(msg: Message, args: { code: string }): Promise<void> {
    const embed = new MessageEmbed()
      .setColor(bot.embedColor)
      .addFields(
        { name: "Type", value: typeof args.code },
        { name: "Input", value: `\`\`\`js\n${args.code}\`\`\`` }
      );

    try {
      let _eval;
      if (args.code.includes(`token`)) {
        _eval = "token";
      } else {
        _eval = await eval(args.code);
      }

      if (typeof _eval !== "string")
        _eval = require("util").inspect(_eval, { depth: 0 });

      let output: string = await this.clean(_eval);
      if (output.length > 1024) {
        const haste = await hastebin(output);
        embed.addField("Error", `${haste}`);
      } else {
        embed.addField("Output", `\`\`\`js\n${output}\`\`\``);
      }
      msg.util?.send(embed);
    } catch (e) {
      let error: string = await this.clean(e);
      if (error.length > 1024) {
        const haste = await hastebin(error);
        embed.addField("Error", `${haste}`);
      } else {
        embed.addField("Error", `\`\`\`js\n${error}\`\`\``);
      }
      msg.util?.send(embed);
    }
  }
}
