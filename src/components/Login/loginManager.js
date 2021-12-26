import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeSignInHandler = () => {
    initializeApp(firebaseConfig);
}

//Google Sign In Handler
export const handleGoogleSignIn = () => {
    const googleSignInProvider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, googleSignInProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const logedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
     }
     return logedInUser;
      
    })
    .catch(error => {
        return error;
    })
}

//Facebook Auth Handler 
export const handleFbSignIn = () => {
    const fbSignIn = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, fbSignIn)
    .then((result) => {
        const user = result.user;
        user.success = true;
        return user;
    })
    .catch((error) => {
        return error;
    });
}

//Sign Out Handler
export const signOutHandler = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        success: false
      }
      return signOutUser;
    })
    .catch((error) => {
      return error;
    });
}

export const createUsersWithEmailAndPassword = (name, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
        // Signed in 
        const newUserInfo = result.user;
        newUserInfo.success = true;
        newUserInfo.error = '';
        updateUserInfo(name);
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const signInWithEmailPassword = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
        // Signed in 
        const newUserInfo = result.user;
        newUserInfo.success = true;
        newUserInfo.error = '';
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

//update user info
const updateUserInfo = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log("Updated User Info");
    }).catch((error) => {
      console.log(error);
    });
  }