import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    // [name]: value will override the existing values
    setValues({ ...values, [name]: value });
  };

  return { values, setValues, handleChange };
}
