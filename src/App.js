import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";
import TapBar from "./components/Tapbar/TapBar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UploadProduct from "./pages/UploadProducts/UploadProduct";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload-products" element={<UploadProduct />} />
      </Routes>
      <TapBar />
    </div>
  );
}

export default App;
