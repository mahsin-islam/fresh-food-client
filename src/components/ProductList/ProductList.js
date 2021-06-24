import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListProduct from '../ListProduct/ListProduct';
import './ProduclList.css';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const data = await axios('https://gentle-tundra-44730.herokuapp.com/products');
            setLoading(false)
            return data;
        }
        fetchData().then(data => setProductList(data?.data))
    }, []);

    return (
        <div className="page-heading">
            <div className="page-title">
                <div className="row">
                    <div className="col-12 col-md-6 order-md-1 order-last">
                        <h3>Manage Product</h3>
                    </div>
                    <div className="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Manage Product</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="card">

                    <div className="card-body" >

                        <table className="table table-striped" id="table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {
                                loading && <div className="spinner-border text-lime-green" role="status" id="loader">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                            <tbody>

                                {
                                    productList.map(product => <ListProduct key={product._id} product={product} />)
                                }


                            </tbody>
                        </table>

                    </div>
                </div>

            </section>

        </div>
    );
};

export default ProductList;