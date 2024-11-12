import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";


import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";


import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, NavLink, NavLinks, LogoContainer } from "./navigation.style";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser  = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutUser = () => dispatch(signOutStart());

  return (
    <>
      <NavigationContainer>
        <LogoContainer className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              {" "}
              SIGN OUT{" "}
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
