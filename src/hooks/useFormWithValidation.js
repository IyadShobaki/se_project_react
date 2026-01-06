import { useState, useCallback } from "react";

export const useFormWithValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const validateField = useCallback((name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value || value.trim().length === 0) {
          error = "Name is required.";
        } else if (value.length > 30) {
          error = "Name must be 30 characters or less.";
        }
        break;

      case "imageUrl":
        if (!value || value.trim().length === 0) {
          error = "Image URL is required.";
        } else {
          try {
            new URL(value);
          } catch {
            error = "Please enter a valid URL.";
          }
        }
        break;

      case "weather":
        if (!value || !["hot", "warm", "cold"].includes(value)) {
          error = "Please select a weather type.";
        }
        break;

      default:
        break;
    }

    return error;
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField]
  );

  const isValid = !Object.values(errors).some((error) => error.length > 0);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({
      name: "",
      imageUrl: "",
      weather: "",
    });
  }, [initialValues]);

  return {
    values,
    errors,
    isValid,
    setValues,
    handleChange,
    resetForm,
  };
};