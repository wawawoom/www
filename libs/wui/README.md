# WUI - Component Library

Reusable React component library for applications in the monorepo.

## Installation

Dependencies are managed at the workspace level. To install:

```bash
pnpm install
```

## Development

### Storybook

Run Storybook to develop and preview components:

```bash
pnpm run dev
```

Storybook will be available at `http://localhost:6006`

### Build

Build the lib & Storybook:

```bash
pnpm build
```

Build the lib only:

```bash
pnpm build:lib
```

Build Storybook only:

```bash
pnpm run build:storybook
```

## Usage

To use the components in an app within the monorepo:

```tsx
import { Button } from "@wawawoom/wui";

function MyComponent() {
  return <Button color={WuiButtonColor.DARK}>Click me</Button>;
}
```

## Deployment

### Deploy to production (wawawoom.fr)

```bash
pnpm run deploy
```

**Note:** Make sure you have set the `FTP_PASS` environment variable in a `.env` file at the project root or in your shell.

## Tests

To run Jest tests:

```bash
pnpm run test:coverage
```
