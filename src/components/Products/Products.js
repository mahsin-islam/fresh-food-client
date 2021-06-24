import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const data = await axios('https://gentle-tundra-44730.herokuapp.com/products');
            setLoading(false)
            return data;
        }
        fetchData().then(data => setProducts(data.data))
    }, [])

    return (
        <>
            {
                loading && <div className="spinner-border text-lime-green" role="status" id="loader">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
            <div className='container mt-3'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-lg-9'>
                        <div className='row row-cols-1 row-cols-md-3 g-4'>
                            {
                                products.map(product => <Product key={product._id} product={product} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;