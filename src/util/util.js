const { ClientUtil } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../config.json");

module.exports = class extends ClientUtil {
  constructor(client) {
    super(client)
  }
  
  /**
   * Modified MessageEmbed
   * @param {data} embed data
   * @returns colored embed
   */
   
  embed(data) {
    return new MessageEmbed(data).setColor(bot.embedColor)
  }
}