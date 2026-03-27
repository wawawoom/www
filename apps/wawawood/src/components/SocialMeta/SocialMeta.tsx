import { useEffect } from "react";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_PAGE_TITLE_FULL,
  SITE_NAME,
} from "../../constants/social";
import type Lamp from "../../interface/lamp.interface";
import {
  setLinkRel,
  setMetaName,
  setMetaProperty,
} from "../../utils/metaTags";
import { getCanonicalPageUrl, toAbsoluteUrl } from "../../utils/siteUrl";

const OG_DESCRIPTION_MAX = 300;

function truncateDescription(text: string): string {
  const t = text.trim();
  if (t.length <= OG_DESCRIPTION_MAX) {
    return t;
  }
  return `${t.slice(0, OG_DESCRIPTION_MAX - 1).trim()}…`;
}

interface SocialMetaProps {
  lamp: Lamp | null;
}

const SocialMeta = ({ lamp }: SocialMetaProps) => {
  useEffect(() => {
    const canonical = getCanonicalPageUrl();
    const defaultImage = toAbsoluteUrl("logo.png");

    const title = lamp
      ? `${lamp.name} — ${SITE_NAME}`
      : DEFAULT_PAGE_TITLE_FULL;
    const description = lamp
      ? truncateDescription(lamp.description ?? DEFAULT_DESCRIPTION)
      : DEFAULT_DESCRIPTION;
    const image =
      lamp?.images?.[0] != null ? toAbsoluteUrl(lamp.images[0]) : defaultImage;

    document.title = title;

    setMetaProperty("og:type", lamp ? "article" : "website");
    setMetaProperty("og:site_name", SITE_NAME);
    setMetaProperty("og:title", title);
    setMetaProperty("og:description", description);
    setMetaProperty("og:url", canonical);
    setMetaProperty("og:image", image);
    setMetaProperty("og:locale", "fr_FR");

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
