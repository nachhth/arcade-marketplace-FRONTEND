import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/Header';
import TapBar from './components/Tapbar/TapBar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import Register from './pages/Register/Register';
import ProductPage from './pages/ProductPage/ProductPage';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products/:idProduct' element={<ProductPage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <TapBar />
    </div>
  );
}

export default App;
