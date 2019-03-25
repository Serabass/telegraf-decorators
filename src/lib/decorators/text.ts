import "reflect-metadata";
import { BotAbstract } from "../";
import { On } from ".";

export function Text(): MethodDecorator {
  return function(
    target: BotAbstract,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    On("text")(target, propertyKey, descriptor);
  } as any;
}
