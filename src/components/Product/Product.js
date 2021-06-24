import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { name, imageURL, price, _id } = product;
    const history = useHistory()
    const handleOrder = () => {
        history.push(`/product/${_id}`);
    }
    return (
        <div className='col'>
            <div className='card shadow bg-white'>
                <img src={imageURL} alt='chmLeague' style={{ height: '18rem' }} className="card-img-top" />
                <div className='card-body text-center'>
                    <h6 className='card-title'><Link to={`/details/${_id}`} className="fw-bolder text-decoration-none text-dark">{name}</Link></h6>
                </div>
                <div className="text-center pb-3">
                    <p className='card-text float-start ms-3 fs-3 text-lime-green mb-0 fw-bolder'><strong>৳</strong> {price}</p>
                    <button className='btn btn-success float-end mx-3' onClick={handleOrder}>Buy Now </button>
                </div>
            </div>
        </div>
    );
};

export default Product;