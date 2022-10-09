import './App.css';
import Registration from './components/registration/Registration';
import Home from '../src/components/home/Home'
import {Routes, Route} from 'react-router-dom'
import PageNotFound from './components/pagenotfound/PageNotFound';
import AuthError from './components/authError/AuthError';

function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Registration/>} />
        <Route path='/authError' element={<AuthError/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
