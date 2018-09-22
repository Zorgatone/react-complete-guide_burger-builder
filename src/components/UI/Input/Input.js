import React from "react";

import classes from "./Input.css";

const Input = ({ elementType, elementConfig, value, label }) => {
  let inputElement = null;

  switch (elementType) {
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          {...elementConfig}
          value={value}
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
          className={classes.InputElement}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case "input":
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...elementConfig}
          value={value}
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
