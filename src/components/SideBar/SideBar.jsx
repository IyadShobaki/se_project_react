import "./SideBar.css";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onLogout, onOpenUpdateModal }) {
  const userContext = useContext(CurrentUserContext);
  const [avatarError, setAvatarError] = useState(false);

  const currentUser = userContext?.currentUser;
  const username = currentUser?.name;
  const avatar = currentUser?.avatar;

  const handleAvatarError = () => {
    setAvatarError(true);
  };
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__username">{username}</p>
        {avatar && !avatarError ? (
          <img
            src={avatar}
            alt="user avatar"
            className="sidebar__avatar"
            onError={handleAvatarError}
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
        <button className="sidebar__btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
