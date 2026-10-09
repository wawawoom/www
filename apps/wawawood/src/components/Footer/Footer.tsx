import {
  WuiColorAlias,
  WuiLink,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import {
  PINTEREST_COLOR,
  PINTEREST_URL,
  WHATSAPP_NUMBER,
} from "../../constants/social";
import PinterestIcon from "../PinterestIcon/PinterestIcon";
import WhatsAppIcon from "../WhatsAppIcon/WhatsAppIcon";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <WuiTitle
          as={WuiTitleAs.H3}
          look={WuiTitleLook.H6}
          color={WuiColorAlias.NEUTRAL_0}
        >
          Contact
        </WuiTitle>

        <div className="footer-contact">
          <WuiLink
            href="https://www.instagram.com/wawawoodstudio/"
            target="_blank"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={`${import.meta.env.BASE_URL}instagram.png`}
              alt="Instagram"
              width={20}
              height={20}
              style={{ display: "inline-block", marginRight: 10 }}
            />{" "}
            Instagram
          </WuiLink>

          <WuiLink
            href={PINTEREST_URL}
            target="_blank"
            rel="noreferrer"
            style={{ display: "flex", alignItems: "center" }}
          >
            <PinterestIcon
              width={20}
              height={20}
              color={PINTEREST_COLOR}
              style={{ display: "inline-block", marginRight: 10 }}
            />{" "}
            Pinterest
          </WuiLink>

          <WuiLink
            href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: "flex", alignItems: "center" }}
          >
            <WhatsAppIcon
              width={20}
              height={20}
              color="#25D366"
              style={{ display: "inline-block", marginRight: 10 }}
            />{" "}
            WhatsApp
          </WuiLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
