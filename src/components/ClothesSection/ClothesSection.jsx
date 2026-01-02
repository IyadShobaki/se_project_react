import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";
import Loading from "../Loading/Loading";
function ClothesSection({ clothingItems, handleCardClick }) {
  let filteredItems = null;
  filteredItems = clothingItems.filter((item) => item.weather === item.weather);
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your items</p>
        <button type="button" className="clothes-section__add-new-btn">
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
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ClothesSection;
