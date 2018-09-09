import React from "react";

import Logo from "../../Logo";
import NavigationItems from "../NavigationItems";

import classes from "./Toolbar.css";

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
