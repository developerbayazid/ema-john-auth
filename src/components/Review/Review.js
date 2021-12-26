import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fakeData from '../../fakeData/products.json';
import HappyImage from '../../images/giphy.gif';
import { deleteFromDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import CartReview from '../CartReview/CartReview';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [placeOrder, setPlaceOrder] = useState(false);

    const navigate = useNavigate();

    const proceedCheckoutHandler = (e) => {
        // setCart([]);
        // clearTheCart();
        // setPlaceOrder(true);
        navigate('/shipment');
        e.preventDefault();
    }

    let thankYou;
    if(placeOrder){
        thankYou = <img src={HappyImage} alt="" />
    }

    const removeProductHandler = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        deleteFromDb(productKey);
    }
    
    useEffect(() => {
        const cartsProduct = getStoredCart();
        const productKeys = Object.keys(cartsProduct);
        const products = productKeys.map(key => {
            const cartProduct = fakeData.find(product => product.key === key);
            cartProduct.quantity = cartsProduct[key];
            return cartProduct;
        });
        setCart(products);
    }, [])

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    cart.map(product => <CartReview removeProductHandler={removeProductHandler} key={product.key} product={product}></CartReview>)
                }
                { thankYou }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/order"><button onClick={proceedCheckoutHandler} className='cart'>Proceed Checkout</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;