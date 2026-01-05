import { useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpenModal, onAddItem, onCloseModal }) {
  // useEffect(() => {
  //   if (isOpenModal) {
  //     setValues(defaulValues);
  //   }
  // }, [isOpenModal]);

  const defaulValues = {
    name: "",
    imageUrl: "",
    weather: "hot",
  };
  const { values, errors, setValues, handleChange } = useForm(defaulValues);

  const handleSubmit = async () => {
    //evt.preventDefault();
    try {
      await onAddItem(values);
      setValues(defaulValues);
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
    >
      <label
        htmlFor="name"
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
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="imageUrl"
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
          id="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type*:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weather"
            checked={values.weather === "hot"}
            required
            value="hot"
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weather"
            checked={values.weather === "warm"}
            value="warm"
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
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
