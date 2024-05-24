import React from "react";

import Button from "../button/button.component";

import "./cart-dropdown.style.scss";

const CartDropdown = () => (
  <div className="cart-dropdown-container">
    <div className="cart-items">
      <Button>GO TO CHECKOUT</Button>
    </div>
  </div>
);

export default CartDropdown;
