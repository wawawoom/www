import StyleDictionary from "style-dictionary";

/**
 * Format Style Dictionary : génère les classes utilitaires
 * padding (p) et margin (m) à partir des tokens space.
 *
 * Directions : a (all), x (left+right), y (top+bottom), t, b, l, r
 * Exemple : .pa-1, .px-4, .mt-8, .mb-2
 */
StyleDictionary.registerFormat({
  name: "css/spacing-utilities",
  format: ({ dictionary }) => {
    const spaceTokens = dictionary.allTokens.filter(
      (t) => t.path && t.path[0] === "space" && t.path.length >= 2
    );

    if (spaceTokens.length === 0) return "/* No space tokens */";

    const scales = spaceTokens.map((t) => t.path[1]);
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

    const lines = [
      "/**",
      " * Do not edit directly, this file was auto-generated from space tokens.",
      " * Padding (p) and margin (m) utilities.",
      " * Direction: a=all, x=left+right, y=top+bottom, t=top, b=bottom, l=left, r=right",
      " */",
      "",
    ];

    for (const scale of scales) {
      const varRef = `var(--${varPrefix}-${scale})`;
      for (const [prefix, directions] of Object.entries(props)) {
        for (const [dir, prop] of Object.entries(directions)) {
          const className = `.${prefix}${dir}-${scale}`;
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

    return lines.join("\n").trimEnd();
  },
});
