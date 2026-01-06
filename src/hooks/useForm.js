import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultValues);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    // [name]: value will override the existing values
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]: evt.target.validationMessage,
    });
    setIsValid(evt.target.closest("form").checkValidity());
  };

  return { values, errors, isValid, setValues, handleChange };
}
