import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function AddItemModal({ isOpenModal, onAddItem, onCloseModal, isLoading }) {
  const defaulValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation(defaulValues);

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      await onAddItem(values);
      resetForm();
    } catch (error) {
      alert("Something went wrong. Pleae try again later.");
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpenModal}
      onSubmit={handleSubmit}
      onClose={onCloseModal}
      inputErrors={errors}
      inputValues={values}
      isLoading={isLoading}
      isValid={isValid}
    >
      <label
        htmlFor="add-name"
        className={`modal__label ${
          errors.name.length > 0 ? "modal__label_type_error" : ""
        }`}
      >
        {errors.name.length > 0
          ? `Name* (${errors.name.replace(".", "")})`
          : "Name*"}
        <input
          type="text"
          name="name"
          className={`modal__input ${
            errors.name.length > 0 ? "modal__input_type_error" : ""
          }`}
          id="add-name"
          autoComplete="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="add-image-url"
        className={`modal__label ${
          errors.imageUrl.length > 0 ? "modal__label_type_error" : ""
        }`}
      >
        {errors.imageUrl.length > 0
          ? `Image* (${errors.imageUrl.replace(".", "")})`
          : "Image*"}
        <input
          type="url"
          name="imageUrl"
          className={`modal__input ${
            errors.imageUrl.length > 0 ? "modal__input_type_error" : ""
          }`}
          id="add-image-url"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type*:</legend>
        <label
          htmlFor="add-hot"
          className="modal__label modal__label_type_radio"
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="add-hot"
            name="weather"
            checked={values.weather === "hot"}
            required
            value="hot"
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label
          htmlFor="add-warm"
          className="modal__label modal__label_type_radio"
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="add-warm"
            name="weather"
            checked={values.weather === "warm"}
            value="warm"
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label
          htmlFor="add-cold"
          className="modal__label modal__label_type_radio"
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="add-cold"
            name="weather"
            checked={values.weather === "cold"}
            value="cold"
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
