import "./ModalWithForm.css";
function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onSubmit,
  onClose,
  inputErrors,
  inputValues,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (
      inputErrors.name?.length > 0 ||
      inputErrors.imageUrl?.length > 0 ||
      inputValues.name?.length === 0 ||
      inputValues.imageUrl?.length === 0
    ) {
      return;
    } else {
      onSubmit();
    }
  };
  const onOverlayClick = (evt) => {
    if (evt.target.className.includes("modal_opened")) {
      onClose();
    }
    if (evt.target.className.includes("modal__submit-btn_disabled")) {
      evt.target.classList.add("shake");
      setTimeout(() => {
        evt.target.classList.remove("shake");
      }, 1000);
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
        <form onSubmit={handleSubmit} className="modal__form" noValidate>
          {children}
          <button
            type="submit"
            className={`modal__submit-btn ${
              inputErrors.name?.length > 0 ||
              inputErrors.imageUrl?.length > 0 ||
              inputValues.name?.length === 0 ||
              inputValues.imageUrl?.length === 0
                ? "modal__submit-btn_disabled"
                : ""
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
