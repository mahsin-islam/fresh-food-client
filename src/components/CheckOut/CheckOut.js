import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';
import './CheckOut.css'

const CheckOut = () => {
    document.title = 'Check Out';
    const { id } = useParams();
    const [orderItem, setOrderItem] = useState({})
    const { register, handleSubmit, errors } = useForm();
    const [loggedInUser] = useContext(UserContext)
    const history = useHistory()
    const onSubmit = data => {
        const orderDetails = { userName: loggedInUser.displayName, userEmail: loggedInUser.email, product: orderItem, shipment: data, orderTime: new Date() }
        fetch('https://gentle-tundra-44730.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Your order placed successfully')
                    history.push(`/home`);
                }
            })

    };
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios(`https://gentle-tundra-44730.herokuapp.com/product/${id}`);
            return data;
        }
        fetchData().then(data => setOrderItem(data?.data))
    }, [id])

    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12">
                        <div className="box">
                            <h2 className="box-title text-lime-green">Checkout</h2>
                            <div className="my-3 bg-white d-flex justify-content-around">
                                <div className="col-md-6"><h5>Ordered Item</h5></div>
                                <div className="col-md-3"><h5>Quantity</h5></div>
                                <div className="col-md-3"><h5>Price</h5></div>
                            </div>
                            <div className="bg-white d-flex justify-content-around">
                                <div className="col-md-6"><h5>{orderItem.name}</h5></div>
                                <div className="col-md-3"><h5>1</h5></div>
                                <div className="col-md-3"><h5>৳{orderItem.price}</h5></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-5 col-xs-12">
                        <div className="widget">
                            <h4 className="widget-title text-lime-green">Order Summary</h4>
                            <div className="summary-block">
                                <div className="summary-content">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="col-md-12 form-group">
                                            <input type="text" id="name" defaultValue={loggedInUser.displayName} className="form-control"
                                                name="name" placeholder="Enter Name" />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <input type="email" defaultValue={loggedInUser.email} id="email" className="form-control"
                                                name="email" placeholder="Enter Email" />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <input type="text" id="address" className="form-control"
                                                name="address" placeholder="Enter Address" />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <input type="text" id="phone" className="form-control"
                                                name="phone" placeholder="Enter Phone" />
                                        </div>
                                        <div className="col-sm-12 d-flex justify-content-end">
                                            <button type="submit"
                                                className="btn btn-success me-1 mb-1">Checkout</button>
                                        </div>
                                    </form>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckOut;