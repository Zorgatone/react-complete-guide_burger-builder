import React from "react";

import BurgerIngredient from "./BurgerIngredient";

import classes from "./Burger.css";

const Burger = props => {
  const transformedIngredients = Object.keys(props.ingredients).reduce(
    (arr, igKey) =>
      arr.concat(
        [...Array(props.ingredients[igKey])].map((_, i) => (
          <BurgerIngredient key={igKey + i} type={igKey} />
        ))
      ),
    []
  );

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"} />
      {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"} />
    </div>
  );
};

export default Burger;
