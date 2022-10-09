import React from 'react'
import './authError.css'
import BackToLogin from '../backtologin/BackToLogin';

const AuthError = () => {
  return (
    <div className='auth__error__container'>
      <div className='auth__error__background'/>
      <div className='auth__error__title'>
        <span className='stroke'>Sajnáljuk, de nincs jogosultsága az oldal megtekintéséhez.</span>
        <BackToLogin/>
      </div>
    </div>
  )
}

export default AuthError