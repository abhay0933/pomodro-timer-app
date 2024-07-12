import React, { useState } from 'react';
import { FaEnvelope, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithGoogle } from '../utils/firebasecontainer';
import { onAuthStateChanged } from 'firebase/auth';

const SignUp = () => {
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [showpass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const showPassword = () => {
    setShowPass(!showpass);
  };

  const userSignUp = async () => {
    await createUserWithEmailAndPassword(auth, email, pass)
      .then((userInfo) => {
        notify('Account Created Successfully!');
      })
      .catch((err) => errorNotification('Enter Valid Email or Password!'));
  };

  const checkEmail = (e) => {
    setEmail(e.target.value);
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const status = pattern.test(email);
    setValidEmail(status);
  };

  const notify = (text) => {
    toast.success(text, {
      position: 'top-center',
    });
  };

  const errorNotification = (text) => {
    toast.error(text, {
      position: 'top-center',
    });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            navigate('/timer');
          }
        });
      })
      .catch((error) => {
        console.error('Google Sign-In Error: ', error);
      });
  };

  return (
    <div className='signupcontainer'>
      <ToastContainer />
      <div className='signupform'>
        <h2 style={{ textAlign: 'center' }}>New here? Sign Up Now</h2>
        <label className='form'>Email</label>
        <div className='signupemail'>
          <FaEnvelope className='emailicon' />
          <input
            type='text'
            placeholder='Enter Mail..'
            onChange={checkEmail}
            className={!validEmail && email.length > 0 ? 'validemail' : 'notvalid'}
          />
        </div>
        <label className='form'>Password</label>
        <div className='signuppass'>
          <RiLockPasswordFill className='passicon' />
          <input
            type={showpass ? 'text' : 'password'}
            placeholder='Enter Password..'
            onChange={(e) => setPass(e.target.value)}
          />
          <div onClick={showPassword}>
            {showpass ? <FaEyeSlash className='visibility' /> : <FaEye className='visibility' />}
          </div>
        </div>
        <div className='main-btn'>
          <button className='signupbtn' onClick={userSignUp}>
            Sign Up
          </button>
          <p className='alreadyhaveacc'>
            Already have an account{' '}
            <Link to={'/login'} className='redirecttologin'>
              <span>LogIn</span>
            </Link>{' '}
          </p>
        </div>
        <div className='orline'>
          <div className='line'></div>
          <p className='or'>OR</p>
          <div className='line'></div>
        </div>
        <div className='googlesignin' onClick={handleGoogleSignIn}>
          <FcGoogle className='googleicon' />
          <p style={{ color: 'white' }}>Sign In with Google</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
