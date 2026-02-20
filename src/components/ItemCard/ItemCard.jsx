import "./ItemCard.css";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Check if the item was liked by the current user initially
  const initialIsLiked = item.likes?.some((id) => id === currentUser?._id);

  // Local state for checkbox
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    // Only allow liking if user is logged in
    if (currentUser) {
      // Toggle checkbox state immediately
      setIsLiked(!isLiked);
      // Call the API
      onCardLike(item._id, isLiked);
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
