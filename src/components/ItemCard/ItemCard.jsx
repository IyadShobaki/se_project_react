import "./ItemCard.css";
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <div className="card__title-and-like">
        <h2 className="card__name">{item.name}</h2>
        <button className="card__like-btn"></button>
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
