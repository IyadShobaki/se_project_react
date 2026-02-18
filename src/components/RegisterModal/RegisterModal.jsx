import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function RegisterModal({
  isOpen,
  onRegister,
  onClose,
  isLoading,
  onNavigateLogin,
}) {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  };

  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation(defaultValues);

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      await onRegister({
        name: values.name,
        email: values.email,
        password: values.password,
        avatar: values.avatar,
      });
      resetForm();
    } catch (error) {
      alert("Registration failed. Please try again later.");
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Next"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      inputErrors={errors}
      inputValues={values}
      isLoading={isLoading}
      isValid={isValid}
    >
      <label
        htmlFor="email"
        className={`modal__label ${
          errors.email.length > 0 ? "modal__label_type_error" : ""
        }`}
      >
        {errors.email.length > 0
          ? `Email* (${errors.email.replace(".", "")})`
          : "Email*"}
        <input
          type="email"
          name="email"
          className={`modal__input ${
            errors.email.length > 0 ? "modal__input_type_error" : ""
          }`}
          id="email"
          autoComplete="email"
          placeholder="Enter your email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="password"
        className={`modal__label ${
          errors.password.length > 0 ? "modal__label_type_error" : ""
        }`}
      >
        {errors.password.length > 0
          ? `Password* (${errors.password.replace(".", "")})`
          : "Password*"}
        <input
          type="password"
          name="password"
          className={`modal__input ${
            errors.password.length > 0 ? "modal__input_type_error" : ""
          }`}
          id="password"
          placeholder="Create a password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
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
    </ModalWithForm>
  );
}

export default RegisterModal;
