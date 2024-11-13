import { useDispatch } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.slice';


import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.style.jsx';

const ProductCard = ( { product } ) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();


  const addProductToCart = () => dispatch(addItemToCart(product))

  // {`€${price.toFixed(2)}`}
  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`}/>
      <Footer>
      <Name>{name}</Name>
      <Price>€{price}</Price>
        </Footer>
        <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
      </ProductCartContainer>
  )
}

export default ProductCard;