import "reflect-metadata";
import { BotAbstract } from "../";
import { UpdateType, MessageSubTypes } from "telegraf/typings/telegram-types";

export function On(
  updateTypes: UpdateType | UpdateType[] | MessageSubTypes | MessageSubTypes[]
): MethodDecorator {
  return function(
    target: BotAbstract,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    let metadata = Reflect.getMetadata("bot:settings", target);

    if (!metadata) {
      metadata = {};
    }

    if (!metadata.on) {
      metadata.on = [];
    }

    if (!metadata.on.find((el: any) => el.on === updateTypes)) {
      metadata.on.push({
        on: updateTypes,
        value: []
      });
    }

    let on = metadata.on.find((el: any) => el.on === updateTypes);

    on.value.push({
      target,
      propertyKey,
      descriptor
    });

    Reflect.defineMetadata("bot:settings", metadata, target);

    // target.bot.on(updateTypes, descriptor.value);
  } as any;
}
