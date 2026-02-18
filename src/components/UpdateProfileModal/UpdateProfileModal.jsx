import "./UpdateProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function UpdateProfileModal({ isOpen, onUpdate, onClose, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const defaultValues = {
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  };

  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation(defaultValues);

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      await onUpdate({
        name: values.name,
        avatar: values.avatar,
      });
      resetForm();
    } catch (error) {
      alert("Failed to update profile. Please try again later.");
    }
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      inputErrors={errors}
      inputValues={values}
      isLoading={isLoading}
      isValid={isValid}
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
          autoComplete="name"
          placeholder="Enter your name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="avatar"
        className={`modal__label ${
          errors.avatar.length > 0 ? "modal__label_type_error" : ""
        }`}
      >
        {errors.avatar.length > 0
          ? `Avatar URL* (${errors.avatar.replace(".", "")})`
          : "Avatar URL*"}
        <input
          type="url"
          name="avatar"
          className={`modal__input ${
            errors.avatar.length > 0 ? "modal__input_type_error" : ""
          }`}
          id="avatar"
          placeholder="Enter your avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default UpdateProfileModal;
