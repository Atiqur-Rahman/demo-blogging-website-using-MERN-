import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAxTr1tNKzLPJbFOZdQIyYq0iaUu6a3fV0',
    authDomain: 'fir-blogging-website.firebaseapp.com',
    projectId: 'fir-blogging-website',
    storageBucket: 'fir-blogging-website.appspot.com',
    messagingSenderId: '993620100586',
    appId: '1:993620100586:web:39e3d87301e293f52a1e93',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// google auth
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth, provider)
        .then((result) => {
            user = result.user;
        })
        .catch((err) => {
            console.log(err);
        });

    return user;
};
