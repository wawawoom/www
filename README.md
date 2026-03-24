# Wawawoom – Monorepo

pnpm monorepo containing web applications and the shared UI library.

**Prerequisites:** Node.js >= 22.12.0, [pnpm](https://pnpm.io/) (recommended: <code>npm install -g pnpm</code>).

---

## Installation

```bash
pnpm install
```

**Adding a dependency:**

- At root: <code>pnpm add &lt;package&gt;</code>
- In a workspace: <code>pnpm --filter &lt;package-name&gt; add &lt;package&gt;</code>

---

## Design tokens and Style Dictionary

Design token **sources** live in **`libs/design-token/tokens/`** (JSON). **Style Dictionary** runs from **`@wawawoom/design-token`** (`libs/design-token`).

**Generated outputs (do not edit by hand):**

| Output | Location |
| --- | --- |
| CSS variables (light, dark, utils) | `libs/wui/src/styles/` (`variables.css`, `variables-dark.css`, `utils.css`, …) |
| `variables-dark-prefers.css` | `libs/wui/src/styles/` (produced by `libs/wui/scripts/generate-dark-prefers.js` after each full token build) |
| Color enums (`WuiColorName`, `WuiColorValue`, `WuiColorAlias`) | `libs/design-token/src/enum/generated/` — **`@wawawoom/design-token/enum`**; **`@wawawoom/wui`** re-exports them |

**Watch and builds:** `watch:tokens` runs **nodemon** in `design-token`, rebuilds on `tokens/**/*.json` changes, then runs `generate-dark-prefers.js`. You can start it from **`libs/wui`** or **`libs/wui-rn`** (`pnpm run watch:tokens` or `pnpm run dev`). For a one-off web build, prefer **`pnpm --filter @wawawoom/wui run build:variables`** (Style Dictionary + dark-prefers).

**React Native:** `wui-rn` imports palette JSON from `@wawawoom/design-token/tokens/*` and color enums from `@wawawoom/design-token/enum`. Metro must resolve that subpath (see `libs/wui-rn/metro.config.js` and `apps/rn/metro.config.js`).

---

## Projects

### apps/www

Main site (portfolio / personal site). React 19, Vite 7, i18next, uses the <code>@wawawoom/wui</code> library.

| Command (from root)           | From project folder | Description                                                         |
| ----------------------------- | ------------------- | ------------------------------------------------------------------- |
| <code>pnpm --filter www run dev</code>   | <code>pnpm run dev</code>      | Start Vite dev server (with hot reload).                            |
| <code>pnpm --filter www run build</code> | <code>pnpm run build</code>    | Build wui lib, compile TypeScript, then Vite build → <code>apps/www/dist</code>. |
| <code>pnpm --filter www run lint</code>  | <code>pnpm run lint</code>     | Run ESLint on the project.                                           |
| <code>pnpm --filter www run preview</code> | <code>pnpm run preview</code> | Preview the production build locally.                               |
| <code>pnpm --filter www run deploy</code> | <code>pnpm run deploy</code>   | Build then deploy <code>apps/www/dist</code> via FTP (script <code>apps/www/scripts/deploy-www.sh</code>).  |

**From project folder:** <code>cd apps/www</code> then run <code>pnpm run &lt;script&gt;</code> (e.g. <code>pnpm run dev</code>).

---

### apps/wawawood

Wawawood app (lamps, etc.). React 19, Vite 7, React Router. Dev server port: 5174.

| Command (from root)                | From project folder | Description                               |
| ---------------------------------- | ------------------- | ----------------------------------------- |
| <code>pnpm --filter wawawood run dev</code>   | <code>pnpm run dev</code>      | Start Vite dev server (port 5174).        |
| <code>pnpm --filter wawawood run build</code> | <code>pnpm run build</code>    | Compile TypeScript then Vite build.       |
| <code>pnpm --filter wawawood run lint</code>  | <code>pnpm run lint</code>     | Run ESLint on the project.                |
| <code>pnpm --filter wawawood run preview</code> | <code>pnpm run preview</code> | Preview the build locally.                |

**From project folder:** <code>cd apps/wawawood</code> then run <code>pnpm run &lt;script&gt;</code> (e.g. <code>pnpm run dev</code>).

---

### libs/wui

Shared UI library (<code>@wawawoom/wui</code>): React components, design tokens, Storybook.

| Command (from root)                          | From project folder       | Description                                                          |
| -------------------------------------------- | ------------------------- | -------------------------------------------------------------------- |
| <code>pnpm --filter @wawawoom/wui run dev</code>        | <code>pnpm run dev</code>            | Start Storybook (port 6006) and token watch.                         |
| <code>pnpm --filter @wawawoom/design-token run watch:tokens</code> | (from <code>libs/design-token</code>) | Rebuild CSS + enums when <code>tokens/**/*.json</code> change.            |
| <code>pnpm --filter @wawawoom/wui run watch:tokens</code> | <code>pnpm run watch:tokens</code>   | Same as above (delegates to <code>@wawawoom/design-token</code>).      |
| <code>pnpm --filter @wawawoom/wui run build:variables</code> | <code>pnpm run build:variables</code> | One-off token build: Style Dictionary + <code>variables-dark-prefers.css</code> (enums in <code>@wawawoom/design-token</code>).                      |
| <code>pnpm --filter @wawawoom/wui run build:lib</code>   | <code>pnpm run build:lib</code>      | Compile TypeScript and Vite build → <code>libs/wui/dist</code>.                 |
| <code>pnpm --filter @wawawoom/wui run build:storybook</code> | <code>pnpm run build:storybook</code> | Build Storybook → <code>libs/wui/dist_storybook</code>.                         |
| <code>pnpm --filter @wawawoom/wui run build</code>      | <code>pnpm run build</code>          | <code>build:variables</code> + tests + <code>build:lib</code> + <code>build:storybook</code>.               |
| <code>pnpm --filter @wawawoom/wui run test</code>        | <code>pnpm run test</code>           | Run Jest tests.                                                      |
| <code>pnpm --filter @wawawoom/wui run test:coverage</code> | <code>pnpm run test:coverage</code>  | Run tests with coverage report.                                      |
| <code>pnpm --filter @wawawoom/wui run test:watch</code> | <code>pnpm run test:watch</code>     | Run tests in watch mode.                                             |
| <code>pnpm --filter @wawawoom/wui run deploy</code>     | <code>pnpm run deploy</code>         | Build Storybook then deploy via FTP (script <code>libs/wui/scripts/deploy-wui.sh</code>).        |
| <code>pnpm --filter @wawawoom/wui run deploy:tests</code> | <code>pnpm run deploy:tests</code>   | Deploy tests (script <code>libs/wui/scripts/deploy-wui-tests.sh</code>).                         |

**From project folder:** <code>cd libs/wui</code> then run <code>pnpm run &lt;script&gt;</code> (e.g. <code>pnpm run dev</code>).

---

### libs/wui-rn

React Native UI library (Expo, on-device Storybook). Uses <code>@wawawoom/design-token</code> for palette JSON and generated color enums (<code>@wawawoom/design-token/enum</code>).

| Command (from root) | From project folder | Description |
| --- | --- | --- |
| <code>pnpm --filter wui-rn run dev</code> | <code>pnpm run dev</code> | Storybook RN and token watch (delegates to <code>@wawawoom/design-token</code>). |
| <code>pnpm --filter wui-rn run watch:tokens</code> | <code>pnpm run watch:tokens</code> | Same token watch as <code>wui</code> (CSS under <code>libs/wui</code>, enums under <code>libs/design-token</code>, then <code>generate-dark-prefers.js</code>). |

**From project folder:** <code>cd libs/wui-rn</code> then run <code>pnpm run &lt;script&gt;</code>.

---

### libs/design-token

Shared **design tokens** (JSON) and **Style Dictionary** config for <code>@wawawoom/wui</code> and <code>wui-rn</code>. Source files live under <code>libs/design-token/tokens/</code>. **Outputs:** CSS variables and utils under <code>libs/wui/src/styles/</code>; color TypeScript enums under <code>libs/design-token/src/enum/generated/</code> (exported as <code>@wawawoom/design-token/enum</code>). <code>wui-rn</code> reads palette JSON and those enums at build time (Metro resolves the enum entry).

| Command (from root) | Description |
| --- | --- |
| <code>pnpm --filter @wawawoom/design-token run build:tokens</code> | Style Dictionary: light + dark CSS in <code>wui</code>, color enums in this package. |
| <code>pnpm --filter @wawawoom/design-token run watch:tokens</code> | Nodemon: rebuild on <code>tokens/**/*.json</code> change, then <code>generate-dark-prefers.js</code> in <code>wui</code>. |

Usually you run <code>pnpm --filter @wawawoom/wui run build:variables</code> instead of <code>build:tokens</code> alone; it calls this package then <code>generate-dark-prefers.js</code>.

---

### apps/cdn (optional)

Deploy static CDN content (images, videos, etc.) to the server. Uses <code>lftp</code> and variables from <code>.env</code> (including <code>CDN_PATH</code>).

| Command (from root)                    | From project folder        | Description                                                                      |
| ------------------------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| <code>pnpm --filter cdn run deploy</code>        | <code>pnpm run deploy</code>          | Upload <code>apps/cdn/src</code> contents to the path set by <code>CDN_PATH</code>.                     |
| <code>pnpm --filter cdn run deploy:download</code> | <code>pnpm run deploy:download</code> | Download remote content into <code>apps/cdn/src</code>.                                       |
| <code>pnpm --filter cdn run deploy:sync</code>   | <code>pnpm run deploy:sync</code>     | Sync local → server (mirror; removes on server what is no longer local).         |

**From project folder:** <code>cd apps/cdn</code> then run <code>pnpm run deploy</code>, <code>pnpm run deploy:download</code>, etc.

---

## Monorepo root

| Command (from root) | From project folder | Description                              |
| ------------------- | ------------------- | ---------------------------------------- |
| <code>pnpm run lint</code>     | —                   | Run lint across all workspaces.          |
| <code>pnpm run format</code>   | —                   | Format code with Prettier (<code>**/src/**</code>). |

*Root commands are intended to be run from the monorepo root only.*

---

## Command summary by package

| Package | Main commands |
| --- | --- |
| **www** | <code>dev</code>, <code>build</code>, <code>lint</code>, <code>preview</code>, <code>deploy</code> |
| **wawawood** | <code>dev</code>, <code>build</code>, <code>lint</code>, <code>preview</code> |
| **@wawawoom/wui** | <code>dev</code>, <code>watch:tokens</code>, <code>build:variables</code>, <code>build</code>, <code>build:lib</code>, <code>build:storybook</code>, <code>test</code>, <code>deploy</code> |
| **wui-rn** | <code>dev</code>, <code>watch:tokens</code>, <code>start</code>, <code>storybook-generate</code> |
| **@wawawoom/design-token** | <code>build:tokens</code>, <code>watch:tokens</code> |
| **cdn** | <code>deploy</code>, <code>deploy:download</code>, <code>deploy:sync</code> |
