import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/images/logo.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleLoginClick,
  handleRegisterClick,
  weatherData,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const username = currentUser?.name;
  const avatar = currentUser?.avatar;

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header">
      <NavLink to="/">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
      </NavLink>
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
        <ToggleSwitch />
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        )}
        {!isLoggedIn && (
          <>
            <button
              onClick={handleRegisterClick}
              type="button"
              className="header__auth-btn header__register-btn"
            >
              Sign up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__auth-btn header__login-btn"
            >
              Log in
            </button>
          </>
        )}
        {isLoggedIn && (
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{username}</p>
              {avatar && !avatarError ? (
                <img
                  src={avatar}
                  alt="user avatar"
                  className="header__avatar"
                  onError={handleAvatarError}
                />
              ) : (
                <span className="header__avatar header__avatar_none">
                  {username?.toUpperCase().charAt(0) || ""}
                </span>
              )}
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Header;
