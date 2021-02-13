import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({price})=>{
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51IK41bEsEkk2DLNKHPDbDwgsRa3zMXWgYqiQM0d36WCGkHHaK2ICULUVSHfvx9SuG7hA2O8Wj89lsblhiQ6askE400XZSQgHUI';
  
  const onToken = (token)=>{
    console.log(token);
    alert('Payment Successful');
  }
  return(
    <StripeCheckout
      label= 'Pay Now'
      name= 'CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image = 'https://svgshare.com/i/CUz.svg'
      description = {`Your Total is $${price}`}
      amount = {priceForStripe}
      panelLabel = 'Pay Now'
      token = {onToken}
      stripeKey = {publishableKey}
    />
  )
}
export default StripeButton;