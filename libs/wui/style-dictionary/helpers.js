// Fonction helper pour extraire et traiter les tokens de couleur
export function getColorEntries(dictionary, valueExtractor) {
  // Accéder aux tokens de couleur depuis la structure transformée
  const colorTokens = dictionary.allTokens.filter(
    (token) =>
      token.path && token.path[0] === "color" && token.path.length >= 3
  );

  const entries = [];
  const processed = new Set();

  // Parcourir tous les tokens de couleur
  colorTokens.forEach((token) => {
    // Structure du path: ["color", "neutral", "0"]
    const colorName = token.path[1]; // "neutral", "green", etc.
    const shade = token.path[2].trim(); // "0", "100", etc.
    const enumKey = `${colorName.toUpperCase()}_${shade.toUpperCase()}`;
    const key = `${colorName}-${shade}`;

    // Éviter les doublons
    if (!processed.has(key)) {
      processed.add(key);
      const value = valueExtractor(token, colorName, shade);
      entries.push({ key: enumKey, value, colorName, shade });
    }
  });

  // Trier: d'abord par nom de couleur, puis par nuance (numérique)
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
