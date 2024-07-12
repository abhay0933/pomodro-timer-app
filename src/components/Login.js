import React, { useState, useEffect } from "react";
import { FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase/firebase";
import { signInWithGoogle } from "../utils/firebasecontainer";

const Login = () => {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigate("/timer");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const userLogin = () => {
    signInWithEmailAndPassword(auth, email, pass)
      .then(user => {
        notify("Login Successful");
      })
      .catch(err => errorNotification("Please Enter Valid Email or Password"));
  };

  const checkEmail = e => {
    setEmail(e.target.value);
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const status = pattern.test(email);
    setValidEmail(status);
  };

  const notify = text => {
    toast.success(text, {
      position: "top-center",
    });
  };

  const errorNotification = text => {
    toast.error(text, {
      position: "top-center",
    });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <div className='signupcontainer'>
      <ToastContainer />
      <div className='signupform'>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <label className='form'>Email</label>
        <div className='signupemail'>
          <FaEnvelope className='emailicon' />
          <input
            type='text'
            placeholder='Enter Mail..'
            onChange={checkEmail}
            className={
              !validEmail && email.length > 0 ? "validemail" : "notvalid"
            }
          />
        </div>
        <label className='form'>Password</label>
        <div className='signuppass'>
          <RiLockPasswordFill className='passicon' />
          <input
            type={showPass ? "text" : "password"}
            placeholder='Enter Password..'
            onChange={e => setPass(e.target.value)}
          />
          <div onClick={showPassword}>
            {showPass ? (
              <FaEyeSlash className='visibility' />
            ) : (
              <FaEye className='visibility' />
            )}
          </div>
        </div>
        <div className='main-btn'>
          <button className='signupbtn' onClick={userLogin}>
            Log In
          </button>
          <p className='alreadyhaveacc'>
            Don't have an account{" "}
            <Link to={"/"} className='redirecttologin'>
              <span>Sign Up</span>
            </Link>
          </p>
        </div>
        <div className='orline'>
          <div className='line'></div>
          <p className='or'>Or</p>
          <div className='line'></div>
        </div>
        <div className='googlesignin' onClick={handleGoogleSignIn}>
          <FcGoogle className='googleicon' />
          <p style={{ color: "white" }}>Sign In with Google</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
