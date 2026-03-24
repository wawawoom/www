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
