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
import ViewProduct from './components/pages/ViewProduct.jsx';
import AboutUs from './components/pages/AboutUs.jsx';
import News from './components/pages/News.jsx';
import ContactUs from './components/pages/ContactUs.jsx';


const product = {
  images: [
    "https://res.cloudinary.com/dcsvykbiw/image/upload/v1738247724/product_images/ezqipzvbwbycpzav8twf.jpg",
    "https://res.cloudinary.com/dcsvykbiw/image/upload/v1738247724/product_images/ezqipzvbwbycpzav8twf.jpg",
    "https://res.cloudinary.com/dcsvykbiw/image/upload/v1738247724/product_images/ezqipzvbwbycpzav8twf.jpg",
  ],
  title: "Stylish Sneakers",
  description: "High-quality sneakers with a comfortable fit and modern design.",
  price: 89.99,
};


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
        <Route path='/viewProduct' element={ <ViewProduct product={product} />}/>
        <Route path='/aboutUs' element={<AboutUs/>}/>
        <Route path='/news' element={<News/>}/>
        <Route path='/contactUs' element={<ContactUs/>}/>
      </Routes>
    </Router>
  );
}

export default App;
