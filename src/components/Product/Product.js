import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    const {name, img, seller, price, stock, key} = props.product;
    return (
        <div className="product">
            <div className="product-img product-left">
                <img src={img} alt="" />
            </div>
            <div className="product-right">
                <h4 className="product-name"><Link to={`/product/${key}/${name}`}>{name}</Link></h4>
                <p>by: {seller}</p>
                <br />
                <p>${price}</p>
                <p>only {stock} left in stock - order soon</p>
                {props.showAddToCart === true && <button
                 className="cart" onClick={() => props.productCartHandler(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;