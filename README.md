# www

# Installer pnpm globalement (si ce n'est pas déjà fait)
npm install -g pnpm

# Installer les dépendances
pnpm install

# Ajouter une dépendance à la racine
pnpm add <package>

# Ajouter une dépendance à un workspace spécifique
pnpm --filter <workspace-name> add <package>