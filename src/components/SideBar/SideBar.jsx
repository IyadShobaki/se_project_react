import "./SideBar.css";
import { useContext } from "react";
import avatarDefault from "../../assets/images/avatarDefault.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onLogout, onOpenUpdateModal }) {
  const userContext = useContext(CurrentUserContext);
  const currentUser = userContext?.currentUser;
  const username = currentUser?.name || "Terrence Tegegne";
  const avatar = currentUser?.avatar || avatarDefault;

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__username">{username}</p>
        {avatar ? (
          <img
            src={avatar || avatarDefault}
            alt="user avatar"
            className="sidebar__avatar"
          />
        ) : (
          <span className="sidebar__avatar sidebar__avatar_none">
            {username?.toUpperCase().charAt(0) || ""}
          </span>
        )}
      </div>
      <div className="sidebar__actions">
        <button className="sidebar__btn" onClick={onOpenUpdateModal}>
          Change profile data
        </button>
        <button className="sidebar__btn sidebar__btn_danger" onClick={onLogout}>
          Log out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
