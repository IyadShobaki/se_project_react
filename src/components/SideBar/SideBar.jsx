import "./SideBar.css";
import avatarDefault from "../../assets/images/avatarDefault.png";
function SideBar() {
  const username = "Terrence Tegegne";
  const avatar = avatarDefault;
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
    </aside>
  );
}

export default SideBar;
