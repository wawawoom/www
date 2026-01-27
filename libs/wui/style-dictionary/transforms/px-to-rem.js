import StyleDictionary from "style-dictionary";

const baseFontSize = 16;

StyleDictionary.registerTransform({
  name: "size/px-to-rem",
  type: "value",
  transitive: false,
  matcher: (token) => {
    // Ne pas transformer font.size.base - il doit rester en px
    if (
      token.path &&
      token.path.length >= 3 &&
      token.path[0] === "font" &&
      token.path[1] === "size" &&
      token.path[2] === "base"
    ) {
      return false;
    }

    // Vérifier que la valeur est en px
    if (typeof token.value !== "string" || !token.value.endsWith("px")) {
      return false;
    }

    // Vérifier l'attribut extensions.transform dans le token original
    const transformValue =
      token.original?.extensions?.transform ||
      token.$extensions?.transform ||
      token.extensions?.transform;

    // Retourner true uniquement si extensions.transform === "px-to-rem"
    return transformValue === "px-to-rem";
  },
  transform: (token, options) => {
    // Double vérification : s'assurer que le token a bien extensions.transform
    const transformValue =
      token.original?.extensions?.transform ||
      token.$extensions?.transform ||
      token.extensions?.transform;

    if (transformValue !== "px-to-rem") {
      return token.value;
    }

    const px = parseFloat(token.value);
    if (isNaN(px)) {
      return token.value;
    }

    // Round 3 decimals to avoid precision errors
    const result = px / baseFontSize;
    return `${Math.round(result * 1000) / 1000}rem`;
  },
});
