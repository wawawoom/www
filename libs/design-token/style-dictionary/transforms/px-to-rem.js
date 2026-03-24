import StyleDictionary from "style-dictionary";

const baseFontSize = 16;

StyleDictionary.registerTransform({
  name: "size/px-to-rem",
  type: "value",
  transitive: false,
  matcher: (token) => {
    // Keep font.size.base in px
    if (
      token.path &&
      token.path.length >= 3 &&
      token.path[0] === "font" &&
      token.path[1] === "size" &&
      token.path[2] === "base"
    ) {
      return false;
    }

    if (typeof token.value !== "string" || !token.value.endsWith("px")) {
      return false;
    }

    const transformValue =
      token.original?.extensions?.transform ||
      token.$extensions?.transform ||
      token.extensions?.transform;

    return transformValue === "px-to-rem";
  },
  transform: (token, options) => {
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
