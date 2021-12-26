import React from 'react';
import './Cart.css';

const Cart = (props) => {

    
    let total = 0;

    total = props.cart.reduce((total, product) => (total + (product.price * product.quantity)), 0);

    let shipping = 0;

    if (total > 550) {
        shipping = 0;
    } else if(total > 436) {
        shipping = 4.99;
    } else if(total > 310){
        shipping = 8.99;
    } else if(total > 255) {
        shipping = 9.99;
    } else if(total > 100){
        shipping = 12.99;
    } else if(total > 0){
        shipping = 14.99;
    }
    
    const formatNumber = num => {
        const newNumber = Number(num.toFixed(2));
        return newNumber;
    }

    const vatTax = total / (100 * 2);
    const grandTotal = formatNumber(total) + formatNumber(shipping) + formatNumber(vatTax);

    return (
        <div>
            <h2>Order Summary</h2>
            <p>Items Ordered: {props.cart.length}</p>
            <p><small>Product Price: ${formatNumber(total)}</small></p>
            <p><small>Shipping: ${formatNumber(shipping)}</small></p>
            <p><small>Tax + VAT: ${formatNumber(vatTax)}</small></p>
            <p>Total Price: ${formatNumber(grandTotal)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;