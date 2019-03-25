import "reflect-metadata";
import { BotAbstract } from "../";
import { On } from ".";

export function Sticker(): MethodDecorator {
  return function(
    target: BotAbstract,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    On('sticker')(target, propertyKey, descriptor);
  } as any;
}
