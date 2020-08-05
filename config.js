import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCe7KNMjzBHO7Yz858M8GbF-pKj-I1DJVg",
    authDomain: "the-barter-system.firebaseapp.com",
    databaseURL: "https://the-barter-system.firebaseio.com",
    projectId: "the-barter-system",
    storageBucket: "the-barter-system.appspot.com",
    messagingSenderId: "636929403912",
    appId: "1:636929403912:web:dd04eeaf170c4ff728f5bd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();