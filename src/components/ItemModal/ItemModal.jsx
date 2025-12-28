import "./ItemModal.css";
function ItemModal({ isOpen, card, onClose }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn modal__close-btn_type_preview"
        ></button>
        <img
          src={card.link}
          alt={`${card.name} image`}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
