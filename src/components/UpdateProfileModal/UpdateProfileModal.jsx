import "./UpdateProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function UpdateProfileModal({ isOpen, onUpdate, onClose, isLoading }) {
  const userContext = useContext(CurrentUserContext);
  const currentUser = userContext?.currentUser;

  const defaultValues = {
    name: "",
    avatar: "",
  };

  const { values, errors, isValid, handleChange, resetForm, setValues } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      await onUpdate({
        name: values.name,
        avatar: values.avatar,
      });
      resetForm();
      onClose();
    } catch (error) {
      alert("Failed to update profile. Please try again later.");
    }
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save changes"
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
          placeholder="Name"
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
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default UpdateProfileModal;
