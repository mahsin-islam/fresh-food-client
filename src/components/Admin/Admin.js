import React from 'react';
import './Admin.css';
import './DataTable.css';
// import './AdminBootdtap.css';

import { useParams } from 'react-router';
import Sidebar from '../Sidebar/Sidebar';
import AddProduct from '../AddProduct/AddProduct';
import ProductList from '../ProductList/ProductList';
const Admin = () => {
    document.title = 'Admin';
    const { options } = useParams();
    return (
        <div id="app">
            <Sidebar></Sidebar>
            <div id="main">
                <header className="mb-3">
                    <a href="/" className="burger-btn d-block d-xl-none">
                        <i className="bi bi-justify fs-3"></i>
                    </a>
                </header>

                {
                    options === 'addProduct' && <AddProduct/>
                }
                {
                    options === 'admin' && <h1 className='text-lime-green text-center'>Admin dashbord</h1>

                }
                {
                    options === 'manageProduct' && <ProductList/>
                }
                {
                    options === 'editProduct' && <h1 className='text-lime-green text-center'>You haven't selected the product</h1>
                }
            </div>
        </div>
    );
};

export default Admin;