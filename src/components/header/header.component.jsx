import React from 'react';
import './header.styles.scss';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {createStructuredSelector} from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';

const Header = ({currentUser,hidden})=>(
  <div className= 'header'>
    <div className= "logo">
      <Link className='logo-container' to='/'><Logo className='logo'/></Link>
    </div>
    <div className='options'>
      <Link to='/shop' className='option'>
        SHOP
      </Link>
      <Link to='/contact' className ="option">
        CONTACT
      </Link>
      {
        currentUser ? <div className= 'option' onClick={()=>auth.signOut()}>SIGN OUT</div> : <Link to='/signIn' className='option'>SIGN IN</Link>
      }
      <CartIcon/>
    </div>
    {hidden ? null : <CartDropdown/>}
  </div>
)
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);