import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewProduct from './components/pages/ViewProduct.jsx';
import Products from './components/pages/Products.jsx';
import LandingPage from './components/pages/LandingPage';
import Registration from './components/pages/Registration.jsx';
import Login from './components/pages/Login.jsx';
import Orders from './components/pages/Orders.jsx';
import Logout from './components/pages/Logout.jsx';
import Profile from './components/pages/Profile.jsx';
import Settings from './components/pages/Settings.jsx';
import AboutUs from './components/pages/AboutUs.jsx';
import News from './components/pages/News.jsx';
import ContactUs from './components/pages/ContactUs.jsx';
import Cart from './components/pages/Cart.jsx';
import DeliveryOptions from './components/pages/DeliveryOptions.jsx';
import PickupConfirmation from './components/pages/PickUpConfirmation.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="/view-product/:id" element={<ViewProduct />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/news' element={<News />} />
        <Route path='/contactUs' element={<ContactUs />} />
        <Route path='/delivery-options' element={<DeliveryOptions/>}/>
        <Route path="/pickup-confirmation" element={<PickupConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
