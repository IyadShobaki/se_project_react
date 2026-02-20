import "./ClothesSection.css";

import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import Loading from "../Loading/Loading";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleCardClick,
  onCardLike,
  handleAddClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const filteredItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-new-btn"
        >
          + Add new
        </button>
      </div>
      {!filteredItems ? (
        <Loading name="loading-items-clothes-section" />
      ) : filteredItems.length === 0 ? (
        <p className="clothes-section__text">Items not found!</p>
      ) : (
        <ul className="clothes-section__list">
          {filteredItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ClothesSection;
