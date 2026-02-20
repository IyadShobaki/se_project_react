import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  // The likes array should be an array of user ids
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  // // Create a variable for the like button className
  // const itemLikeButtonClassName = `card__like-btn ${
  //   isLiked ? "card__like-btn--liked" : ""
  // }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    // Only allow liking if user is logged in
    if (currentUser) {
      onCardLike(item);
    }
  };

  return (
    <li className="card">
      <div className="card__title-and-like">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <input
            type="checkbox"
            className="card__like-btn"
            checked={isLiked}
            onChange={handleLike}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={`${item.name} image`}
      />
    </li>
  );
}

export default ItemCard;
