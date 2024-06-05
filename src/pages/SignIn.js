// import { useState, useCallback } from "react";
// import SignUpPopUp from "../components/SignUpPopUp";
// import PortalPopup from "../components/PortalPopup";
// import "./SignIn.css";
// import './NavBar.css';
// import { Link, useNavigate } from 'react-router-dom';
//  import { auth, googleProvider, facebookProvider, db } from '../config/firebase';
//  import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import NavBar from "./NavBar";
// const SignIn = () => {
// const [isSignUpPopUpOpen, setSignUpPopUpOpen] = useState(false);
 
//   const onForgetPassword2Click = useCallback(() => {
//     // Please sync "Home Page" to the project
//   }, []);

//   const openSignUpPopUp = useCallback(() => {
//     setSignUpPopUpOpen(true);
//   }, []);
  

//   const closeSignUpPopUp = useCallback(() => {
//     setSignUpPopUpOpen(false);
//   }, []);
  
//   const handleChargerButtonClick = () => {
//     navigate('/homepage', { state: { openAddCharger: true } });
//   };

//   const navigate = useNavigate(); // Initialize navigate
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [showSignUp, setShowSignUp] = useState(false);
//   const handleGuestSignIn = () => { alert('Continuing as a guest!'); navigate('/homepage');}

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//         await signInWithEmailAndPassword(auth, email, password);
//         alert('Sign in successful!');
//         navigate('/homepage');  // Navigate to homepage
//     } catch (error) {
//         alert(error.message);
//     }
// };


// const handleForgotPassword = async () => {
//   try {
//       await sendPasswordResetEmail(auth, email);
//       alert('Password reset email sent!');
//   } catch (error) {
//       alert(error.message);
//   }
// };

//   const handleGoogleSignIn = async () => {
//     try {
//         const result = await signInWithPopup(auth, googleProvider);
//         const user = result.user;

//         // Store additional user data in Firestore
//         const userDocRef = doc(db, "users", user.uid);
//         await setDoc(userDocRef, {
//             name: user.displayName,
//             email: user.email,
//             profilePicture: user.photoURL,
//             mobile: mobile, 
//             // ... any other data you want to store
//         }, { merge: true });  // This ensures we don't overwrite existing data

//         alert('Signed in with Google successfully!');
//         navigate('/homepage');
//     } catch (error) {
//         alert(error.message);
//     }
// };

//   const handleFacebookSignIn = async () => {
//     try {
//         const result = await signInWithPopup(auth, facebookProvider);
//         const user = result.user;

//         // Store additional user data in Firestore
//         const userDocRef = doc(db, "users", user.uid);
//         await setDoc(userDocRef, {
//             name: user.displayName,
//             email: user.email,
//             profilePicture: user.photoURL,
//             mobile: mobile,            
//             // ... any other data you want to store
//         }, { merge: true });

//         alert('Signed in with Facebook successfully!');
//         navigate('/homepage');
//     } catch (error) {
//         alert(error.message);
//     }
// };

// const handleSignOut = async () => {
//     try {
//         await signOut(auth);
//         alert('Signed out successfully!');
//     } catch (error) {
//         alert(error.message);
//     }
//   };
  

//   return (
//     <>
//       <div className="signin">
//         <div className="sign-in">
//           <div className="signin-box" />
//           <div className="button-guest">
//             <div className="forget-password" />
//             <div className="continue-as-guest" onClick={handleGuestSignIn}>
//               Continue as Guest
//             </div>
//           </div>
//           <div className="button-sign-out"onClick={handleSignOut}>
//             <div className="forget-password1" />
//             <div className="sign-out">Sign Out</div>
//           </div>
//           <div className="button-facebook" onClick={handleFacebookSignIn} >
//             <div
//               className="box-facebook" 
//               />
//             <img
//               className="facebook-2815970-960-720-1-icon"
//               alt=""
//               src="/facebook2815970-960-720-1@2x.png"
//             />
//             <div className="sign-in-with">Sign In with Facebook</div>
//           </div>
//           <div className="button-google" onClick={handleGoogleSignIn}>
//             <div className="forget-password1" />
//             <div className="sign-in-with">Sign In with Google</div>
//             <img
//               className="google-logo-png-image-1-icon"
//               alt=""
//               src="/googlelogopngimage-1@2x.png"
//             />
//           </div>
//           <div className="button-email-id-sing-up" onClick={openSignUpPopUp}>
//             <div className="forget-password4" />
//             <div className="sign-in-with">Sign Up with Email ID</div>
//           </div>
//           <div className="forgot-pasword"onClick={handleForgotPassword}>Forgot Pasword</div>
          
