import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    document.title = 'Previous Orders';
    const [loggedInUser] = useContext(UserContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const data = await axios(`https://gentle-tundra-44730.herokuapp.com/orders?email=${loggedInUser.email}`);
            setLoading(false)
            return data;
        }
        fetchData().then(data => setOrders(data?.data))
    }, [loggedInUser.email])

    return (
        <>
            <h2 className='text-center text-lime-green'>Your Previous Orders: {orders.length} </h2>
            <div className="col-md-8 mx-auto text-center">
                <div className="row border border-secondary ">
                    <div className="col-md-6"><h3>Ordered Items</h3></div>
                    <div className="col-md-6"><h3>Order Placed on</h3></div>
                </div>
                {
                    loading && <div className="row my-5">
                        <div className="spinner-border text-danger mx-auto" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                }
                {
                    orders.map(order => <div className="row my-2 py-2 bg-white" key={order._id}><div className="col-md-6"><h5>{order.product.name}</h5></div> <div className="col-md-6"><h5>{(new Date(order.orderTime).toDateString('dd/mm/yyyy'))}</h5></div></div>)
                }
            </div>
        </>
    );
};

export default Orders;