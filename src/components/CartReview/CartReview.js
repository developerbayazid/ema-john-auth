import React from 'react';
import './CartReview.css';

const CartReview = (props) => {
    const {name, quantity, key, price} = props.product;
    return (
        <div className="review-item">
            <div className="review-item-left">
                <h3 className="product-name">{name}</h3>
                <p>Quantity: {quantity}</p>
                <p>Price: ${price}</p>
                <button onClick={() => props.removeProductHandler(key)} className="cart">Remove</button>
            </div>
        </div>
    );
};

export default CartReview;