kill $(lsof -tiTCP:8081 -sTCP:LISTEN)

-

Après avoir ajouté / déplacé des fichiers \*.stories.tsx :
cd libs/wui-rn
pnpm run storybook-generate

-

pnpm run storybook-generate # si Metro ne régénère pas tout seul
pnpm start -- --clear
pnpm run storybook-generate && pnpm start -- --clear
