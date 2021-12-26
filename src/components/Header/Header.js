import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="shop">Shop</Link>
                <Link to="order">Order</Link>
                <Link to="inventory">Inventory</Link>
                {loggedInUser.email && <button onClick={() => setLoggedInUser({})}>Sign Out <span style={{fontWeight: 'bold'}}>{loggedInUser?.name}</span></button>}
            </nav>
        </div>
    );
};

export default Header;