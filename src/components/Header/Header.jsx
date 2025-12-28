import { useState } from "react";

import "./Header.css";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <div className="header">
      <img src={logo} alt="WTWR Logo" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button className="header__toggler-btn" onClick={toggleNav}>
        {isNavOpen ? "\u2715" : "\u2550"}
      </button>
      <div
        className={`header__toggler ${
          isNavOpen ? "header__toggler_is-active" : ""
        }`}
      >
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </div>
    </div>
  );
}

export default Header;
