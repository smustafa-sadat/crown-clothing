import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    }
  }
  handleSubmit = (event)=>{
    event.preventDefault();
    this.setState({name:'',password:''});
  }
  handleChange= (event)=>{
    const {name,value} = event.target;
    this.setState({[name]:value})
  }
  render(){
    return(
      <div className= 'sign-in'>
        <h1 className='title'>I already have an account</h1>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput name='email' type='email' handleChange={this.handleChange} value={this.state.email} label= 'email' required/>
          <FormInput name= 'password' type='password' handleChange={this.handleChange} value={this.state.password} label= 'password' required/>
          <div className= 'buttons'>
            <CustomButton type="submit">sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>sign in with Google</CustomButton>
          </div>  
        </form>
      </div> 
     
    )
  }
}
export default SignIn;