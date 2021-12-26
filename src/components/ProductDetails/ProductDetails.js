import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/products.json';
import Product from '../Product/Product';
import './ProductDetails.css';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div className='productDetails'>
            <h1>Your Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;