/**
 * Generates libs/wui-rn/src/styles/variables.ts from the same token JSON as
 * Style Dictionary uses for libs/wui/src/styles/variables.css (light theme).
 *
 * Run **after** Style Dictionary in `build:tokens` (SD must run first).
 * Typography enums — `WuiTextSize`, `WuiTextWeight`, `WuiFontFamily`, `WuiTitleAs`,
 * `WuiTitleLook` — come from Style Dictionary (`config.mjs` → platform `typescript`).
 *
 * `wuiTextFontSize` **key order** matches the generated `src/enum/WuiTextSize.ts`
 * (same as enum `WuiTextSize`); **numeric values** still come from
 * `src/tokens/atomic/font.json` → `text.font.size` (px → rounded number).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.join(__dirname, "..");
const tokensRoot = path.join(pkgRoot, "src/tokens");
const wuiRnStyles = path.join(pkgRoot, "../wui-rn/src/styles");

function flattenAtomicColors(doc) {
  const out = {};
  for (const [family, shades] of Object.entries(doc.color)) {
    for (const [shade, node] of Object.entries(shades)) {
      out[`${family}${shade}`] = node.value;
    }
  }
  return out;
}

const COLOR_REF = /^\{color\.([^.]+)\.([^}]+)\}$/;

function flattenColorAliases(doc, atomicKeyToHex) {
  const out = {};
  for (const [aliasName, shades] of Object.entries(doc.colorAlias)) {
    for (const [shade, node] of Object.entries(shades)) {
      const m = node.value.match(COLOR_REF);
      if (!m) {
        throw new Error(
          `generate-wui-rn-variables: unsupported alias "${node.value}" (expected {color.family.scale})`
        );
      }
      const atomicKey = `${m[1]}${m[2]}`;
      const hex = atomicKeyToHex[atomicKey];
      if (hex === undefined) {
        throw new Error(
          `generate-wui-rn-variables: missing atomic "${atomicKey}" for ${aliasName}.${shade}`
        );
      }
      out[`${aliasName}${shade}`] = hex;
    }
  }
  return out;
}

function spacingTokensToNumbers(doc) {
  return Object.fromEntries(
    Object.entries(doc.space).map(([step, { value }]) => [step, Math.round(value)])
  );
}

function sortRecordKeys(o) {
  return Object.keys(o).sort((a, b) => {
    const na = Number(a);
    const nb = Number(b);
    const aNum = String(na) === a && !Number.isNaN(na);
    const bNum = String(nb) === b && !Number.isNaN(nb);
    if (aNum && bNum) return na - nb;
    return a.localeCompare(b);
  });
}

function emitStringRecord(name, obj) {
  const keys = sortRecordKeys(obj);
  const lines = keys.map((k) => {
    const key = /^\d+$/.test(k)
      ? k
      : /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k)
        ? k
        : JSON.stringify(k);
    return `  ${key}: ${JSON.stringify(obj[k])}`;
  });
  return `export const ${name} = {\n${lines.join(",\n")},\n} as Record<string, string>;\n`;
}

function emitNumberRecord(name, obj) {
  const keys = sortRecordKeys(obj);
  const lines = keys.map((k) => {
    const key = /^\d+$/.test(k)
      ? k
      : /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k)
        ? k
        : JSON.stringify(k);
    return `  ${key}: ${obj[k]}`;
  });
  return `export const ${name} = {\n${lines.join(",\n")},\n} as Record<string, number>;\n`;
}

function parsePxToRoundedNumber(value) {
  const s = String(value).trim();
  const m = s.match(/^([\d.]+)px$/i);
  if (!m) {
    throw new Error(
      `generate-wui-rn-variables: expected font size like "12px", got ${JSON.stringify(value)}`
    );
  }
  return Math.round(parseFloat(m[1]));
}

/**
 * Map of text step key → rounded px (dp) from `text.font.size` in font.json.
 */
function buildTextFontSizePxByStepKey(fontDoc) {
  const src = fontDoc.text?.font?.size;
  if (!src || typeof src !== "object") {
    throw new Error(
      "generate-wui-rn-variables: missing text.font.size in src/tokens/atomic/font.json"
    );
  }
  const keys = Object.keys(src);
  if (keys.length === 0) {
    throw new Error(
      "generate-wui-rn-variables: text.font.size must define at least one step"
    );
  }
  const out = {};
  for (const key of keys) {
    const node = src[key];
    if (!node?.value) {
      throw new Error(
        `generate-wui-rn-variables: missing text.font.size.${key} in font.json`
      );
    }
    out[key] = parsePxToRoundedNumber(node.value);
  }
  return out;
}

