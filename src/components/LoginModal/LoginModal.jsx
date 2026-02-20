import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function LoginModal({
  isOpen,
  onLogin,
  onClose,
  isLoading,
  onNavigateRegister,
}) {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation(defaultValues);

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      await onLogin(values);
      resetForm();
    } catch (error) {
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log in"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      inputErrors={errors}
      inputValues={values}
      isLoading={isLoading}
      isValid={isValid}
      onNavigateRegister={onNavigateRegister}
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
          placeholder="Email"
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
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
