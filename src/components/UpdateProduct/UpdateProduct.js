import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './UpdateProduct.css'

const UpdateProduct = () => {
    document.title = 'Update Product';
    const { id } = useParams();
    // const { register, handleSubmit, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [updateItem, setUpdateItem] = useState({});
    const history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios(`https://gentle-tundra-44730.herokuapp.com/product/${id}`);
            return data;
        }
        fetchData().then(data => setUpdateItem(data?.data))
    }, [id])

    // const onSubmit = data => {
    //     const UpdateData = {
    //         name: data.name,
    //         imageURL: imageURL || data.imageURL,
    //         price: data.price,
    //         description: data.description,
    //         quantity: data.quantity
    //     }
    //     fetch(`https://gentle-tundra-44730.herokuapp.com/update/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(UpdateData)
    //     })
    //     history.push(`/admin/manageProduct`);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://gentle-tundra-44730.herokuapp.com/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('Your Product is successfully updated');
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
                setUpdateItem({ ...updateItem, [key]: response.data.data.display_url })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleOnBlur = (e) => {
        const newItem = updateItem;
        newItem[e.target.name] = e.target.value;
        console.log(newItem)
        setUpdateItem(newItem);
    }

 
    return (
        <div id="app">
            <Sidebar></Sidebar>
            <div id="main">
                <header className="mb-3">
                    <Link to="/home" className="burger-btn d-block d-xl-none">
                        <i className="bi bi-justify fs-3"></i>
                    </Link>
                </header>

                <div className="page-heading">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Update Product</h3>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Update Product</li>
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
                                            <form onSubmit={handleSubmit} className="form from-style" >
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-group">
                                                            <label for="name">Product Name</label>
                                                            <input type="text" id="name" className="form-control"
                                                                defaultValue={updateItem.name}  name="name" onBlur={handleOnBlur} />

                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-group">
                                                            <label for="price">Product Price</label>
                                                            <input type="text" id="price" type="number" step="0.01" className="form-control" defaultValue={updateItem.price}
                                                                placeholder="Product Price" name="price" onBlur={handleOnBlur} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-group">
                                                            <label for="description">Description</label>
                                                            <input type="text" id="description" className="form-control" defaultValue={updateItem.description}
                                                                placeholder="Description" name="description" onBlur={handleOnBlur} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-group">
                                                            <label for="quantity">Quantity</label>
                                                            <input type="text" id="quantity" className="form-control" type="number" defaultValue={updateItem.quantity}
                                                                name="quantity" placeholder="Quantity" onBlur={handleOnBlur} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-group">
                                                            <label for="formFile" className="form-label">Add Photo</label>
                                                            <input className="form-control" type="file" 
                                                             id="imageURL" name="imageURL" onChange={handleImageUpload} />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 d-flex justify-content-end">
                                                        <button type="submit"
                                                            className="btn btn-success me-1 mb-1" value='Add'>Update</button>
                                                   
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
            </div>
        </div>
    );
};

export default UpdateProduct;