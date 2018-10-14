import React from "react";

import classes from "./Button.css";

const Button = ({ btnType, clicked, children, disabled, ...props }) => (
  <button
    {...props}
    className={[classes.Button, classes[btnType]].join(" ")}
    onClick={clicked}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
