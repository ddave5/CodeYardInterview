import React from 'react'
import './backToLogin.css'
import { useNavigate } from 'react-router-dom';

const BackToLogin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/')} className="back__to__login__button"> Vissza a bejelentkezéshez</button>
    </div>
  )
}

export default BackToLogin