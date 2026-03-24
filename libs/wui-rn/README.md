# wui-rn

React Native UI library (Expo, on-device Storybook). It shares **design tokens** and **generated color enums** with the web design system via **`@wawawoom/design-token`**.

## Design tokens and Style Dictionary

- **Token sources** are edited in **`libs/design-token/tokens/`** (not in this package).
- **Palette and spacing JSON** are imported from `@wawawoom/design-token/tokens/*` (see `src/styles/atomic.ts` and `fromDesignTokens.ts`). Spacing uses **numeric** pixel values in `tokens/semantic/space.json`; Style Dictionary appends `px` for web CSS; RN uses the same numbers as dp.
- **Color enums** (`WuiColorAlias`, `WuiColorName`, `WuiColorValue`) are generated into **`libs/design-token/src/enum/generated/`** when you run `build:tokens` or `watch:tokens` in `@wawawoom/design-token`. Import from **`@wawawoom/design-token/enum`** (also re-exported from this package’s `src/index.ts`).

### Scripts

| Command                       | Description                                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm run dev`                | Runs **`watch:tokens`** (delegates to `@wawawoom/design-token`) together with Storybook RN.                                       |
| `pnpm run watch:tokens`       | Same token watch as `libs/wui`: rebuilds CSS in `wui`, enums in `design-token`, then `libs/wui/scripts/generate-dark-prefers.js`. |
| `pnpm run start`              | Expo dev server (`expo start`).                                                                                                   |
| `pnpm run storybook-generate` | Regenerates the Storybook story index (run after adding or moving `*.stories.tsx` files).                                         |

### Metro and `@wawawoom/design-token/enum`

Expo/Metro does not always resolve package **subpath exports** the same way as Node. This repo configures **`resolveRequest`** so `@wawawoom/design-token/enum` maps to `libs/design-token/src/enum/index.ts`:

- `libs/wui-rn/metro.config.js`
- `apps/rn/metro.config.js` (when the consumer app bundles `wui-rn`)

## Storybook troubleshooting

If stories do not appear or Metro serves a stale bundle:

```bash
cd libs/wui-rn
pnpm run storybook-generate
pnpm start -- --clear
```

Or combine: `pnpm run storybook-generate && pnpm start -- --clear`.

To free the default Metro port (8081) if something is still listening:

```bash
kill $(lsof -tiTCP:8081 -sTCP:LISTEN)
```

## Further reading

- **`libs/design-token/README.md`** — Style Dictionary, `build:tokens`, exports.
- **Root `README.md`** — **Design tokens and Style Dictionary** and workspace commands.
