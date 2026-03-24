import StyleDictionary from "style-dictionary";

/**
 * Spacing tokens use numeric pixel values in JSON; CSS variables need a length unit.
 */
StyleDictionary.registerTransform({
  name: "size/spacing-number-to-px",
  type: "value",
  transitive: false,
  matcher: (token) =>
    token.type === "spacing" ||
    (Array.isArray(token.path) && token.path[0] === "space"),
  transform: (token) => {
    const v = token.value;
    if (v === 0) {
      return "0";
    }
    if (typeof v === "number" && Number.isFinite(v)) {
      return `${Math.round(v)}px`;
    }
    throw new Error(
      `spacing token "${token.path?.join(".")}" must be a finite number (px), got ${JSON.stringify(v)}`
    );
  },
});
