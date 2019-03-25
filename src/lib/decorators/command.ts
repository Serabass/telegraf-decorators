import "reflect-metadata";
import { BotAbstract } from "../.";

export function Command(command: string | string[]): MethodDecorator {
  return function(
    target: BotAbstract,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    let metadata = Reflect.getMetadata("bot:settings", target);

    if (!metadata) {
      metadata = {};
    }

    if (!metadata.commands) {
      metadata.commands = [];
    }

    if (!metadata.commands.find((el: any) => el.on === command)) {
      metadata.commands.push({
        on: command,
        value: []
      });
    }

    let on = metadata.commands.find((el: any) => el.on === command);

    on.value.push({
      target,
      propertyKey,
      descriptor
    });

    Reflect.defineMetadata("bot:settings", metadata, target);

    // target.bot.command(command, descriptor.value);
  } as any;
}
