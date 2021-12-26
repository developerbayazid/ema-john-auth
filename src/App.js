import { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import NotMatch from "./components/NotMatch/NotMatch";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop/Shop';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="shop" />} />
        <Route path="shop" element={<Shop />} />
        <Route path="order" element={<Review />} />
        <Route path="inventory" element={
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>} 
        />
        <Route path="login" element={<Login />} />
        <Route path="shipment" element={
          <PrivateRoute>
            <Shipment />
          </PrivateRoute>} 
        />
        <Route path="product/:productKey/:productName" element={<ProductDetails />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
