# personal-discord-bot

A Discord bot built with [seedcord](https://seedcord.org) on the gateway transport.

## Running it

```sh
npm run dev
```

That starts the dev server with hot reload.

## Scripts

<!-- prettier-ignore-start -->

| script | what it does |
| --- | --- |
| `npm run dev` | dev server with hot reload |
| `npm run build` | compile to `dist/` |
| `npm run start` | run the compiled build |
| `npm run codegen` | regenerate `src/seedcord-gen.d.ts` |
| `npm run lint` | eslint |
| `npm run tc` | type-check |

<!-- prettier-ignore-end -->

Run `codegen` after you add a command or change its options. It writes the types behind `this.options`, and the generated file is committed.

## Environment

`.env` holds your secrets and is gitignored.

<!-- prettier-ignore-start -->

| key | required |
| --- | --- |
| `DISCORD_BOT_TOKEN` | yes |
| `UNKNOWN_EXCEPTION_WEBHOOK_URL` | no |
| `HANDLED_EXCEPTION_WEBHOOK_URL` | no |
| `ENV` | no, defaults to `development` |

<!-- prettier-ignore-end -->

The two webhook keys take Discord webhook URLs. Set them to get error reports posted to a channel.

## Where things go

- `src/commands/` holds command definitions, one class per command.
- `src/handlers/` holds the code that runs when someone uses one.
- `src/events/` holds event handlers for the things happening in a server.
- `src/bot.ts` is the config.

## Docs

- Guide: <https://guide.seedcord.org>
- API reference: <https://docs.seedcord.org>
