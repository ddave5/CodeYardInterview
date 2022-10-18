import React, { useEffect, useState } from 'react'
import Footer from '../footer/Footer'
import './registration.css'
import Seen from '../../assets/fa-eye.png';
import UnSeen from '../../assets/fa-eye-slash.png';
import axios from 'axios';
import AcmeLogo from '../../assets/acme.png';
import ReactTooltip from 'react-tooltip';

//TODO: 
// - code refact

const Registration = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRemember, setRemember] = useState(false);
  const [loginPushed, setLoginPushed] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('loginDatas')) {
      setEmail(JSON.parse(localStorage.getItem('loginDatas')).email);
      setPassword(JSON.parse(localStorage.getItem('loginDatas')).password);
      setRemember(true);
    }
  }, [])


  const addPasswordLetter = (event) => {
    setPassword(event.target.value);
    passwordStrength(event.target.value);
  }

  const removeAll = () => {
    ['weak', 'okay', 'good', 'strong'].forEach((id) => {document.getElementById(id).classList.remove(id);})
  }

  const addClass = (id) => {
    document.getElementById(id).classList.add(id);
  }

  const passwordStrength = (pwCheck) => {

    //Ha 8 karakternél hosszabb, akkor weak
    //Ha tartalmaz nagy betűt is, akkor okay
    //Ha tartalmaz számot is, akkor good
    //Ha tartalmaz speciális karaktert is, akkor strong

    let specialCharacters = "!#$%&()*+,-./:;<>?@_".split('');
    
    removeAll()

    const stringArray = pwCheck.split('')

    if (stringArray.length < 7) return;
    addClass('weak');

    if (stringArray.filter( (char) => char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57).length === 0) return;
    addClass('okay');

    if (stringArray.filter( (char) => char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 132).length === 0 ) return;
    addClass('good');

    if (stringArray.filter( (char) => specialCharacters.includes(char)).length === 0) return;
    addClass('strong');
  }

  const authenticate = () => {
    axios.post('https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate', { "data": {
      "email": email,
      "password": password
    }})
    .then((response) => {
      if ('error' in response.data.result) {
        setError(response.data.result["error"]);
        document.getElementById('errorContainer').style.display = 'flex';
      } else {
        localStorage.setItem('user', JSON.stringify({...response.data["result"]}));

        isRemember ? localStorage.setItem('loginDatas', JSON.stringify({"email": email, "password": password})) 
                   : localStorage.setItem('loginDatas', JSON.stringify({"email": '', "password": ''}));

        window.location.href = '/home';
      }
    })
  }

  return (
    <div className="open">
      <ReactTooltip />
      <div className='background__image' />
        <div className='auth__container'>
          <div className='login__container ' data-aos="fade-right">
            <div className={`login__box margin-bottom-2rem ${loginPushed ? 'zoom__in' : ''}`} 
                 onAnimationEnd={() => {setLoginPushed(false)}}>
              <h1 className='margin-bottom-1rem'> Welcome to Acme.</h1>
              <h6 className='margin-bottom-2rem'> Create your account by filling the form bellow.</h6>
              <div className='login__form__container margin-bottom-2rem'>
                <div className='login__email__container'>
                  <label htmlFor='loginEmail' id='emailLabel' className='login__label'>Email</label>
                  <input id='loginEmail' type="text" value={email} data-tip="Try the 'test@codeyard.eu' word!"
                          name='loginEmail' placeholder='Enter your e-mail address here!' 
                          className='margin-bottom-1rem' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='passwordInput'>
                  <div className='login__password__container'>
                    <label htmlFor='loginPassword' id='passwordLabel' className='login__label' >Password</label>
                    <input id='loginPassword' type={passwordVisible ? "text" : "password"} value={password} 
                          name='loginPassword' className='margin-bottom-1rem' onChange={addPasswordLetter} data-tip="Try the 'letmein' word!"
                          />
                  </div>
                  <button id='showPassword' onClick={()=> setPasswordVisible(!passwordVisible)} className='login__passwordVisible__button'>
                    {passwordVisible ? 
                      <img id='showPasswordImg' src={Seen} alt='seen'/> :
                      <img id='showPasswordImg' src={UnSeen} alt='unseen'/> }
                  </button>
                  <span className='password__strength__container'>
                    <div id='weak' className='strength'/>
                    <div id='okay' className='strength'/>
                    <div id='good' className='strength'/>
                    <div id='strong' className='strength'/>
                  </span>
                  <div className='margin-bottom-2rem '>
                    <input id='rememberMe' type='checkbox' name='rememberMe' checked={isRemember} onChange={() => setRemember(!isRemember)}/>
                    <h5 className='register__rememberMe__label'>Remember me.</h5>
                  </div>
                  <div id='errorContainer' className='login__invalid__container margin-bottom-2rem'>
                    <h3>{error && error}</h3>
                  </div>
                  <input type="submit" value="Sign Up" onClick={authenticate}/>
                </div>
              </div>
            </div>
            <Footer/>
          </div>
          <div className='auth__context__container' >
          <div className='login__text' data-aos="fade-left">
            <img src={AcmeLogo} alt='acme_logo' className='margin-bottom-2rem'/>
            <h2 className='margin-bottom-2rem'>
              Do you already have an account?
            </h2>
            <h4 className='margin-bottom-2rem'> 
              That's awesome! You can Login by clicking on the button below. To skip this next time, you can ask us to remember your login credentials.
            </h4>
              <button className='login_button' onClick={() => {setLoginPushed(true)}}> Log in</button> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration