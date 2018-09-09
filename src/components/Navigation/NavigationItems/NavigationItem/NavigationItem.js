import React from "react";

import classes from "./NavigationItem.css";

const NavigationItem = props => (
  <li className={classes.NavigationItem}>
    <a className={props.active ? classes.active : null} href={props.link}>
      {props.children}
    </a>
  </li>
);

export default NavigationItem;
