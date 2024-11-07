import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import {ShoppingIcon, CardItemContainer, ItemCount} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CardItemContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount className="item-count">{cartItemCount}</ItemCount>
    </CardItemContainer>
  );
};

export default CartIcon;
