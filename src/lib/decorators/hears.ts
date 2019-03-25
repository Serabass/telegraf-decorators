import "reflect-metadata";
import { HearsTriggers } from "telegraf";
import { BotAbstract } from "../";

export function Hears(triggers: HearsTriggers): MethodDecorator {
  return function(
    target: BotAbstract,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    let metadata = Reflect.getMetadata("bot:settings", target);

    if (!metadata) {
      metadata = {};
    }

    if (!metadata.hears) {
      metadata.hears = [];
    }

    if (!metadata.hears.find((el: any) => el.on === triggers)) {
      metadata.hears.push({
        on: triggers,
        value: []
      });
    }

    let on = metadata.hears.find((el: any) => el.on === triggers);

    on.value.push({
      target,
      propertyKey,
      descriptor
    });

    Reflect.defineMetadata("bot:settings", metadata, target);

    // target.bot.hears(triggers, descriptor.value);
  } as any;
}
