import {
  WuiColorAlias,
  WuiLink,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

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
            WaWaWoodStudio
          </WuiLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
