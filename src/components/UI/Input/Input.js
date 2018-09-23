import React from "react";

import classes from "./Input.css";

const Input = ({
  elementType,
  elementConfig,
  value,
  label,
  changed,
  invalid,
  shouldValidate
}) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (invalid && shouldValidate) {
    inputClasses.push(classes.Invalid);
  }

  switch (elementType) {
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "input":
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
