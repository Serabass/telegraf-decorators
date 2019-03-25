import Telegraf, { ContextMessageUpdate } from "telegraf";

export class BotAbstract<T extends ContextMessageUpdate = any> {
  private static _instance: BotAbstract<any>;

  public static get instance(): BotAbstract<any> {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public bot: Telegraf<T>;

  constructor() {
    this.bot = Reflect.getMetadata("bot:instance", this);
  }

  public async preLaunch() {}

  public async launch() {
    await this.preLaunch();
    return await (this.bot as any).launch();
  }
}