/**
 * Step keys in the same order as `export enum WuiTextSize` in the file Style Dictionary writes.
 * Keeps `wuiTextFontSize` aligned with `@wawawoom/design-token/enum` → `WuiTextSize`.
 */
function parseWuiTextSizeStepOrderFromGeneratedEnum(enumTsPath) {
  if (!fs.existsSync(enumTsPath)) {
    throw new Error(
      `generate-wui-rn-variables: missing ${enumTsPath}. Run Style Dictionary first (e.g. pnpm --filter @wawawoom/design-token run build:tokens — SD runs before this script).`
    );
  }
  const raw = fs.readFileSync(enumTsPath, "utf8");
  const block = raw.match(/export enum WuiTextSize\s*\{([^}]*)\}/s);
  if (!block) {
    throw new Error(
      `generate-wui-rn-variables: could not parse WuiTextSize enum in ${enumTsPath}`
    );
  }
  const order = [];
  const re = /=\s*"([^"]+)"\s*,?/g;
  let m;
  while ((m = re.exec(block[1])) !== null) {
    order.push(m[1]);
  }
  if (order.length === 0) {
    throw new Error(
      `generate-wui-rn-variables: no members found in WuiTextSize enum (${enumTsPath})`
    );
  }
  return order;
}

function buildWuiTextFontSizeObject(fontDoc, wuiTextSizeEnumPath) {
  const pxByStep = buildTextFontSizePxByStepKey(fontDoc);
  const orderedSteps = parseWuiTextSizeStepOrderFromGeneratedEnum(wuiTextSizeEnumPath);
  const jsonKeys = new Set(Object.keys(pxByStep));
  const enumSteps = new Set(orderedSteps);
  if (jsonKeys.size !== enumSteps.size || ![...jsonKeys].every((k) => enumSteps.has(k))) {
    throw new Error(
      "generate-wui-rn-variables: keys in text.font.size (font.json) must match WuiTextSize enum steps exactly. Run `build:tokens` after editing tokens."
    );
  }
  const wuiTextFontSize = {};
  for (const step of orderedSteps) {
    if (pxByStep[step] === undefined) {
      throw new Error(
        `generate-wui-rn-variables: WuiTextSize has "${step}" but text.font.size.${step} is missing in font.json`
      );
    }
    wuiTextFontSize[step] = pxByStep[step];
  }
  return { wuiTextFontSize, orderedKeys: orderedSteps };
}

/**
 * Map of title step key (h1–h6) → rounded px from `title.font.size` in font.json.
 */
function buildTitleFontSizePxByStepKey(fontDoc) {
  const src = fontDoc.title?.font?.size;
  if (!src || typeof src !== "object") {
    throw new Error(
      "generate-wui-rn-variables: missing title.font.size in src/tokens/atomic/font.json"
    );
  }
  const keys = Object.keys(src);
  if (keys.length === 0) {
    throw new Error(
      "generate-wui-rn-variables: title.font.size must define at least one step"
    );
  }
  const out = {};
  for (const key of keys) {
    const node = src[key];
    if (!node?.value) {
      throw new Error(
        `generate-wui-rn-variables: missing title.font.size.${key} in font.json`
      );
    }
    out[key] = parsePxToRoundedNumber(node.value);
  }
  return out;
}

function parseWuiTitleLookStepOrderFromGeneratedEnum(enumTsPath) {
  if (!fs.existsSync(enumTsPath)) {
    throw new Error(
      `generate-wui-rn-variables: missing ${enumTsPath}. Run Style Dictionary first (e.g. pnpm --filter @wawawoom/design-token run build:tokens).`
    );
  }
  const raw = fs.readFileSync(enumTsPath, "utf8");
  const block = raw.match(/export enum WuiTitleLook\s*\{([^}]*)\}/s);
  if (!block) {
    throw new Error(
      `generate-wui-rn-variables: could not parse WuiTitleLook enum in ${enumTsPath}`
    );
  }
  const order = [];
  const re = /=\s*"([^"]+)"\s*,?/g;
  let m;
  while ((m = re.exec(block[1])) !== null) {
    order.push(m[1]);
  }
  if (order.length === 0) {
    throw new Error(
      `generate-wui-rn-variables: no members found in WuiTitleLook enum (${enumTsPath})`
    );
  }
  return order;
}

