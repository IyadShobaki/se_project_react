import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ isOpen, card, onClose, onDeleteItem }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleDelete = () => {
    onDeleteItem(card._id);
  };

  // Checking if the current user is the owner of the current clothing item
  const isOwn = currentUser && card.owner === currentUser?._id;
  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-btn ${isOwn ? "" : "modal__delete-btn_hidden"}`;
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn modal__close-btn_type_preview"
        ></button>
        <img
          src={card.imageUrl}
          alt={`${card.name} image`}
          className="modal__image"
        />
        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button onClick={handleDelete} className={itemDeleteButtonClassName}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
