import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpenModal, onAddItem, onCloseModal }) {
  const defaulValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange } = useForm(defaulValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpenModal}
      onSubmit={handleSubmit}
      onClose={onCloseModal}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__eror" id="place-name-error"></span>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
        <span className="modal__eror" id="place-link-error"></span>
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weather"
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
            value="cold"
            onChange={handleChange}
          />{" "}
          Cold
        </label>
        <span className="modal__eror" id="place-weather-type-error"></span>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