//           <form onSubmit={handleSignIn}>
//                     <input 
//                         className="email-id" 
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         tabIndex={1}  // Set tab index for email
//                     />
//                     <div className="email">Email:</div>
                    
//                     <input 
//                         className="password" 
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         tabIndex={2}  // Set tab index for password
//                     />
//                     <div className="password1">Password:</div>

//                     <div className="button-signin">
//                         <button type="submit" className="sign-in-b"></button>
//                         <div className="sign-in1">Sign In</div>
//                     </div>
//                 </form>
                
//           <div className="sign-in-child" />
//           <b className="sign-in2">Sign In</b>
//         </div>
//         <NavBar />        
//         <video className="car-ev-1" autoPlay loop muted>
//         <source src="/EV_Charging_Anxiety.mp4" type="video/mp4" />
//         </video>
//         <img className="car-journey" alt="" src="/Longer Journey's No worries EV.png" />
    
//         <div className="plug-into-simplicity-container">
//           <span className="plug-into-simplicity-container1">
//             <p className="plug-into-simplicity">{`“ Plug into Simplicity, `}</p>
//             <p className="plug-into-simplicity">
//               Join the Community Redefining Mobility.”
//             </p>
//           </span>
//         </div>
//         <div className="share-your-charger-container">
//           <span className="plug-into-simplicity-container1">
//             <p className="plug-into-simplicity">Share your Charger</p>
//             <p className="plug-into-simplicity">&nbsp;</p>
//             <p className="plug-into-simplicity">{`Find Charger `}</p>
//             <p className="plug-into-simplicity">&nbsp;</p>
//             <p className="plug-into-simplicity">Ease Your Travel</p>
//           </span>
//         </div>
//         <img className="rectangle-signin" alt="" src="/Signin_Page.png" />
//         <img className="signin-child" alt="" src="/arrow-1.svg" />
//         <img className="signin-item" alt="" src="/arrow-2.svg" />
//       </div>
//       {isSignUpPopUpOpen && (
//         <PortalPopup
//           overlayColor="rgba(113, 113, 113, 0.3)"
//           placement="Centered"
//           onOutsideClick={closeSignUpPopUp}
//         >
//           <SignUpPopUp onClose={closeSignUpPopUp} />
//         </PortalPopup>
//       )}
//     </>
//   );
// };

// export default SignIn;


// import React, { useState } from "react";
import NavBar from "./NavBar";
import MainPage from "./MainPage";
import { useState, useCallback } from "react";
import { auth, googleProvider, facebookProvider, db } from '../config/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';


const StatCard = ({ number, label }) => (
  <div className="flex-1 mx-2 my-4 sm:my-0">
    <div className="text-4xl text-white font-poppins">{number}</div>
    <div className="text-sm text-white font-poppins">{label}</div>
  </div>
);



const InfoCard = ({ imgSrc, title, description }) => (
  <div className="flex flex-col items-center mx-5 my-4 sm:my-0">
    <img src={imgSrc} className="w-56 rounded-lg" alt={title} />
    <div className="text-xl font-poppins text-[#7DF9FF] w-56 pt-3 text-center">
      {title}
    </div>
    <div className="w-56 pt-3 font-poppins text-white text-center">
      {description}
    </div>
  </div>
);


const Performance = () => {
  return (
    <section className="bg-black h-auto w-full">
      <div className="flex flex-wrap p-8 justify-center items-center space-x-4 md:space-x-8 lg:space-x-16 mx-auto">
        <StatCard number="15000+" label="Chargers Onboarded" />
        <StatCard number="1.2M+" label="Charging Sessions/Year" />
        <StatCard number="36000+" label="Tons CO2 Reduced/Year" />
        <StatCard number="65000+" label="Users Onboarded" />
        <StatCard number="25500+" label="Stations on Roaming" />
      </div>
    </section>
  );
};






