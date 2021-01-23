import './App.css';
import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Header from './components/header/header.component'
import HomePage from './pages/homePage/homepage.component';
import ShopPage from './pages/ShopPage/Shop.component';
import SignInSignUp from './components/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      currentUser:null
    }
  }
  unSubscribeFromAuth=null;

  componentDidMount(){
      this.unSubscribeFromAuth= auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
        this.setState(
          {
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          },
          ()=>{
            console.log(this.state);
          }
        )
        })
      }else{
        this.setState({currentUser:userAuth});
      }
    })
  }
  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path= '/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route path= '/signIn' component= {SignInSignUp}/>
        </Switch> 
      </div>
    );
  }

}

export default App;