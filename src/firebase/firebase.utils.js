import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBQ8pt_8zjfEnppoHDjd3JuwKbGyTYsRuE",
    authDomain: "crwn-db-c8d00.firebaseapp.com",
    projectId: "crwn-db-c8d00",
    storageBucket: "crwn-db-c8d00.appspot.com",
    messagingSenderId: "661538748569",
    appId: "1:661538748569:web:50089b7769837f50292008",
    measurementId: "G-VX9M0W7F1E"
}

export const createUserProfileDocument = async (userAuth, AdditionalData)=>{
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email}= userAuth;
        const createdAt= new Date();

        try{
            await userRef.set({displayName,email,createdAt,...AdditionalData})
        }catch(error){
            console.log('error creating user',error.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: `select_account`});
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;