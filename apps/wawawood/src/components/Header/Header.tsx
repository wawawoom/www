import "./Header.css";

const Header = () => {
  return (
    <header>
      <a href=".">
        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Logo" id="logo" />
      </a>

      <a href="https://www.instagram.com/wawawoodstudio/" target="_blank">
        <img
          src={`${import.meta.env.BASE_URL}instagram.png`}
          alt="Instagram"
          id="instagram"
        />
      </a>
    </header>
  );
};

export default Header;
