/** First occurrence index of each token path in `allTokens` (preserves merge/source order). */
export function createPathFirstIndexMap(allTokens) {
  const m = new Map();
  for (let i = 0; i < allTokens.length; i++) {
    const t = allTokens[i];
    const p = t.path?.join(".");
    if (p && !m.has(p)) {
      m.set(p, i);
    }
  }
  return m;
}

export function sortTokensBySourceOrder(tokens, firstIndexMap) {
  return [...tokens].sort(
    (a, b) =>
      (firstIndexMap.get(a.path.join(".")) ?? 0) -
      (firstIndexMap.get(b.path.join(".")) ?? 0)
  );
}

/** e.g. sansSerif → SANS_SERIF, serif → SERIF */
export function fontKeyToEnumMemberName(key) {
  return String(key)
    .replace(/([A-Z])/g, "_$1")
    .toUpperCase()
    .replace(/^_/, "");
}

/** Steps under `text.font.size` (WuiTextSize enum value = step key). */
export function getTextFontSizeTokenEntries(dictionary) {
  const first = createPathFirstIndexMap(dictionary.allTokens);
  const tokens = dictionary.allTokens.filter(
    (t) =>
      t.path?.length === 4 &&
      t.path[0] === "text" &&
      t.path[1] === "font" &&
      t.path[2] === "size"
  );
  return sortTokensBySourceOrder(tokens, first).map((t) => {
    const step = t.path[3];
    return {
      enumMember: String(step).toUpperCase(),
      value: step,
    };
  });
}

/** Steps under `title.font.size` (WuiTitleAs / WuiTitleLook enum value = step key, e.g. h1). */
export function getTitleFontSizeTokenEntries(dictionary) {
  const first = createPathFirstIndexMap(dictionary.allTokens);
  const tokens = dictionary.allTokens.filter(
    (t) =>
      t.path?.length === 4 &&
      t.path[0] === "title" &&
      t.path[1] === "font" &&
      t.path[2] === "size"
  );
  return sortTokensBySourceOrder(tokens, first).map((t) => {
    const step = t.path[3];
    return {
      enumMember: String(step).toUpperCase(),
      value: step,
    };
  });
}

/** Keys under `font.weight` (WuiTextWeight). */
export function getFontWeightTokenEntries(dictionary) {
  const first = createPathFirstIndexMap(dictionary.allTokens);
  const tokens = dictionary.allTokens.filter(
    (t) =>
      t.path?.length === 3 &&
      t.path[0] === "font" &&
      t.path[1] === "weight"
  );
  return sortTokensBySourceOrder(tokens, first).map((t) => {
    const key = t.path[2];
    return {
      enumMember: String(key).toUpperCase(),
      value: key,
    };
  });
}

/** `font.*` leaves with type fontFamily (WuiFontFamily). */
export function getFontFamilyTokenEntries(dictionary) {
  const first = createPathFirstIndexMap(dictionary.allTokens);
  const tokens = dictionary.allTokens.filter((t) => {
    if (t.path?.length !== 2 || t.path[0] !== "font") {
      return false;
    }
    const tokenType = t.type ?? t.$type;
    return tokenType === "fontFamily";
  });
  return sortTokensBySourceOrder(tokens, first).map((t) => {
    const key = t.path[1];
    return {
      enumMember: fontKeyToEnumMemberName(key),
      value: key,
    };
  });
}

/** Collect color-related tokens for enum generation. */
export function getColorEntries(dictionary, tokenName, valueExtractor) {
  const colorTokens = dictionary.allTokens.filter(
    (token) =>
      token.path && token.path[0] === tokenName && token.path.length >= 3
  );

  const entries = [];
  const processed = new Set();

  colorTokens.forEach((token) => {
    // path e.g. ["color", "neutral", "0"]
    const colorName = token.path[1];
    const shade = token.path[2].trim();
    const enumKey = `${colorName.toUpperCase()}_${shade.toUpperCase()}`;
    const key = `${colorName}-${shade}`;

    if (!processed.has(key)) {
      processed.add(key);
      const value = valueExtractor(token, colorName, shade);
      entries.push({ key: enumKey, value, colorName, shade });
    }
  });

  entries.sort((a, b) => {
    if (a.colorName !== b.colorName) {
      return a.colorName.localeCompare(b.colorName);
    }
    const numA = parseInt(a.shade) || 0;
    const numB = parseInt(b.shade) || 0;
    return numA - numB;
  });

  return entries;
}
