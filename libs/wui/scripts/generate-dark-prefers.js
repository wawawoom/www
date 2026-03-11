/**
 * Génère variables-dark-prefers.css à partir de variables-dark.css.
 * Applique les variables dark quand le navigateur préfère le dark ET qu'aucun data-theme n'est défini.
 * À exécuter après le build Style Dictionary (variables-dark.css doit exister).
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "src/styles/variables-dark.css");
const dest = path.join(root, "src/styles/variables-dark-prefers.css");

const content = readFileSync(src, "utf-8");

// Extraire le bloc des variables (entre la première { et la dernière })
const start = content.indexOf("{\n") + 2;
const end = content.lastIndexOf("\n}");
const inner = content.slice(start, end);
const indented = inner
  .split("\n")
  .map((line) => "  " + line)
  .join("\n");

const output = `/**
 * Do not edit directly, this file was auto-generated from variables-dark.css.
 * Dark theme when browser prefers dark and no data-theme is set on <html>.
 */

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
${indented}
  }
}
`;

writeFileSync(dest, output, "utf-8");

console.log("Generated", dest);
