import { useTranslation } from "react-i18next";
import { WuiLink, WuiLinkColor, WuiLinkSize } from "@wawawoom/wui";

import "./SocialLinks.css";

const SocialLinks = () => {
  const { t } = useTranslation();
  return (
    <p className="links">
      <WuiLink
        href="https://www.linkedin.com/in/nicolas-payrouse-3016094/"
        target="_blank"
        size={WuiLinkSize.L}
        color={WuiLinkColor.NONE}
        title={t("footer.linkedinTitle")}
      >
        <i className="fa-brands fa-linkedin"></i>
      </WuiLink>

      <WuiLink
        href="https://github.com/wawawoom"
        target="_blank"
        size={WuiLinkSize.L}
        color={WuiLinkColor.NONE}
        title={t("footer.githubTitle")}
      >
        <i className="fa-brands fa-github"></i>
      </WuiLink>

      <WuiLink
        href="mailto:wawawoom@gmail.com"
        target="_blank"
        size={WuiLinkSize.L}
        color={WuiLinkColor.NONE}
        title={t("footer.emailTitle")}
      >
        <i className="fa-solid fa-envelope"></i>
      </WuiLink>

      <WuiLink
        href="tel:+33631796781"
        target="_blank"
        size={WuiLinkSize.L}
        color={WuiLinkColor.NONE}
        title={t("footer.phoneTitle")}
      >
        <i className="fa-solid fa-mobile-screen-button"></i>
      </WuiLink>
    </p>
  );
};

export default SocialLinks;
