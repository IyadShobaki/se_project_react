import "./ModalWithForm.css";
function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onSubmit,
  onClose,
  isLoading,
  isValid,
}) {
  const getLoadingBtnText = (text) => {
    const firstWord = text.split(" ")[0];
    const result =
      firstWord[firstWord.length - 1] === "e"
        ? firstWord.slice(0, -1) + "ing..."
        : firstWord + "ing...";
    return result;
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    } else {
      onSubmit();
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
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
              !isValid ? "modal__submit-btn_disabled" : ""
            }`}
          >
            {isLoading ? getLoadingBtnText(buttonText) : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
