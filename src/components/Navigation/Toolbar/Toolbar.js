import React from "react";

import Logo from "../../Logo";
import NavigationItems from "../NavigationItems";
import DrawerToggle from "./DrawerToggle";

import classes from "./Toolbar.css";

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default Toolbar;
