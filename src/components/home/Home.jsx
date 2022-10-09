import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./home.css"

const Home = () => {

  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect( () => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    } else {
      window.location.href = '/authError';
    }
    
  }, [])

  const logOut = () => {
    localStorage.removeItem('user');
    window.location.href = '/'
  }

  return (
    <div className='home__container'>
      <div className='home__background__image'/>
      <div className='home__title'>
        {user && <span className='stroke'>Üdvözöllek {user.name}</span>}
        <div>
          <button onClick={logOut} className="back__to__login__button"> Kijelentkezés</button>
        </div>
      </div>
    </div>
  )
}

export default Home