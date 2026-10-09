import { useEffect } from "react";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_PAGE_TITLE_FULL,
  SITE_NAME,
} from "../../constants/social";
import type Lamp from "../../interface/lamp.interface";
import {
  getLampDescription,
  getLampPageUrl,
  getLampPlainName,
  getLampTitle,
  isLampInStock,
} from "../../utils/lampMeta";
import {
  removeMetaProperty,
  setLinkRel,
  setMetaName,
  setMetaProperty,
} from "../../utils/metaTags";
import { getCanonicalPageUrl, toAbsoluteUrl } from "../../utils/siteUrl";

/** Product tags (Pinterest Rich Pin / Facebook), set only on a lamp page. */
const PRODUCT_META_PROPERTIES = [
  "product:brand",
  "product:condition",
  "product:price:amount",
  "product:price:currency",
  "og:availability",
  "og:image:alt",
];

interface SocialMetaProps {
  lamp: Lamp | null;
}

const SocialMeta = ({ lamp }: SocialMetaProps) => {
  useEffect(() => {
    const canonical = lamp ? getLampPageUrl(lamp) : getCanonicalPageUrl();
    const defaultImage = toAbsoluteUrl("logo.png");

    const title = lamp ? getLampTitle(lamp) : DEFAULT_PAGE_TITLE_FULL;
    const description = lamp ? getLampDescription(lamp) : DEFAULT_DESCRIPTION;
    const image =
      lamp?.images?.[0] != null ? toAbsoluteUrl(lamp.images[0]) : defaultImage;

    document.title = title;

    setMetaProperty("og:type", lamp ? "product" : "website");
    setMetaProperty("og:site_name", SITE_NAME);
    setMetaProperty("og:title", title);
    setMetaProperty("og:description", description);
    setMetaProperty("og:url", canonical);
    setMetaProperty("og:image", image);
    setMetaProperty("og:locale", "fr_FR");

    PRODUCT_META_PROPERTIES.forEach(removeMetaProperty);
    if (lamp) {
      setMetaProperty(
        "og:image:alt",
        `${getLampPlainName(lamp)} — lampe en bois artisanale`
      );
      setMetaProperty("product:brand", SITE_NAME);
      setMetaProperty("product:condition", "new");
      setMetaProperty(
        "og:availability",
        isLampInStock(lamp) ? "instock" : "oos"
      );
      if (lamp.price && lamp.price > 0) {
        setMetaProperty("product:price:amount", String(lamp.price));
        setMetaProperty("product:price:currency", "EUR");
      }
    }

    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", title);
    setMetaName("twitter:description", description);
    setMetaName("twitter:image", image);

    setMetaName("description", description);

    if (canonical) {
      setLinkRel("canonical", canonical);
    }
  }, [lamp]);

  return null;
};

export default SocialMeta;