function buildWuiTitleFontSizeObject(fontDoc, wuiTitleLookEnumPath) {
  const pxByStep = buildTitleFontSizePxByStepKey(fontDoc);
  const orderedSteps = parseWuiTitleLookStepOrderFromGeneratedEnum(wuiTitleLookEnumPath);
  const jsonKeys = new Set(Object.keys(pxByStep));
  const enumSteps = new Set(orderedSteps);
  if (jsonKeys.size !== enumSteps.size || ![...jsonKeys].every((k) => enumSteps.has(k))) {
    throw new Error(
      "generate-wui-rn-variables: keys in title.font.size (font.json) must match WuiTitleLook enum steps exactly. Run `build:tokens` after editing tokens."
    );
  }
  const wuiTitleFontSize = {};
  for (const step of orderedSteps) {
    if (pxByStep[step] === undefined) {
      throw new Error(
        `generate-wui-rn-variables: WuiTitleLook has "${step}" but title.font.size.${step} is missing in font.json`
      );
    }
    wuiTitleFontSize[step] = pxByStep[step];
  }
  return { wuiTitleFontSize, orderedKeys: orderedSteps };
}

function emitTextFontSizesConst(name, obj, orderedKeys) {
  const lines = orderedKeys.map((k) => {
    if (obj[k] === undefined) {
      throw new Error(`generate-wui-rn-variables: missing key ${k} in ${name}`);
    }
    return `  ${k}: ${obj[k]}`;
  });
  return `export const ${name} = {\n${lines.join(",\n")},\n} satisfies Record<string, number>;\n`;
}

const colorAtomic = JSON.parse(
  fs.readFileSync(path.join(tokensRoot, "atomic/color.json"), "utf8")
);
const colorSemantic = JSON.parse(
  fs.readFileSync(path.join(tokensRoot, "semantic/color.json"), "utf8")
);
const spaceSemantic = JSON.parse(
  fs.readFileSync(path.join(tokensRoot, "semantic/space.json"), "utf8")
);
const fontAtomic = JSON.parse(
  fs.readFileSync(path.join(tokensRoot, "atomic/font.json"), "utf8")
);

const wuiColor = flattenAtomicColors(colorAtomic);
const wuiColorAlias = flattenColorAliases(colorSemantic, wuiColor);
const wuiSpace = spacingTokensToNumbers(spaceSemantic);
const wuiTextSizeEnumPath = path.join(pkgRoot, "src/enum/WuiTextSize.ts");
const { wuiTextFontSize, orderedKeys: wuiTextSizeOrderedKeys } =
  buildWuiTextFontSizeObject(fontAtomic, wuiTextSizeEnumPath);

const wuiTitleLookEnumPath = path.join(pkgRoot, "src/enum/WuiTitleLook.ts");
const { wuiTitleFontSize, orderedKeys: wuiTitleFontSizeOrderedKeys } =
  buildWuiTitleFontSizeObject(fontAtomic, wuiTitleLookEnumPath);

const titleLineHeightRatio = parseFloat(
  String(fontAtomic.title?.lineHeight?.base?.value ?? "")
);
if (!Number.isFinite(titleLineHeightRatio)) {
  throw new Error(
    "generate-wui-rn-variables: invalid or missing title.lineHeight.base in font.json"
  );
}

const lightWeight = String(fontAtomic.font.weight.light.value);
const regularWeight = String(fontAtomic.font.weight.regular.value);
const boldWeight = String(fontAtomic.font.weight.bold.value);
const lineHeightRatio = parseFloat(String(fontAtomic.lineHeight.base.value));
if (!Number.isFinite(lineHeightRatio)) {
  throw new Error("generate-wui-rn-variables: invalid lineHeight.base in font.json");
}