const WhyToChoose = () => {
  return (
    <section className="bg-[#36454F] w-full h-auto">
      <div className="text-[#39FF14] font-poppins text-3xl text-center pt-14">
        Why Choose ChargeEazy?
      </div>

      <div className="pt-16 flex flex-wrap justify-center">
        <InfoCard
          imgSrc="/1.png"
          title="Find Stations Nearby"
          description="Quickly locate charging stations near you with our easy-to-use map."
        />
        <InfoCard
          imgSrc="/2.png"
          title="Easy Start Charging"
          description="Start charging your EV in just a few clicks with our user-friendly interface."
        />
        <InfoCard
          imgSrc="/3.png"
          title="Transparent Pricing"
          description="Get clear and upfront pricing for all your charging needs."
        />
        <InfoCard
          imgSrc="/4.png"
          title="Reliable Support"
          description="24/7 support to assist you anytime, anywhere."
        />
      </div>

      <div className="text-[#39FF14] font-poppins text-3xl text-center pt-14">
        How ChargeEazy Works?
      </div>

      <div className="pt-16 flex flex-wrap justify-center">
        <InfoCard
          imgSrc="/5.png"
          title="Locate Stations"
          description="Search and select a nearby charging station."
        />
        <InfoCard
          imgSrc="/6.png"
          title="Plug In"
          description="Connect your EV to the station."
        />
        <InfoCard
          imgSrc="/7.png"
          title="Start Charging"
          description="Use the app to begin charging."
        />
        <InfoCard
          imgSrc="/8.png"
          title="Track & Pay"
          description="Monitor charging status and pay easily through the app."
        />
      </div>
    </section>
  );
};



const Subscribe = () => {
  return (
    <div className="bg-[#36454F] w-full h-auto py-10 justify-center pt-28">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <div className="text-white text-2xl font-bold">
            Subscribe to Our Newsletter
          </div>
          <div className="text-white text-sm mt-4 font-light">
            Stay updated with our latest news and updates
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:ml-20 w-full md:w-1/3">
          <div className="flex flex-col md:flex-row items-center">
          
            <label htmlFor="email" className="text-white mr-2 mb-2 md:mb-0">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="px-2 py-1 rounded w-80"
              placeholder="Enter your email"
            />
          </div>
          <div className="text-white text-xs ml-12 mt-2">we respect your privacy</div>
          <button className="mt-4 md:mt-5 px-12 py-2 ml-12 bg-white text-black  rounded-lg hover:bg-blue-700">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#36454F] w-full h-auto pt-10 pb-10">
      <div className="container mx-auto text-center">
        <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-white">
          <li>
            <a href="/about-us" className="hover:underline">
              About Us
            </a>
          </li>
          <li>
            <a href="/contact-us" className="hover:underline">
              Contact Us
            </a>
          </li>
          <li>
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms-conditions" className="hover:underline">
              Terms & Conditions
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

const DownloadSection = () => {
  return (
    <section className="bg-white w-full h-auto py-10 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
        Download ChargeEazy
      </h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <img src="/apple.png" alt="Apple Store" className="h-6 mr-2" />
          <span>App Store</span>
        </a>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <img src="/google-play.png" alt="Google Play" className="h-6 mr-2" />
          <span>Google Play</span>
        </a>
      </div>
    </section>
  );
};

// import React, { useState, useCallback } from "react";
// import NavBar from "./NavBar";
// import MainPage from "./MainPage";
// import { auth, googleProvider, facebookProvider, db } from '../config/firebase';
// import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleGuestSignIn = () => { 
    alert('Continuing as a guest!'); 
    navigate('/homepage');
  };

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
    <div className="relative h-screen w-screen bg-gray-100">
      <div className="text-[#36454F] font-poppins text-center text-4xl font-semibold mt-16">
        Welcome to ChargeEazy
      </div>
      <div className={`flex mt-16 ${isRegistering ? "filter blur-sm" : ""}`}>
        <div className="w-1/2 hidden md:block">
          <img src="/signin.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-8 w-full md:w-1/2">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#8AFF74] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Log In
                </button>
              </div>
              <div className="text-center text-gray-600 my-2">or</div>
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
                >
                  Log In with Google
                </button>
                <button
                  type="button"
                  onClick={handleFacebookSignIn}
                  className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Log In with Facebook
                </button>
              </div>
              <div className="text-center text-gray-600 my-2">or</div>
              <div className="text-center">
                <span className="text-gray-600">New to ChargeEasy? </span>
                <button
                  type="button"
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-500 hover:text-blue-800 font-bold"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isRegistering && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#8AFF74] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Register
                </button>
              </div>
              <div className="text-center">
                <span className="text-gray-600">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-500 hover:text-blue-800 font-bold"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};




const App = () => (
  <>
     <NavBar/>
    <MainPage/>
    <Performance />
    <WhyToChoose />
    <Subscribe />
    <Footer />
    <SignIn />
  </>
);

export default App;
