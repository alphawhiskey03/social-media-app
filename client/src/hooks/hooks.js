import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState();
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
