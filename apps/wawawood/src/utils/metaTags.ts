/**
 * Open Graph / Twitter meta helpers (client-side).
 * Note: crawlers that do not execute JS only see index.html defaults.
 */

function escapeAttr(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function ensureMetaAttribute(
  selector: string,
  create: () => HTMLMetaElement,
): HTMLMetaElement {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) {
    return existing;
  }
  const el = create();
  document.head.appendChild(el);
  return el;
}

export function setMetaProperty(property: string, content: string): void {
  const el = ensureMetaAttribute(
    `meta[property="${escapeAttr(property)}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute("property", property);
      return m;
    },
  );
  el.setAttribute("content", content);
}

export function setMetaName(name: string, content: string): void {
  const el = ensureMetaAttribute(
    `meta[name="${escapeAttr(name)}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute("name", name);
      return m;
    },
  );
  el.setAttribute("content", content);
}

export function setLinkRel(rel: string, href: string): void {
  const selector = `link[rel="${escapeAttr(rel)}"]`;
  const existing = document.head.querySelector<HTMLLinkElement>(selector);
  const el =
    existing ??
    (() => {
      const l = document.createElement("link");
      l.setAttribute("rel", rel);
      document.head.appendChild(l);
      return l;
    })();
  el.setAttribute("href", href);
}
