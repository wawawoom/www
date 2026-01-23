# WUI - Component Library

Bibliothèque de composants React réutilisables pour les applications du monorepo.

## Installation

Les dépendances sont gérées au niveau du workspace. Pour installer :

```bash
pnpm install
```

## Développement

### Storybook

Lancer Storybook pour développer et visualiser les composants :

```bash
pnpm dev
```

Storybook sera accessible sur `http://localhost:6006`

### Build

Construire la bibliothèque :

```bash
pnpm build
```

Construire Storybook pour le déploiement :

```bash
pnpm build-storybook
```

## Déploiement

Storybook est configuré pour être déployé sur :
- **Staging** : `https://next.wawawoom.fr/projects/wui`
- **Production** : `https://wawawoom.fr/projects/wui`

### Déployer sur staging (next.wawawoom.fr)

```bash
pnpm deploy:next
```

### Déployer sur production (wawawoom.fr)

```bash
pnpm deploy:prod
```

**Note** : Assurez-vous d'avoir configuré la variable d'environnement `FTP_PASS` dans un fichier `.env` à la racine du projet ou dans votre shell.

## Utilisation dans les apps

Pour utiliser les composants dans une app du monorepo :

```tsx
import { Button } from '@wawawoom/wui';

function MyComponent() {
  return <Button variant="primary">Click me</Button>;
}
```

## Structure

```
libs/wui/
├── src/
│   ├── components/     # Composants React
│   ├── index.ts        # Point d'entrée principal
│   └── index.css       # Styles globaux
├── .storybook/         # Configuration Storybook
├── scripts/            # Scripts utilitaires
└── dist/               # Build de production
```
