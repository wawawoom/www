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

function stripHtml(s) {
  return String(s ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Lamp name without emoji, for search-friendly titles (Pinterest, Google). */
function plainName(name) {
  return String(name ?? "")
    .replace(/[\p{Extended_Pictographic}️‍]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildDescription(lamp) {
  const text = [lamp.description, stripHtml(lamp.details)]
    .filter(Boolean)
    .join(" ");
  return truncateDescription(stripHtml(text) || DEFAULT_DESC);
}

function isInStock(lamp) {
  return lamp.availability !== "sold";
}

/** JSON inside <script>: escape "</" so content can't close the tag. */
function toScriptJson(value) {
  return JSON.stringify(value).replace(/<\//g, "<\\/");
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

function injectProjectOg(
  html,
  { title, description, canonical, image, imageAlt, productMeta, jsonLd, staticContent },
) {
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

  out = out.replace(
    /<meta\s*\n\s*name="description"[\s\S]*?\/>/,
    `    <meta\n      name="description"\n      content="${escapeAttr(description)}"\n    />`,
  );

  out = out.replace(
    /<meta property="og:type" content="website" \/>/,
    `<meta property="og:type" content="product" />`,
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
    `    <meta\n      property="og:image"\n      content="${escapeAttr(image)}"\n    />\n    <meta property="og:image:alt" content="${escapeAttr(imageAlt)}" />`,
  );

  // Product Rich Pin (Pinterest) / product tags (Facebook)
  out = out.replace(
    /<meta property="og:locale" content="fr_FR" \/>/,
    (match) =>
      [
        match,
        ...Object.entries(productMeta).map(
          ([property, content]) =>
            `    <meta property="${property}" content="${escapeAttr(content)}" />`,
        ),
      ].join("\n"),
  );

  out = out.replace(
    /<meta\s*\n\s*name="twitter:title"[\s\S]*?\/>/,
    `    <meta\n      name="twitter:title"\n      content="${escapeAttr(title)}"\n    />`,
  );

  out = out.replace(
    /<meta\s*\n\s*name="twitter:description"[\s\S]*?\/>/,
    `    <meta\n      name="twitter:description"\n      content="${escapeAttr(description)}"\n    />\n    <meta\n      name="twitter:image"\n      content="${escapeAttr(image)}"\n    />`,
  );

  out = out.replace(
    "</head>",
    `    <script type="application/ld+json">${toScriptJson(jsonLd)}</script>\n  </head>`,
  );

  if (!out.includes('rel="canonical"')) {
    out = out.replace(
      "</head>",
      `    <link rel="canonical" href="${escapeAttr(canonical)}" />\n  </head>`,
    );
  }

  // Crawlable content for bots that don't run JS (Pinterest image picker, Google).
  // React's createRoot replaces it on mount.
  out = out.replace('<div id="root"></div>', `<div id="root">${staticContent}</div>`);

  return out;
}

/** Visually hidden so it never flashes before React mounts, but stays in the HTML. */
const STATIC_CONTENT_STYLE =
  "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap";
const STATIC_IMAGES_MAX = 4;

function buildStaticContent({ name, description, pinImage, images }) {
  const imgs = [pinImage, ...images.slice(0, STATIC_IMAGES_MAX)]
    .filter((src, i, all) => src && all.indexOf(src) === i)
    .map(
      (src, i) =>
        `<img src="${escapeAttr(src)}" alt="${escapeAttr(`${name} — lampe en bois artisanale, vue ${i + 1}`)}" />`,
    )
    .join("");
  return `<article style="${STATIC_CONTENT_STYLE}"><h1>${escapeHtml(name)}</h1><p>${escapeHtml(description)}</p>${imgs}</article>`;
}

function buildJsonLd(lamp, { name, description, canonical, pinImage, images }) {
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: [...new Set([pinImage, ...images].filter(Boolean))],
    sku: lamp.slug,
    url: canonical,
    brand: { "@type": "Brand", name: SITE_NAME },
  };
  if (lamp.price > 0) {
    product.offers = {
      "@type": "Offer",
      url: canonical,
      price: String(lamp.price),
      priceCurrency: "EUR",
      availability: isInStock(lamp)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    };
  }
  return product;
}

function buildProductMeta(lamp) {
  const meta = {
    "product:brand": SITE_NAME,
    "product:condition": "new",
    "og:availability": isInStock(lamp) ? "instock" : "oos",
  };
  if (lamp.price > 0) {
    meta["product:price:amount"] = String(lamp.price);
    meta["product:price:currency"] = "EUR";
  }
  return meta;
}

// Pinterest catalog (data source): https://help.pinterest.com/fr/business/article/data-source-specifications
// Same columns and order as Pinterest's sample feed (pinterest_product_sample_csv_feed.csv).
// Apparel-only columns (gender, age_group, size, size_type) stay empty.
const CATALOG_COLUMNS = [
  "id",
  "item_group_id",
  "title",
  "description",
  "link",
  "image_link",
  "price",
  "availability",
  "condition",
  "google_product_category",
  "product_type",
  "additional_image_link",
  "sale_price",
  "brand",
  "gender",
  "age_group",
  "size",
  "size_type",
  "shipping",
  "custom_label_0",
  "adwords_redirect",
];
const CATALOG_ADDITIONAL_IMAGES_MAX = 10;

/** Every field quoted, like the sample feed. */
function toCsvField(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function buildCatalogRow(lamp, { title, description, canonical, image, pinImage, images }) {
  const mainImage = pinImage ?? image;
  return {
    id: lamp.slug,
    title,
    description,
    link: canonical,
    image_link: mainImage,
    // Currency is set on the Pinterest data source (EUR), as in the sample.
    price: Number(lamp.price).toFixed(2),
    availability: isInStock(lamp) ? "in stock" : "out of stock",
    condition: "new",
    google_product_category: "Home & Garden > Lighting > Lamps",
    product_type: "Luminaires > Lampes en bois artisanales",
    additional_image_link: images
      .filter((src) => src !== mainImage)
      .slice(0, CATALOG_ADDITIONAL_IMAGES_MAX)
      .join(","),
    brand: SITE_NAME,
    custom_label_0: lamp.tags?.[0] ?? "",
    adwords_redirect: `${canonical}?utm_source=pinterest&utm_medium=shopping&utm_campaign=catalog`,
  };
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

const sitemapEntries = [{ loc: `${SITE_ORIGIN}${BASE_PATH}/`, images: [] }];
const catalogRows = [];

for (const lamp of lamps) {
  if (!lamp?.slug) {
    continue;
  }

  const name = plainName(lamp.name);
  const title = `${name} — Lampe artisanale en bois | ${SITE_NAME}`;
  const description = buildDescription(lamp);
  const canonical = `${SITE_ORIGIN}${BASE_PATH}/project/${lamp.slug}/`;
  const image = toAbsoluteImage(lamp.images?.[0]);
  const images = (lamp.images ?? []).map(toAbsoluteImage);
  const pinImage = lamp.pinImage ? toAbsoluteImage(lamp.pinImage) : null;
  const ctx = { name, description, canonical, pinImage, images };

  const html = injectProjectOg(template, {
    title,
    description,
    canonical,
    image,
    imageAlt: `${name} — lampe en bois artisanale`,
    productMeta: buildProductMeta(lamp),
    jsonLd: buildJsonLd(lamp, ctx),
    staticContent: buildStaticContent(ctx),
  });

  const outDir = path.join(distDir, "project", lamp.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
  console.log(`OG HTML: project/${lamp.slug}/index.html`);

  if (lamp.price > 0) {
    catalogRows.push(buildCatalogRow(lamp, { ...ctx, title, image }));
  }

  sitemapEntries.push({
    loc: canonical,
    images: [...new Set([pinImage, ...images].filter(Boolean))],
  });
}

console.log(`generate-project-html: wrote ${lamps.filter((l) => l?.slug).length} file(s).`);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...sitemapEntries.map(({ loc, images }) =>
    [
      "  <url>",
      `    <loc>${escapeHtml(loc)}</loc>`,
      ...images.map(
        (src) => `    <image:image><image:loc>${escapeHtml(src)}</image:loc></image:image>`,
      ),
      "  </url>",
    ].join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
console.log(`generate-project-html: wrote sitemap.xml (${sitemapEntries.length} URL(s)).`);

const catalog = [
  CATALOG_COLUMNS.map(toCsvField).join(","),
  ...catalogRows.map((row) => CATALOG_COLUMNS.map((col) => toCsvField(row[col])).join(",")),
  "",
].join("\n");

fs.writeFileSync(path.join(distDir, "pinterest-catalog.csv"), catalog, "utf8");
console.log(`generate-project-html: wrote pinterest-catalog.csv (${catalogRows.length} product(s)).`);
