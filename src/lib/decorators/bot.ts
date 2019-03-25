import "reflect-metadata";
import Telegraf, { TelegrafOptions } from "telegraf";

export function Bot(token: string, options?: TelegrafOptions): ClassDecorator {
  return function(target: any) {
    let settings = Reflect.getMetadata("bot:settings", target.prototype);
    let bot = new Telegraf(token, options);

    if (settings.commands) {
      for (let command of settings.commands) {
        if (command.value && command.value.length > 0) {
          let [cmd, ...cmds] = command.value.map((v: any) => v.descriptor.value);
          bot.command(command.on, cmd, ...cmds);
        }
      }
    }

    if (settings.hears) {
      for (let hears of settings.hears) {
        if (hears.value && hears.value.length > 0) {
          let [cmd, ...cmds] = hears.value.map((v: any) => v.descriptor.value);
          bot.hears(hears.on, cmd, ...cmds);
        }
      }
    }

    if (settings.on) {
      for (let on of settings.on) {
        if (on.value && on.value.length > 0) {
          let [cmd, ...cmds] = on.value.map((v: any) => v.descriptor.value);
          bot.on(on.on, cmd, ...cmds);
        }
      }
    }

    if (settings.start) {
      let [cmd, ...cmds] = settings.start.map((v: any) => v.descriptor.value);
      bot.start(cmd, ...cmds);
    }

    Reflect.defineMetadata('bot:instance', bot, target.prototype);
  };
}
