import "./ModalWithForm.css";
function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onSubmit,
  onClose,
}) {
  const onOverlayClick = (evt) => {
    if (evt.target.className.includes("modal_opened")) {
      onClose();
    }
  };
  return (
    <div
      onClick={onOverlayClick}
      className={`modal ${isOpen ? "modal_opened" : ""}`}
    >
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
