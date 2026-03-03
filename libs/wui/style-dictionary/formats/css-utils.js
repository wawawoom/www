import StyleDictionary from "style-dictionary";

/**
 * Format Style Dictionary : génère utils.css avec
 * 1) classes utilitaires couleur (bg-*, color-*) à partir des tokens color (atomic)
 * 2) classes utilitaires spacing (p, m) à partir des tokens space
 */
StyleDictionary.registerFormat({
  name: "css/utils",
  format: ({ dictionary }) => {
    const lines = [
      "/**",
      " * Do not edit directly, this file was auto-generated from tokens.",
      " * Color utilities: .wui-bg-{name}-{scale}, .wui-color-{name}-{scale}",
      " * Spacing: .wui-p{a|x|y|t|b|l|r}-{scale}, .wui-m{a|x|y|t|b|l|r}-{scale}",
      " */",
      "",
    ];

    // ---- Color utilities (from atomic color tokens) ----
    const colorTokens = dictionary.allTokens.filter(
      (t) =>
        t.path &&
        t.path[0] === "color" &&
        t.path.length === 3 &&
        t.path[1] !== "alias"
    );

    const colorPairs = new Map();
    for (const t of colorTokens) {
      const name = t.path[1];
      const scale = t.path[2];
      if (!colorPairs.has(name)) colorPairs.set(name, new Set());
      colorPairs.get(name).add(scale);
    }

    if (colorPairs.size > 0) {
      lines.push("/* Color utilities (background-color, color) */");
      lines.push("");
      const varPrefix = "wui-color";
      for (const [name, scales] of colorPairs) {
        for (const scale of [...scales].sort((a, b) => Number(a) - Number(b))) {
          const varRef = `var(--${varPrefix}-${name}-${scale})`;
          lines.push(
            `.wui-bg-${name}-${scale} { background-color: ${varRef} !important; }`
          );
          lines.push(
            `.wui-color-${name}-${scale} { color: ${varRef} !important; }`
          );
          lines.push("");
        }
      }
      lines.push("");
    }

    // ---- Spacing utilities (from space tokens) ----
    const spaceTokens = dictionary.allTokens.filter(
      (t) => t.path && t.path[0] === "space" && t.path.length >= 2
    );

    if (spaceTokens.length > 0) {
      const scales = [...new Set(spaceTokens.map((t) => t.path[1]))].sort(
        (a, b) => Number(a) - Number(b)
      );
      const varPrefix = "wui-space";
      const props = {
        p: {
          a: "padding",
          x: ["padding-left", "padding-right"],
          y: ["padding-top", "padding-bottom"],
          t: "padding-top",
          b: "padding-bottom",
          l: "padding-left",
          r: "padding-right",
        },
        m: {
          a: "margin",
          x: ["margin-left", "margin-right"],
          y: ["margin-top", "margin-bottom"],
          t: "margin-top",
          b: "margin-bottom",
          l: "margin-left",
          r: "margin-right",
        },
      };

      lines.push("/* Spacing utilities (padding, margin) */");
      lines.push("");
      for (const scale of scales) {
        const varRef = `var(--${varPrefix}-${scale})`;

        for (const [prefix, directions] of Object.entries(props)) {
          for (const [dir, prop] of Object.entries(directions)) {
            const className = `.wui-${prefix}${dir}-${scale}`;

            if (Array.isArray(prop)) {
              const decls = prop
                .map((p) => `  ${p}: ${varRef} !important;`)
                .join("\n");
              lines.push(`${className} {\n${decls}\n}`);
            } else {
              lines.push(`${className} { ${prop}: ${varRef} !important; }`);
            }
            lines.push("");
          }
        }
      }
    }

    return lines.join("\n").trimEnd();
  },
});
