import { useState, useRef } from "react";

// const DIGIT_REGEX = /^-{0,1}\d+$/;
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
// const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function useInputValue(callback = () => true) {
  const [value, setValue] = useState("");
  const ref = useRef(null);

  function onChange(event) {
    const canChange = callback(event);
    if (canChange) {
      setValue(event.target.value);
    }
  }

  return {
    value,
    onChange,
    ref,
    onInput: (event) => event.target.setCustomValidity(""),
  };
}

// export function isNumberValid(event) {
//   return event.target.value === "" || event.target.value.match(DIGIT_REGEX);
// }

// export function isPasswordValid(event) {
//   return event.target.value === "" || event.target.value.match(PASSWORD_REGEX);
// }

// export function isEmailValid(event) {
//   return event.target.value === "" || event.target.value.match(EMAIL_REGEX);
// }
