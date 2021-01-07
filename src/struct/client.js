const {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
  Command,
} = require("discord-akairo");
const { bot } = require("../../config.json");
const Util = require("../util/util");

module.exports = class extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: bot.owners,
      },
      {
        disableMentions: "everyone",
        messageCacheMaxSize: 20,
        messageCacheLifetime: 60 * 15,
        messageSweepInterval: 60,
      }
    );

    this.commandHandler = new CommandHandler(this, {
      prefix: bot.prefix,
      aliasReplacement: /-/g,
      classToHandle: Command,
      commandUtil: true,
      handleEdits: true,
      blockClient: true,
      blockBots: true,
      fetchMembers: true,
      automateCategories: true,
      defaultCooldown: 3000,
      directory: "./src/commands/",
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: __dirname + "/listeners/",
    });
    
    this.util = new Util(this);

  }

  _init() {
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process: process
    });

    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();

    return this.login(bot.token);
  }
}

