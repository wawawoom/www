# WUI – Design System

Reusable React component library for applications in the monorepo. This guide covers installation, usage, tokens, theming, and project structure.

---

## Installation

Dependencies are managed at the workspace level. From the monorepo root:

```bash
pnpm install
```

The app that consumes WUI must declare the dependency in its `package.json`:

```json
{
  "dependencies": {
    "@wawawoom/wui": "workspace:*"
  }
}
```

Then import the **CSS** once (e.g. in `main.tsx` or `App.tsx`):

```tsx
import "@wawawoom/wui-css";
```

In development, the `@wawawoom/wui-css` alias points to `libs/wui/src/styles/wui.css` so Vite can resolve the `@import`s. The lib build does not emit a CSS file in `dist/`; apps use the CSS sources directly.

---

## Usage

Import components and enums from the package:

```tsx
import {
  WuiButton,
  WuiButtonColor,
  WuiButtonSize,
} from "@wawawoom/wui";

function MyComponent() {
  return (
    <WuiButton color={WuiButtonColor.SECONDARY} size={WuiButtonSize.L}>
      Click me
    </WuiButton>
  );
}
```

---

## Theme (dark mode)

The design system supports light and dark mode via the **`data-theme`** attribute on the `<html>` element.

- **No attribute**: theme follows system preference (`prefers-color-scheme: dark`). Dark variables are applied via `variables-dark-prefers.css`.
- **`data-theme="dark"`**: force dark theme.
- **`data-theme="light"`**: force light theme.

Components use semantic variables (`--wui-color-alias-neutral-*`, etc.) and adapt to the active theme. Apps that want a manual toggle (e.g. a footer button) can set or remove `data-theme` on `document.documentElement` and persist the choice (e.g. `localStorage`).

---

## Tokens and build

Styles are driven by **tokens** (Style Dictionary):

1. **Atomic tokens** (`src/tokens/atomic/`): raw colors, typography, spacing.
2. **Semantic tokens** (`src/tokens/semantic/`): aliases (neutral, success, danger, warning, info) that reference atomic tokens.
3. **Dark theme** (`src/tokens/semantic/color.dark.json`): same aliases with inverted neutral for dark mode.

The **`pnpm run build:variables`** script generates:

- `variables.css` (light theme, `:root`),
- `variables-dark.css` (selector `[data-theme="dark"]`),
- `variables-dark-prefers.css` (dark theme when the browser prefers dark and no `data-theme` is set).

In development, `nodemon` watches `src/tokens` and re-runs this build when JSON files change.

---

## Available scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Runs token watch and Storybook (port 6006). |
| `pnpm run build:variables` | Generates CSS and enum files from tokens. |
| `pnpm run build:lib` | Builds the lib (TypeScript + Vite). |
| `pnpm run build:storybook` | Builds Storybook into `dist_storybook`. |
| `pnpm run build` | build:variables → test → build:lib → build:storybook. |
| `pnpm run test` | Runs Jest. |
| `pnpm run test:coverage` | Jest with coverage report. |

---

## Component structure

Each WUI component follows the same structure:

- `WuiXxx.tsx` – React component,
- `WuiXxx.css` – styles (variables `--wui-*`, overrides for `[data-theme="dark"]` if needed),
- `WuiXxx.props.ts` – prop types and enums,
- `index.ts` – re-export,
- `WuiXxx.stories.tsx` and `WuiXxx.mdx` – Storybook docs.

Dark variants are handled in CSS via the `[data-theme="dark"]` selector in the component file, without changing tokens.

**Adding a new component**: create the `WuiXxx/` folder, add `WuiXxx.tsx`, `WuiXxx.css`, `WuiXxx.props.ts`, `index.ts`, then `WuiXxx.stories.tsx` and `WuiXxx.mdx`. Re-export from `src/components/index.ts`. For docs-only Storybook pages (e.g. palette, typography), use `tags: ["!dev"]` and `parameters: { docsOnly: true }`.

---

## Tests

All exported components have unit tests (Jest + React Testing Library). Utils (`clsx`, `loremIpsum`) are also tested. To run tests:

```bash
pnpm run test
pnpm run test:coverage
```

---

## .env file

Package scripts (e.g. `deploy`) may rely on environment variables. You can define them in a `.env` file at the monorepo root or in `libs/wui/`, or export them in the shell before running the command.

- **`CDN_PATH`** — Server destination path for CDN assets.
- **`FTP_HOST`** — FTP server host.
- **`FTP_USER`** — FTP username.
- **`FTP_PASS`** — FTP password. Do not commit; use `.env` and add it to `.gitignore`.
- **`FTP_PORT`** — FTP port (default `21`).

Example `.env` (create if needed):

```
CDN_PATH=/www/next/projects/cdn/
FTP_HOST=ftp.example.com
FTP_USER=your_username
FTP_PASS=your_ftp_password
FTP_PORT=21
```
