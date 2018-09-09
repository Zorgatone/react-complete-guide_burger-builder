import React from "react";

import Logo from "../../Logo";

import classes from "./Toolbar.css";

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      <ul>...</ul>
    </nav>
  </header>
);

export default Toolbar;
