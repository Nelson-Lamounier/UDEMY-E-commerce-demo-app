import { useDispatch, useSelector } from "react-redux";

import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.slice";

import { CardItemContainer, ItemCount} from "./cart-icon.styles";

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext);
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount)
  const isCartOpen = useSelector(selectIsCartOpen)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CardItemContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon'/>
      <ItemCount >{cartCount}</ItemCount>
    </CardItemContainer>
  );
};

export default CartIcon;
