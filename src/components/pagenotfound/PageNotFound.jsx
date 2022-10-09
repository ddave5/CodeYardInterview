import React from 'react'
import BackToLogin from '../backtologin/BackToLogin';
import './pagenotfound.css';

const PageNotFound = () => {

  return (
    <div className='page__not__found__container'> 
      <div className='page__not__found__background'/>
      <div className='page__not__found__title'>
        <span className='stroke'>Sajnáljuk, de nem találtunk ilyen oldalt.</span>
        <BackToLogin/>
      </div>
    </div>
  )
}

export default PageNotFound