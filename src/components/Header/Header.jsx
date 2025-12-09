import "./Header.css";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.png";
function Header() {
  return (
    <div className="header">
      <img src={logo} alt="" className="header__logo" />
      <p className="header__date-and-location">June 15, New York</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </div>
  );
}

export default Header;
