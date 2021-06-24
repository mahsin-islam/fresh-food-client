import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Products from '../Products/Products';

const Home = () => {
    document.title = 'Home';
    const [search, setSearch] = useState('');
    const [product, setProduct] = useState([]);
    const handleChange = event => {
        const search = (event.target.value);
        setSearch(search);
    }

    useEffect(() => {
        console.log(search)
        const fetchData = async () => {
            const url = `https://gentle-tundra-44730.herokuapp.com/product?name=${search}`;
            const data = await axios(url);
            return data;
        }
        fetchData()
            .then(data => {
                if (data?.data) {
                    setProduct(data?.data)
                }
                else (
                    setProduct(null)
                )
            })
    }, [search])

    return (
        <div classnames='container'>
            <div className="d-flex justify-content-center my-3">
                <input type="text" className='w-50' onBlur={handleChange} placeholder='Search for ...' />
                <button className='btn btn-success rounded-0'>Search</button>
            </div>
            <div className='container mt-3'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-lg-9'>
                        <div className='row row-cols-1 row-cols-md-3 g-4'>
                            {
                                product ? product.map(pd => <Product key={product._id} product={pd} />) : <h1 className='text-danger text-center'>nothing found</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Products />
        </div>
    );
};

export default Home;