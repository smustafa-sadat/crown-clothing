import React from 'react';
import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItems} from '../../redux/cart/cart.selector';
import {selectCartTotal} from '../../redux/cart/cart.selector';
import StripeButton from '../../components/stripe-button/stripe-button.component'; 


const checkoutPage = ({cartItems,total})=>(
  <div className = 'checkout-page'>
    <div className= 'checkout-header'>
      <div className= 'header-block'>
        <span>Product</span>
      </div>
      <div className= 'header-block'>
        <span>Description</span>
      </div>
      <div className= 'header-block'>
        <span>Quantity</span>
      </div>
      <div className= 'header-block'>
        <span>Price</span>
      </div>
      <div className= 'header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem =><CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
    <div className='total'>
      <span>TOTALS: ${total}</span>
    </div>
    <div className = 'warning'>
      Please use the follwing test credit card for payments
      <br/>
      4242 4242 4242 4242 - Exp:01/20 - CWC:123 
    </div>
    <StripeButton price={total}/>
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems:selectCartItems,
  total:selectCartTotal
})


export default connect(mapStateToProps)(checkoutPage);