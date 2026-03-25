/**
 * Runs Style Dictionary (main + dark) and RN variable generation, then prints one
 * consolidated success log (single `css` section with all CSS outputs).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import StyleDictionary from "style-dictionary";
import { logVerbosityLevels } from "style-dictionary/enums";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.join(__dirname, "..");
const { silent } = logVerbosityLevels;

/** Keep in sync with `config.mjs` → `platforms.typescript.files`. */
const TYPESCRIPT_ENUM_FILES = [
  "WuiColorName.ts",
  "WuiColorValue.ts",
  "WuiColorAlias.ts",
  "WuiTextSize.ts",
  "WuiTextWeight.ts",
  "WuiFontFamily.ts",
  "WuiTitleAs.ts",
  "WuiTitleLook.ts",
];

const CSS_OUTPUTS = [
  "../wui/src/styles/variables.css",
  "../wui/src/styles/utils.css",
  "../wui/src/styles/variables-dark.css",
];

function printPlatformSuccess(platformLabel, relativePaths) {
  console.log("");
  console.log(platformLabel);
  for (const rel of relativePaths) {
    console.log(chalk.bold.green(`✔︎ ${rel}`));
  }
}

async function main() {
  const sdMain = new StyleDictionary(path.join(pkgRoot, "config.mjs"), {
    verbosity: silent,
  });
  await sdMain.buildAllPlatforms();

  const sdDark = new StyleDictionary(path.join(pkgRoot, "config-dark.mjs"), {
    verbosity: silent,
  });
  await sdDark.buildAllPlatforms();

  process.env.WUI_DESIGN_TOKEN_BUILD_QUIET = "1";
  await import("./generate-wui-rn-variables.mjs");

  const tsPaths = TYPESCRIPT_ENUM_FILES.map((f) => `src/enum/${f}`);
  printPlatformSuccess("typescript", tsPaths);
  printPlatformSuccess("css", CSS_OUTPUTS);

  const rnRel = path
    .relative(pkgRoot, path.join(pkgRoot, "../wui-rn/src/styles/variables.ts"))
    .split(path.sep)
    .join("/");
  printPlatformSuccess("react-native", [rnRel]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
