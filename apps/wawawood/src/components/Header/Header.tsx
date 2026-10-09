import {
  PINTEREST_COLOR,
  PINTEREST_URL,
  WHATSAPP_NUMBER,
} from "../../constants/social";
import PinterestIcon from "../PinterestIcon/PinterestIcon";
import WhatsAppIcon from "../WhatsAppIcon/WhatsAppIcon";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <a href=".">
        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Logo" id="logo" />
      </a>

      <div className="header-social">
        <a
          href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon id="whatsapp" color="#25D366" />
        </a>

        <a
          href={PINTEREST_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Pinterest"
        >
          <PinterestIcon id="pinterest" color={PINTEREST_COLOR} />
        </a>

        <a href="https://www.instagram.com/wawawoodstudio/" target="_blank">
          <img
            src={`${import.meta.env.BASE_URL}instagram.png`}
            alt="Instagram"
            id="instagram"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
