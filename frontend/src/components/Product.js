import React from 'react'
import { Link } from 'react-router-dom'
// import Rating from './Rating'
// import './product.css'

const Product = ({ product }) => {
  return (
    <div className='heart-card'>
      <div className='heart-card-content'>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className='heart-product-img'
          />
        </Link>

        <Link to={`/product/${product._id}`}>
          <div className='heart-product-name'>{product.name}</div>
        </Link>

        <div className='heart-product-price'>₹{product.price}</div>
      </div>
    </div>
  )
}

export default Product
