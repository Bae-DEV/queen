import {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
  Command,
} from "discord-akairo";
import { bot } from "../../config.json";

export default class extends AkairoClient {
  commandHandler: CommandHandler;
  listenerHandler: ListenerHandler;
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
      directory: "./dist/src/commands/",
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: __dirname + "/listeners/",
    });

    this.init();
  }

  private init(): void {
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process: process
    });

    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
  }

  async start(): Promise<void> {
    await super.login(bot.token);
  }
}
