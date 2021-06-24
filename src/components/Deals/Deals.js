import React from 'react';

const Deals = () => {
    document.title = 'Deals';
    const addBanner = 'https://i.ibb.co/ZdsV0MX/af9cb7cdfe045e0cfc363d0f49a1b176.jpg';
    return (
        <div className="card mb-3 h-100 col-8 mx-auto">
            <img src={addBanner} className="card-img-top w-100" style={{height:"40rem"}} alt="..." />
            <div className="card-body">
                <h5 className="card-title">Get Grocery Deals</h5>
                <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <p className="card-text"><small className="text-muted">Grab within 1 weeks..!</small></p>
            </div>
        </div>
    );
};

export default Deals;