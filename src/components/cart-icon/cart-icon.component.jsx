import { useDispatch, useSelector } from "react-redux";

import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.slice";

import {ShoppingIcon, CardItemContainer, ItemCount} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext);
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount)
  const isCartOpen = useSelector(selectIsCartOpen)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CardItemContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon/>
      <ItemCount >{cartCount}</ItemCount>
    </CardItemContainer>
  );
};

export default CartIcon;
