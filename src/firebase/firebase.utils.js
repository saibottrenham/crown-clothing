import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyBxNMe9E77hgt-jnnab7TU6niOEvCIwOkg",
        authDomain: "crwn-db-faaed.firebaseapp.com",
        projectId: "crwn-db-faaed",
        storageBucket: "crwn-db-faaed.appspot.com",
        messagingSenderId: "774210696483",
        appId: "1:774210696483:web:abd9ae4629ee80e9d34896",
        measurementId: "G-2WBG0J5KXY"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promtp: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
