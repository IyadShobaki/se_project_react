import "./ConfirmationModal.css";
function ConfirmationModal({
  isOpen,
  onClose,
  onDeleteItem,
  onCancelDeletingItem,
}) {
  const handleDelete = () => {
    onDeleteItem();
  };

  const handleCancel = () => {
    onCancelDeletingItem();
  };

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
      <div className="modal__container modal__container_type_confirm">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn"
        ></button>

        <p className="modal__title modal__title_type_confirm">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          onClick={handleDelete}
          className="modal__delete-btn modal__delete-btn_type_confirm"
        >
          Yes, delete item
        </button>
        <button onClick={handleCancel} className="modal__cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
