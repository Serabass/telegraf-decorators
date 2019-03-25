# Example usage

```
 $ npm i telegraf-decorators
```

```typescript
import { ContextMessageUpdate } from "telegraf";
import { Start, Sticker, Hears, Bot } from "telegraf-decorators";
import { BotAbstract } from "telegraf-decorators";

@Bot("<your bot's API token>")
export class SerabassBot extends BotAbstract {
  public static instance: SerabassBot;

  @Start()
  @Hears(/hi/i)
  protected replyHi(ctx: ContextMessageUpdate) {
    return ctx.reply("Hello");
  }

  @Sticker()
  @Hears(/.+?/)
  protected reply(ctx: ContextMessageUpdate) {
    return ctx.reply("I didn't understand you :(");
  }
}
```
