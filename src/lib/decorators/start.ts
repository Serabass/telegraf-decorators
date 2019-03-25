import "reflect-metadata";
import { BotAbstract } from "../";

export function Start(): MethodDecorator {
  return function(
    target: BotAbstract,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    let metadata = Reflect.getMetadata("bot:settings", target);

    if (!metadata) {
      metadata = new WeakMap();
    }

    if (!metadata.start) {
      metadata.start = [];
    }

    metadata.start.push({
      target,
      propertyKey,
      descriptor
    });

    Reflect.defineMetadata("bot:settings", metadata, target);

    // target.bot.start(descriptor.value);
  } as any;
}
