// import { initializeApp } from 'firebase/app';
// import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { userContext } from '../../App';
// import firebaseConfig from './firebase.config';

// initializeApp(firebaseConfig);

// function Login() {

//     const [loggedInUser ,setLoggedInUser] = useContext(userContext);
//   //set User State
//   const [user, setUser] = useState({
//     isSignedIn: false,
//     name: '',
//     email: '',
//     password: '',
//     photo: '',
//     error: '',
//     success: false
//   });
//   //set conditional user state
//   const [newUser, setNewUser] = useState(false);

//   const navigate = useNavigate();

//   const googleProvider = new GoogleAuthProvider();
//   const fbProvider = new FacebookAuthProvider();

//   //Sign In Handler
//   const handleGoogleSignIn = () => {
//     const auth = getAuth();
//     signInWithPopup(auth, googleProvider)
//     .then(result => {
//       const {displayName, email, photoURL} = result.user;
//       const logedInUser = {
//         isSignedIn: true,
//         name: displayName,
//         email: email,
//         photo: photoURL
//       }
//       setUser(logedInUser);
//       setLoggedInUser(logedInUser);
//       navigate(-1, {replace: true});
//     })
//     .catch(error => {
//       const authError = {...user};
//       authError.error = error.message;
//       authError.success = false;
//       setUser(authError);
//     })
//   }

//   //Sign Out Handler
//   const signOutHandler = () => {
//     const auth = getAuth();
//     signOut(auth).then(() => {
//       // Sign-out successful.
//       const signOutUser = {
//         isSignedIn: false,
//         name: '',
//         email: '',
//         photo: ''
//       }
//       setUser(signOutUser);
//     }).catch((error) => {
//       // An error happened.
//       const signOutError = {...user};
//       signOutError.error = error.message;
//       signOutError.success = false;
//       setUser(signOutError);
//     });
//   }

//   //Sign Up & Sign In handler
//   const submitHandler = (e) => {
//     if(newUser && user.email && user.password){
//       const auth = getAuth();
//       createUserWithEmailAndPassword(auth, user.email, user.password)
//         .then((result) => {
//           // Signed in 
//           const newUserInfo = {...user};
//           newUserInfo.success = true;
//           newUserInfo.error = '';
//           setUser(newUserInfo);
//           updateUserInfo(user.name);
          
//           // ...
//         })
//         .catch((error) => {
//           const newUserInfo = {...user};
//           newUserInfo.error = error.message;
//           newUserInfo.success = false;
//           setUser(newUserInfo);
//           // ..
//         });
//     }
//     if(!newUser && user.email && user.password){
//       const auth = getAuth();
//       signInWithEmailAndPassword(auth, user.email, user.password)
//         .then((result) => {
//           // Signed in 
//           const newUserInfo = {...user};
//           newUserInfo.success = true;
//           newUserInfo.error = '';
//           setUser(newUserInfo);
//           setLoggedInUser(newUserInfo);
//           navigate(-1, {replace: true});
//           // ...
//         })
//         .catch((error) => {
//           const newUserInfo = {...user};
//           newUserInfo.error = error.message;
//           newUserInfo.success = false;
//           setUser(newUserInfo);
//         });
//     }
//     e.preventDefault();
//   }

//   //on blur handler
//   const onBlurHandler = e => {
//     let isFieldValid = true;
//     //email validation
//     if(e.target.name === 'email'){
//       isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
//     }
//     //password validation
//     if(e.target.name === 'password'){
//       isFieldValid = /^(?=.*\d).{6,20}$/.test(e.target.value);
//     }
//     if(isFieldValid){
//       const newUserInfo = {...user};
//       newUserInfo[e.target.name] = e.target.value;
//       setUser(newUserInfo);
//     }
//   }

//   //update user info
//   const updateUserInfo = name => {
//     const auth = getAuth();
//     updateProfile(auth.currentUser, {
//       displayName: name
//     }).then(() => {
//       // Profile updated!
//       console.log("Updated User Info");
//       // ...
//     }).catch((error) => {
//       // An error occurred
//       console.log(error);
//       // ...
//     });
//   }

//   //Facebook Auth Handler 
//   const fbhandleGoogleSignIn = () => {
//     const auth = getAuth();
//     signInWithPopup(auth, fbProvider)
//       .then((result) => {
//         // The signed-in user info.
//         const user = result.user;
//         setLoggedInUser(user);
//         navigate(-1, {replace: true});

//         // ...
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         console.log(error.message);

//         // ...
//       });
//   }
  

//   return (
//     <div style={{textAlign: 'center'}}>
//       {
//         user.isSignedIn ? <button onClick={signOutHandler}>Sign Out</button> :
//         <button onClick={handleGoogleSignIn}>Sign In With Google</button> 
//       }
//       <br />
//       <button onClick={fbhandleGoogleSignIn}>Sign In With Facebook</button>
//       {
//         user.isSignedIn && <div>
//           <p>Welcome, {user.name}</p>
//           <p>Email, {user.email}</p>
//           <img src={user.photo} alt="" />
//         </div>
//       }
//       <div className="own-auth">
//         <h2>Our Own Authentication</h2>
//         <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id='NewUser'/>
//         <label htmlFor="NewUser">New User Sign Up</label>
//         <form onSubmit={submitHandler}>
//           {newUser && <input type="text" name="name" onBlur={onBlurHandler} placeholder='username' required />}
//           <br />
//           <input type="text" name="email" onBlur={onBlurHandler} placeholder='email' required /><br />
//           <input type="password" name="password" onBlur={onBlurHandler} placeholder='password' required /><br />
//           <input type="submit" value={newUser ? 'Sign Up' :'Sign In'} />
//         </form>
//         <p style={{color: 'red'}}>{user.error}</p>
//         {
//           user.success && <p style={{color: 'green'}}>Congratulations! Account {newUser ? 'Created' : 'Logged In'} Successfully Done.</p>
//         }
//       </div>
//     </div>
//   );
// }

// export default Login;