const fileBody = `/**
 * Do not edit directly; this file was auto-generated.
 * Source: libs/design-token/src/tokens (same inputs as libs/wui/src/styles/variables.css).
 * Run: pnpm --filter @wawawoom/design-token run build:tokens
 */

import type { TextStyle } from "react-native";

import {
  WUI_FONT_NEWSREADER_BOLD,
  WUI_FONT_NEWSREADER_LIGHT,
  WUI_FONT_NEWSREADER_REGULAR,
} from "../fonts/wuiFontAssets";

type WuiFontWeightToken = NonNullable<TextStyle["fontWeight"]>;

export type WuiFontConfig = {
  sansSerif: string;
  serifLight: string;
  serifRegular: string;
  serifBold: string;
  lightWeight: WuiFontWeightToken;
  regularWeight: WuiFontWeightToken;
  boldWeight: WuiFontWeightToken;
  lineHeightRatio: number;
};

/** Mirrors \`lineHeight.base\` in \`libs/design-token/src/tokens/atomic/font.json\` (same as \`--wui-line-height-base\` in variables.css). */
export const wuiLineHeightRatio = ${lineHeightRatio};

/** Mirrors \`font.weight.light\` in \`libs/design-token/src/tokens/atomic/font.json\` (same as \`--wui-font-weight-light\` in variables.css). */
export const wuiFontWeightLight = ${JSON.stringify(lightWeight)} as WuiFontWeightToken;
/** Mirrors \`font.weight.regular\` in \`libs/design-token/src/tokens/atomic/font.json\` (same as \`--wui-font-weight-regular\` in variables.css). */
export const wuiFontWeightRegular = ${JSON.stringify(regularWeight)} as WuiFontWeightToken;
/** Mirrors \`font.weight.bold\` in \`libs/design-token/src/tokens/atomic/font.json\` (same as \`--wui-font-weight-bold\` in variables.css). */
export const wuiFontWeightBold = ${JSON.stringify(boldWeight)} as WuiFontWeightToken;

${emitStringRecord("wuiColor", wuiColor)}${emitStringRecord("wuiColorAlias", wuiColorAlias)}${emitNumberRecord("wuiSpace", wuiSpace)}
/** Key order matches \`WuiTextSize\` (Style Dictionary → \`libs/design-token/src/enum/WuiTextSize.ts\`); values from \`text.font.size\` in font.json (px → dp; same as \`--wui-text-font-size-*\` in variables.css). */
${emitTextFontSizesConst("wuiTextFontSize", wuiTextFontSize, wuiTextSizeOrderedKeys)}
/** Key order matches \`WuiTitleLook\` / \`WuiTitleAs\` (Style Dictionary → \`src/enum/WuiTitleLook.ts\`); values from \`title.font.size\` in font.json (px → dp; same as \`--wui-title-font-size-*\` in variables.css). */
${emitTextFontSizesConst("wuiTitleFontSize", wuiTitleFontSize, wuiTitleFontSizeOrderedKeys)}
/** Mirrors \`title.lineHeight.base\` in \`libs/design-token/src/tokens/atomic/font.json\` (same as \`--wui-title-line-height-base\` in variables.css). */
export const wuiTitleLineHeightRatio = ${titleLineHeightRatio};

export type WuiTheme = {
  color: Record<string, string>;
  colorAlias: Record<string, string>;
  space: Record<string, number>;
  textFontSize: typeof wuiTextFontSize;
  titleFontSize: typeof wuiTitleFontSize;
  titleLineHeightRatio: number;
  font: WuiFontConfig;
};

export const wui: WuiTheme = {
  color: wuiColor,
  colorAlias: wuiColorAlias,
  space: wuiSpace,
  textFontSize: wuiTextFontSize,
  titleFontSize: wuiTitleFontSize,
  titleLineHeightRatio: wuiTitleLineHeightRatio,
  font: {
    sansSerif: "Arial",
    serifLight: WUI_FONT_NEWSREADER_LIGHT,
    serifRegular: WUI_FONT_NEWSREADER_REGULAR,
    serifBold: WUI_FONT_NEWSREADER_BOLD,
    lightWeight: wuiFontWeightLight,
    regularWeight: wuiFontWeightRegular,
    boldWeight: wuiFontWeightBold,
    lineHeightRatio: wuiLineHeightRatio,
  },
};
`;

fs.mkdirSync(wuiRnStyles, { recursive: true });
const rnVariablesDest = path.join(wuiRnStyles, "variables.ts");
fs.writeFileSync(rnVariablesDest, fileBody, "utf8");

// Footer is printed by `scripts/build-tokens.mjs` when `WUI_DESIGN_TOKEN_BUILD_QUIET` is set.
if (process.env.WUI_DESIGN_TOKEN_BUILD_QUIET !== "1") {
  const rnVariablesRel = path.relative(pkgRoot, rnVariablesDest).split(path.sep).join("/");
  console.log("");
  console.log("react-native");
  console.log(chalk.bold.green(`✔︎ ${rnVariablesRel}`));
}
