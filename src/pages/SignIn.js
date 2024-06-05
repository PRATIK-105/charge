import { useState, useCallback } from "react";
import SignUpPopUp from "../components/SignUpPopUp";
import PortalPopup from "../components/PortalPopup";
import "./SignIn.css";
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, facebookProvider, db } from '../config/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import NavBar from "./NavBar";
const SignIn = () => {
const [isSignUpPopUpOpen, setSignUpPopUpOpen] = useState(false);
 
  const onForgetPassword2Click = useCallback(() => {
    // Please sync "Home Page" to the project
  }, []);

  const openSignUpPopUp = useCallback(() => {
    setSignUpPopUpOpen(true);
  }, []);
  

  const closeSignUpPopUp = useCallback(() => {
    setSignUpPopUpOpen(false);
  }, []);
  
  const handleChargerButtonClick = () => {
    navigate('/homepage', { state: { openAddCharger: true } });
  };

  const navigate = useNavigate(); // Initialize navigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const handleGuestSignIn = () => { alert('Continuing as a guest!'); navigate('/homepage');}

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Sign in successful!');
        navigate('/homepage');  // Navigate to homepage
    } catch (error) {
        alert(error.message);
    }
};


const handleForgotPassword = async () => {
  try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
  } catch (error) {
      alert(error.message);
  }
};

  const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Store additional user data in Firestore
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
            name: user.displayName,
            email: user.email,
            profilePicture: user.photoURL,
            mobile: mobile, 
            // ... any other data you want to store
        }, { merge: true });  // This ensures we don't overwrite existing data

        alert('Signed in with Google successfully!');
        navigate('/homepage');
    } catch (error) {
        alert(error.message);
    }
};

  const handleFacebookSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;

        // Store additional user data in Firestore
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
            name: user.displayName,
            email: user.email,
            profilePicture: user.photoURL,
            mobile: mobile,            
            // ... any other data you want to store
        }, { merge: true });

        alert('Signed in with Facebook successfully!');
        navigate('/homepage');
    } catch (error) {
        alert(error.message);
    }
};

const handleSignOut = async () => {
    try {
        await signOut(auth);
        alert('Signed out successfully!');
    } catch (error) {
        alert(error.message);
    }
  };
  

  return (
    <>
      <div className="signin">
        <div className="sign-in">
          <div className="signin-box" />
          <div className="button-guest">
            <div className="forget-password" />
            <div className="continue-as-guest" onClick={handleGuestSignIn}>
              Continue as Guest
            </div>
          </div>
          <div className="button-sign-out"onClick={handleSignOut}>
            <div className="forget-password1" />
            <div className="sign-out">Sign Out</div>
          </div>
          <div className="button-facebook" onClick={handleFacebookSignIn} >
            <div
              className="box-facebook" 
              />
            <img
              className="facebook-2815970-960-720-1-icon"
              alt=""
              src="/facebook2815970-960-720-1@2x.png"
            />
            <div className="sign-in-with">Sign In with Facebook</div>
          </div>
          <div className="button-google" onClick={handleGoogleSignIn}>
            <div className="forget-password1" />
            <div className="sign-in-with">Sign In with Google</div>
            <img
              className="google-logo-png-image-1-icon"
              alt=""
              src="/googlelogopngimage-1@2x.png"
            />
          </div>
          <div className="button-email-id-sing-up" onClick={openSignUpPopUp}>
            <div className="forget-password4" />
            <div className="sign-in-with">Sign Up with Email ID</div>
          </div>
          <div className="forgot-pasword"onClick={handleForgotPassword}>Forgot Pasword</div>
          
          <form onSubmit={handleSignIn}>
                    <input 
                        className="email-id" 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        tabIndex={1}  // Set tab index for email
                    />
                    <div className="email">Email:</div>
                    
                    <input 
                        className="password" 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        tabIndex={2}  // Set tab index for password
                    />
                    <div className="password1">Password:</div>

                    <div className="button-signin">
                        <button type="submit" className="sign-in-b"></button>
                        <div className="sign-in1">Sign In</div>
                    </div>
                </form>
                
          <div className="sign-in-child" />
          <b className="sign-in2">Sign In</b>
        </div>
        <NavBar />        
        <video className="car-ev-1" autoPlay loop muted>
        <source src="/EV_Charging_Anxiety.mp4" type="video/mp4" />
        </video>
        <img className="car-journey" alt="" src="/Longer Journey's No worries EV.png" />
    
        <div className="plug-into-simplicity-container">
          <span className="plug-into-simplicity-container1">
            <p className="plug-into-simplicity">{`“ Plug into Simplicity, `}</p>
            <p className="plug-into-simplicity">
              Join the Community Redefining Mobility.”
            </p>
          </span>
        </div>
        <div className="share-your-charger-container">
          <span className="plug-into-simplicity-container1">
            <p className="plug-into-simplicity">Share your Charger</p>
            <p className="plug-into-simplicity">&nbsp;</p>
            <p className="plug-into-simplicity">{`Find Charger `}</p>
            <p className="plug-into-simplicity">&nbsp;</p>
            <p className="plug-into-simplicity">Ease Your Travel</p>
          </span>
        </div>
        <img className="rectangle-signin" alt="" src="/Signin_Page.png" />
        <img className="signin-child" alt="" src="/arrow-1.svg" />
        <img className="signin-item" alt="" src="/arrow-2.svg" />
      </div>
      {isSignUpPopUpOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSignUpPopUp}
        >
          <SignUpPopUp onClose={closeSignUpPopUp} />
        </PortalPopup>
      )}
    </>
  );
};

export default SignIn;
