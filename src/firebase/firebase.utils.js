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

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();
        if (!snapShot.exists) {
                const { displayName, email } = userAuth;
                const createdAt = new Date();

                try {
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...additionalData
                        })
                } catch(error) {
                        console.log('Error creating user', error.message);
                }
        }

        return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, ObjectsToAdd) => {
        const collectionRef = firestore.collection(collectionKey);   
        const batch = firestore.batch();
        ObjectsToAdd.forEach(obj => {
                const newDocRef = collectionRef.doc();
                batch.set(newDocRef, obj);      
        });
        return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
        const transformedCollection = collections.docs.map(doc => {
                const { title, items } = doc.data();
                return {
                        routeName: encodeURI(title.toLowerCase()),
                        id: doc.id,
                        title,
                        items
                }
        });
        return transformedCollection.reduce((accumulator, collection) => {
                accumulator[collection.title.toLowerCase()] = collection;
                return accumulator;
        }, {});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promtp: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
