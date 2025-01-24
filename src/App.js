import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header.jsx'
import LandingPage from './components/pages/LandingPage';
import Registration from './components/pages/Registration.jsx';
import Login from './components/pages/Login.jsx';
import Products from './components/pages/Products.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Coupons from './components/pages/Coupons.jsx';
import Orders from './components/pages/Orders.jsx';
import Logout from './components/pages/Logout.jsx';
import Profile from './components/pages/Profile.jsx';
import Settings from './components/pages/Settings.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path='/products' element={<Products/>}/>
        <Route path='/coupons' element={<Coupons/>}/>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='logout' element={<Logout/>}/>
      </Routes>
    </Router>
  );
}

export default App;
