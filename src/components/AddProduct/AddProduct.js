import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
const AddProduct = () => {
    document.title = 'Add Product';
    // const [imageURL, setImageURL] = useState(null);
    const history = useHistory();

    const [product, setProduct] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://gentle-tundra-44730.herokuapp.com/addProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                alert('Your Product is successfully added');
                history.push(`/admin/manageProduct`);
            })
    }

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '313cff6eb44f249ea253c21e251842bd');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                console.log(response.data.data.display_url);
                // URL.createObjectURL(event.target.files[0])
                // setImageURL(response.data.data.display_url);
                const key = event.target.name;
                setProduct({ ...product, [key]: response.data.data.display_url })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleOnBlur = (e) => {
        const newProduct = product;
        newProduct[e.target.name] = e.target.value;
        console.log(newProduct)
        setProduct(newProduct);
    }

    return (
        <div className="page-heading">
            <div className="page-title">
                <div className="row">
                    <div className="col-12 col-md-6 order-md-1 order-last">
                        <h3>Add Product</h3>
                    </div>
                    <div className="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Add Product</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section id="multiple-column-form">
                <div className="row match-height">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} className="form">
                                        <div className="row">
                                            <div className="col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="name">Product Name</label>
                                                    <input type="text" id="name" className="form-control"
                                                        placeholder="Product Name" name="name" onBlur={handleOnBlur} />
                                                   
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="price">Product Price</label>
                                                    <input type="text" id="price" type="number" step="0.01"  className="form-control"
                                                        placeholder="Product Price" name="price" onBlur={handleOnBlur} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="description">Description</label>
                                                    <input type="text" id="description" className="form-control"
                                                        placeholder="Description" name="description" onBlur={handleOnBlur} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="quantity">Quantity</label>
                                                    <input type="text" id="quantity" type="number" className="form-control"
                                                        name="quantity" placeholder="Quantity" onBlur={handleOnBlur}/>
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="quantity">Image URL</label>
                                                    <input type="text" id="imageURL" className="form-control"
                                                        name="imageURL" placeholder="Image URL" onBlur={handleOnBlur}/>
                                                </div>
                                            </div> */}
                                            <div className="col-md-6 col-12">
                                                <div className="form-group">
                                                <label for="formFile" className="form-label">Add Photo</label>
                                                <input className="form-control" type="file" id="imageURL" name="imageURL" onChange={handleImageUpload} />
                                                </div>
                                            </div>
                                            
                                            <div className="col-12 d-flex justify-content-end">
                                                <button type="submit"
                                                    className="btn btn-success me-1 mb-1" value='Add'>Submit</button>
                                           
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default AddProduct;