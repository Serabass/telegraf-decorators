# Example usage


```typescript
@Bot("<your bot's API token")
export class SerabassBot extends BotAbstract {
  public static instance: SerabassBot;

  @Start()
  @Hears(/hi/i)
  protected reply2(ctx: ContextMessageUpdate) {
    return ctx.reply("Hello");
  }

  @Sticker()
  @Hears(/.+?/)
  protected reply(ctx: ContextMessageUpdate) {
    return ctx.reply("I didn't understand you :(");
  }
}
```
