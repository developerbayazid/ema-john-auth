import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData/products.json';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // setProducts(fakeData.slice(0, 20));
        setProducts(fakeData);
    }, [])

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

    const productCartHandler = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const othersProduct = cart.filter(pd => pd.key !== product.key);
            newCart = [...othersProduct, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDb(product.key);
    }
    
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product showAddToCart={true} productCartHandler={productCartHandler} key={product.key} product={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/order"><button className='cart'>Review Order</button></Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;