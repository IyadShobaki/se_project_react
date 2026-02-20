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
  onNavigateLogin,
  onNavigateRegister,
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
            disabled={!isValid || isLoading}
            className={`modal__submit-btn ${
              !isValid ? "modal__submit-btn_disabled" : ""
            } ${title === "Change Profile Data" ? "modal__submit-btn_profile" : ""}`}
          >
            {isLoading ? getLoadingBtnText(buttonText) : buttonText}
          </button>
          {title === "Sign Up" && (
            <p className="modal__link-text modal__link-text_register">
              or{" "}
              <button
                type="button"
                className="modal__link-button"
                onClick={onNavigateLogin}
              >
                Log in
              </button>
            </p>
          )}
          {title === "Log In" && (
            <p className="modal__link-text modal__link-text_login">
              or{" "}
              <button
                type="button"
                className="modal__link-button"
                onClick={onNavigateRegister}
              >
                Register
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
