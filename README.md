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

## Projects

### apps/www

Main site (portfolio / personal site). React 19, Vite 7, i18next, uses the <code>@wawawoom/wui</code> library.

| Command (from root)           | From project folder | Description                                                         |
| ----------------------------- | ------------------- | ------------------------------------------------------------------- |
| <code>pnpm --filter www run dev</code>   | <code>pnpm run dev</code>      | Start Vite dev server (with hot reload).                            |
| <code>pnpm --filter www run build</code> | <code>pnpm run build</code>    | Build wui lib, compile TypeScript, then Vite build → <code>apps/www/dist</code>. |
| <code>pnpm --filter www run lint</code>  | <code>pnpm run lint</code>     | Run ESLint on the project.                                           |
| <code>pnpm --filter www run preview</code> | <code>pnpm run preview</code> | Preview the production build locally.                               |
| <code>pnpm --filter www run deploy</code> | <code>pnpm run deploy</code>   | Build then deploy <code>apps/www/dist</code> via FTP (script <code>deploy-www.sh</code>).  |

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
| <code>pnpm --filter @wawawoom/wui run watch:tokens</code> | <code>pnpm run watch:tokens</code>   | Rebuild CSS variables (tokens) on change.                            |
| <code>pnpm --filter @wawawoom/wui run build:variables</code> | <code>pnpm run build:variables</code> | One-off build of design tokens (CSS variables).                      |
| <code>pnpm --filter @wawawoom/wui run build:lib</code>   | <code>pnpm run build:lib</code>      | Compile TypeScript and Vite build → <code>libs/wui/dist</code>.                 |
| <code>pnpm --filter @wawawoom/wui run build:storybook</code> | <code>pnpm run build:storybook</code> | Build Storybook → <code>libs/wui/dist_storybook</code>.                         |
| <code>pnpm --filter @wawawoom/wui run build</code>      | <code>pnpm run build</code>          | <code>build:variables</code> + tests + <code>build:lib</code> + <code>build:storybook</code>.               |
| <code>pnpm --filter @wawawoom/wui run test</code>        | <code>pnpm run test</code>           | Run Jest tests.                                                      |
| <code>pnpm --filter @wawawoom/wui run test:coverage</code> | <code>pnpm run test:coverage</code>  | Run tests with coverage report.                                      |
| <code>pnpm --filter @wawawoom/wui run test:watch</code> | <code>pnpm run test:watch</code>     | Run tests in watch mode.                                             |
| <code>pnpm --filter @wawawoom/wui run deploy</code>     | <code>pnpm run deploy</code>         | Build Storybook then deploy via FTP (script <code>deploy-wui.sh</code>).        |
| <code>pnpm --filter @wawawoom/wui run deploy:tests</code> | <code>pnpm run deploy:tests</code>   | Deploy tests (script <code>deploy-wui-tests.sh</code>).                         |

**From project folder:** <code>cd libs/wui</code> then run <code>pnpm run &lt;script&gt;</code> (e.g. <code>pnpm run dev</code>).

---

### apps/cdn (optional)

Deploy static CDN content (images, videos, etc.) to the server. Uses <code>lftp</code> and variables from <code>.env</code> (including <code>CDN_PATH</code>).

| Command (from root)                    | From project folder        | Description                                                                      |
| ------------------------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| <code>pnpm --filter cdn run deploy</code>        | <code>pnpm run deploy</code>          | Upload <code>apps/cdn/cdn</code> contents to the path set by <code>CDN_PATH</code>.                    |
| <code>pnpm --filter cdn run deploy:download</code> | <code>pnpm run deploy:download</code> | Download remote content into <code>apps/cdn/cdn</code>.                                      |
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

| Package           | Main commands                                                |
| ----------------- | ------------------------------------------------------------ |
| **www**           | <code>dev</code>, <code>build</code>, <code>lint</code>, <code>preview</code>, <code>deploy</code>                  |
| **wawawood**      | <code>dev</code>, <code>build</code>, <code>lint</code>, <code>preview</code>                            |
| **@wawawoom/wui** | <code>dev</code>, <code>build</code>, <code>build:lib</code>, <code>build:storybook</code>, <code>test</code>, <code>deploy</code> |
| **cdn**           | <code>deploy</code>, <code>deploy:download</code>, <code>deploy:sync</code>                    |
