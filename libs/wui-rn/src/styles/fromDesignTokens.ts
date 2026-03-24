export type AtomicColorDoc = {
  color: Record<string, Record<string, { value: string }>>;
};

export type SemanticColorAliasDoc = {
  colorAlias: Record<string, Record<string, { value: string }>>;
};

export type SemanticSpaceDoc = {
  space: Record<string, { value: number; type?: string }>;
};

/** Build `wui.space` from `space.json` (numeric px → RN dp). */
export function spacingTokensToNumbers(
  doc: SemanticSpaceDoc
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(doc.space).map(([step, { value }]) => [
      step,
      Math.round(value),
    ])
  );
}

/**
 * Flatten atomic palette tokens to RN `wui.color` keys (e.g. black + 100 → black100).
 */
export function flattenAtomicColors(
  doc: AtomicColorDoc
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [family, shades] of Object.entries(doc.color)) {
    for (const [shade, node] of Object.entries(shades)) {
      out[`${family}${shade}`] = node.value;
    }
  }
  return out;
}

const COLOR_REF = /^\{color\.([^.]+)\.([^}]+)\}$/;

/**
 * Resolve semantic aliases that reference `{color.family.scale}` against the atomic map.
 */
export function flattenColorAliases(
  doc: SemanticColorAliasDoc,
  atomicKeyToHex: Record<string, string>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [aliasName, shades] of Object.entries(doc.colorAlias)) {
    for (const [shade, node] of Object.entries(shades)) {
      const m = node.value.match(COLOR_REF);
      if (!m) {
        throw new Error(
          `wui-rn: unsupported color alias reference "${node.value}" (expected {color.family.scale})`
        );
      }
      const atomicKey = `${m[1]}${m[2]}`;
      const hex = atomicKeyToHex[atomicKey];
      if (hex === undefined) {
        throw new Error(
          `wui-rn: missing atomic color "${atomicKey}" for alias ${aliasName}.${shade}`
        );
      }
      out[`${aliasName}${shade}`] = hex;
    }
  }
  return out;
}
