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
import Payment from './components/pages/Payment.jsx';
import DeliveryConfirmation from './components/pages/DeliveryConfirmation.jsx';
import ScrollToTop from './components/pages/ScrollToTop.jsx';
import BuildingMaterials from './components/pages/BuildingMaterials.jsx';
import PrecisionTools from './components/pages/PrecisionTools.jsx';
import Fabrication from './components/pages/Fabrication.jsx';
import PipesAndStructuralSteel from './components/pages/PipesAndStructuralSteel.jsx';
import DoorsAndPlates from './components/pages/DoorsAndPlates.jsx';
import AccessoriesAndSafetyGear from './components/pages/AccessoriesAndSafetyGear.jsx';
import ShoppingBasket from './components/pages/shoppingBasket.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import ThisWeekOrders from './components/Admin/ThisWeekOrders.jsx';
import AdminLogin from './components/Admin/AdminLogin.jsx';
import ManageProduct from './components/Admin/ManageProduct.jsx';
import ViewUsers from './components/Admin/ViewUsers.jsx';
import PendingOrder from './components/Admin/PendingOrder.jsx';
import OrderDetails from './components/Admin/viewOrderDetails.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
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
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/delivery-options' element={<DeliveryOptions/>}/>
        <Route path="/pickup-confirmation" element={<PickupConfirmation />} />
        <Route path='/paymentPage' element={<Payment/>}/>
        <Route path='/fabrication-tools' element={<Fabrication/>}/>
        <Route path='/precision-tools' element={<PrecisionTools/>}/>
        <Route path='/doors-plates' element={<DoorsAndPlates/>}/>
        <Route path='/Accessories-SafetyGear' element={<AccessoriesAndSafetyGear/>}/>
        <Route path='/building-materials' element={<BuildingMaterials/>}/>
        <Route path='/pipes-steel' element={<PipesAndStructuralSteel/>}/>
        <Route path='/deliveryconfirmation' element={<DeliveryConfirmation/>}/>
        <Route path='/shoppingBasket' element={<ShoppingBasket/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path="/admin/this-week-orders" element={<ThisWeekOrders />} />
        <Route path='/admin/manage-product' element={<ManageProduct/>}/>
        <Route path='/admin/view-users' element ={<ViewUsers/>}/>
        <Route path='/admin/pending-orders' element={<PendingOrder/>}/>
        <Route path='/admin/view-order-details/:orderId' element={<OrderDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
