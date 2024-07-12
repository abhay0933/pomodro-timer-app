import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import Signup from './components/Signup';
import Login from './components/Login';
import Pomodro from './components/Pomodro';

function App() {

  // useEffect(() => {
  //   // const unsubscribe = onAuthStateChanged(auth, (user) => {
  //   //   if (user) {
  //   //     window.location.href = "/timer";
  //   //   }
  //   // });

  //   return () => unsubscribe();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Signup />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/timer' element= {<Pomodro />} />
      </Routes>
    </Router>
  );
}

export default App;
