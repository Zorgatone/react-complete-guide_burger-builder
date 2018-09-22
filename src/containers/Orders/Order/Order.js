import React from "react";

import classes from "./Order.css";

const order = props => {
  const ingredients = Object.keys(props.ingredients).map(name => ({
    name: name,
    amount: props.ingredients[name]
  }));

  const ingredientOutput = ingredients.map(ingredient => (
    <span
      key={ingredient.name}
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px"
      }}
    >
      {ingredient.name} ({ingredient.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
