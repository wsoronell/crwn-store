import {Fragment, useContext} from 'react';
import { useSelector } from 'react-redux';
import {Outlet} from 'react-router-dom';
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg';
import CartIcon from '../../cart-icon/cart-icon.component';
import { selectCurrentUser } from '../../../store/user/user.selector';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer
} from './navigation.styles.jsx'

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const {isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrwnLogo className='logo' />
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>
              SHOP
            </NavLink>
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutUser}>
                  SIGN OUT
                </NavLink>
              ) : (
                <NavLink to='/auth'>
                  SIGN IN
                </NavLink>
              )
            }
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;