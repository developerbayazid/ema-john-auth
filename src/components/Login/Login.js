import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import { createUsersWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, initializeSignInHandler, signInWithEmailPassword, signOutHandler } from "./loginManager";

function Login() {
  
  initializeSignInHandler();

  const [loggedInUser ,setLoggedInUser] = useContext(userContext);
  //set User State
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });
  //set conditional user state
  const [newUser, setNewUser] = useState(false);

  const navigate = useNavigate();

  //Sign Up & Sign In handler
  const submitHandler = (e) => {
    if(newUser && user.email && user.password){
      createUsersWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleRes(res, true);
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailPassword(user.email, user.password)
      .then(res => {
        handleRes(res, true);
      })
    }
    e.preventDefault();
  }

  //on blur handler
  const onBlurHandler = e => {
    let isFieldValid = true;
    //email validation
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    //password validation
    if(e.target.name === 'password'){
      isFieldValid = /^(?=.*\d).{6,20}$/.test(e.target.value);
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  //google sign in
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleRes(res, true);
    })
  }
  //fb sign in
  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleRes(res, true);
    })
  }
  //sign out
  const handleSignOut = () => {
    signOutHandler()
    .then(res => {
      handleRes(res, false);
    })
  }

  const handleRes = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    redirect && navigate(-1);
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign In With Google</button> 
      }
      <br />
      <button onClick={fbSignIn}>Sign In With Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Email, {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <div className="own-auth">
        <h2>Our Own Authentication</h2>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id='NewUser'/>
        <label htmlFor="NewUser">New User Sign Up</label>
        <form onSubmit={submitHandler}>
          {newUser && <input type="text" name="name" onBlur={onBlurHandler} placeholder='username' required />}
          <br />
          <input type="text" name="email" onBlur={onBlurHandler} placeholder='email' required /><br />
          <input type="password" name="password" onBlur={onBlurHandler} placeholder='password' required /><br />
          <input type="submit" value={newUser ? 'Sign Up' :'Sign In'} />
        </form>
        <p style={{color: 'red'}}>{user.error}</p>
        {
          user.success && <p style={{color: 'green'}}>Congratulations! Account {newUser ? 'Created' : 'Logged In'} Successfully Done.</p>
        }
      </div>
    </div>
  );
}

export default Login;
