import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { signoutfn } from '../utils/firebasecontainer'; 
// import { auth } from '../firebase/firebase'; 
import { useNavigate } from "react-router-dom";

const Pomodro = () => {
  const [time, setTime] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const totalTime = 25 * 60; 
  const breakTime = 5 * 60; 

  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      if (!onBreak) {
        setOnBreak(true);
        setTime(breakTime);
      } else {
        setIsActive(false);
        setOnBreak(false);
        setTime(totalTime);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time, onBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setOnBreak(false);
    setTime(totalTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    return ((totalTime - time) / totalTime) * 100;
  };

  const handleSignOut = async () => {
    try {
      await signoutfn();
      navigate("/login")
    } catch (error) {
      console.error("Sign-Out Error: ", error);
    }
  };

  return (
    <div className='home-container'>
      <div className='navBar'>
        <div className='heading'>
          <h3>Pomodro</h3>
        </div>
        <div className='logout-btn' style={{cursor: "pointer"}} onClick={handleSignOut}>
          <FaSignOutAlt />
          <p>Sign Out</p>
        </div>
      </div>
      <div className="pomodoro-timer">
        <div className="timer-circle">
          <div className="time">{formatTime(time)}</div>
        </div>
        <div className="start-stop-reset">
          <button className="start-button" onClick={toggleTimer}>
            {isActive ? 'STOP' : 'START'}
          </button>
          <button className="start-button" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pomodro;
