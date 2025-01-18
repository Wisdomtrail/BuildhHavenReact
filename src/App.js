import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header.jsx'
import LandingPage from './components/pages/LandingPage';
import Registration from './components/pages/Registration.jsx';
import Login from './components/pages/Login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
