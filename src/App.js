import './App.css';
import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Header from './components/header/header.component'
import HomePage from './pages/homePage/homepage.component';
import ShopPage from './pages/ShopPage/Shop.component';
import SignInSignUp from './components/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';


class App extends React.Component{
  constructor(){
    super();
    this.state={
      currentUser:null
    }
  }
  unSubscribeFromAuth=null;

  componentDidMount(){
      const {setCurrentUser} = this.props;
      this.unSubscribeFromAuth= auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
        setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
            })
          })
        }else{
        setCurrentUser(userAuth);
      }
    })
  }
  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path= '/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path= '/signIn' render={()=> this.props.currentUser ? (<Redirect to='/'/>): <SignInSignUp/>}/>
        </Switch> 
      </div>
    );
  }

}
const mapStateToProps = ({user})=>({
  currentUser:user.currentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user=> dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);