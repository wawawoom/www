/**
 * After `vite build`, generates dist/project/<slug>/index.html with lamp-specific OG
 * meta so crawlers (Facebook, etc.) see correct tags without executing JS.
 * Keep SITE_* / copy logic aligned with src/constants/social.ts and SocialMeta.tsx.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const dbPath = path.join(root, "public", "db", "db.json");

const SITE_ORIGIN = "https://wawawoom.fr";
const BASE_PATH = "/projects/wawawood";
const SITE_NAME = "WaWaWooD";
const DEFAULT_DESC =
  "Lampes artisanales en bois et résine, créations uniques à Nice.";
const OG_DESC_MAX = 300;

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function truncateDescription(text) {
  const t = (text ?? "").trim();
  if (t.length <= OG_DESC_MAX) {
    return t || DEFAULT_DESC;
  }
  return `${t.slice(0, OG_DESC_MAX - 1).trim()}…`;
}

function toAbsoluteImage(url) {
  if (!url) {
    return `${SITE_ORIGIN}${BASE_PATH}/logo.png`;
  }
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//")
  ) {
    return url.startsWith("//") ? `https:${url}` : url;
  }
  const p = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_ORIGIN}${BASE_PATH}${p}`;
}

function injectProjectOg(html, { title, description, canonical, image }) {
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

  out = out.replace(
    /<meta\s*\n\s*name="description"[\s\S]*?\/>/,
    `    <meta\n      name="description"\n      content="${escapeAttr(description)}"\n    />`,
  );

  out = out.replace(
    /<meta property="og:type" content="website" \/>/,
    `<meta property="og:type" content="article" />`,
  );

  out = out.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
  );

  out = out.replace(
    /<meta\s*\n\s*property="og:description"[\s\S]*?\/>/,
    `    <meta\n      property="og:description"\n      content="${escapeAttr(description)}"\n    />`,
  );

  out = out.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
  );

  out = out.replace(
    /<meta\s*\n\s*property="og:image"[\s\S]*?\/>/,
    `    <meta\n      property="og:image"\n      content="${escapeAttr(image)}"\n    />`,
  );

  out = out.replace(
    /<meta\s*\n\s*name="twitter:title"[\s\S]*?\/>/,
    `    <meta\n      name="twitter:title"\n      content="${escapeAttr(title)}"\n    />`,
  );

  out = out.replace(
    /<meta\s*\n\s*name="twitter:description"[\s\S]*?\/>/,
    `    <meta\n      name="twitter:description"\n      content="${escapeAttr(description)}"\n    />\n    <meta\n      name="twitter:image"\n      content="${escapeAttr(image)}"\n    />`,
  );

  if (!out.includes('rel="canonical"')) {
    out = out.replace(
      "</head>",
      `    <link rel="canonical" href="${escapeAttr(canonical)}" />\n  </head>`,
    );
  }

  return out;
}

const templatePath = path.join(distDir, "index.html");
if (!fs.existsSync(templatePath)) {
  console.error("generate-project-html: dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");
const lamps = JSON.parse(fs.readFileSync(dbPath, "utf8"));

if (!Array.isArray(lamps)) {
  console.error("generate-project-html: db.json must be an array.");
  process.exit(1);
}

for (const lamp of lamps) {
  if (!lamp?.slug) {
    continue;
  }

  const title = `${lamp.name} — ${SITE_NAME}`;
  const description = truncateDescription(lamp.description ?? DEFAULT_DESC);
  const canonical = `${SITE_ORIGIN}${BASE_PATH}/project/${lamp.slug}`;
  const image = toAbsoluteImage(lamp.images?.[0]);

  const html = injectProjectOg(template, {
    title,
    description,
    canonical,
    image,
  });

  const outDir = path.join(distDir, "project", lamp.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
  console.log(`OG HTML: project/${lamp.slug}/index.html`);
}

console.log(`generate-project-html: wrote ${lamps.filter((l) => l?.slug).length} file(s).`);
