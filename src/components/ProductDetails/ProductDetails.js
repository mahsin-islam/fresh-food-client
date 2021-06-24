import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

const DetailsPage = () => {
    document.title = 'Details';
    const { id } = useParams();
    const [product, setProduct] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios(`https://daily-grocery-server.herokuapp.com/product/${id}`);
            return data;
        }
        fetchData().then(data => setProduct(data?.data))

    }, [id])
    const { name, imageURL, price, _id, description, quantity } = product;
    const history = useHistory()
    const handleOrder = () => {
        history.push(`/product/${_id}`);
    }

    return (
        <div className='container'>
            <div className="card mt-5">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className='w-100' src={imageURL} alt={name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body text-dark">
                            <h4 className="card-title">{name}</h4>
                            <h5 className="card-title">Products Left : {quantity}</h5>
                            <h5 className="card-text">৳{price}</h5>
                            <p>{description}</p>
                            <button className='btn btn-danger' onClick={handleOrder}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;