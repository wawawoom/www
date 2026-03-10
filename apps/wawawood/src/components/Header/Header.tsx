import "./Header.css";

const Header = () => {
  return (
    <header>
      <a href=".">
        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Logo" id="logo" />
      </a>
    </header>
  );
};

export default Header;
