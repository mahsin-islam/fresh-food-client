import React, { useContext } from 'react';
import { UserContext } from '../../App';

const Profile = ({ signOut }) => {
    document.title = 'Profile';
    const [loggedInUser] = useContext(UserContext)
    return (
        <div className='container col-lg-4 col-md-6 col-sm-12 text-center mt-5'>
            <h2 className='text-lime-green'>Your Profile</h2>
            <div className="card text-left">
                <img src={loggedInUser.photoURL} alt="" />
                <div className="card-body">
                    <h4>Name: {loggedInUser.displayName}</h4>
                    <h4>Email: {loggedInUser.email}</h4>
                </div>
                <button className='btn btn-success text-white w-100 rounded-0' onClick={signOut}>Sign Out</button>
            </div>
        </div>
    );
};

export default Profile;