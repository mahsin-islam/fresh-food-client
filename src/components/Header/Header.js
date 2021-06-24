import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';
import logo from '../../logo.png';

const Header = () => {
    const [loggedInUser] = useContext(UserContext)
    return (
        <Navbar expand="lg">
            <Navbar.Brand >
                <Link className='text-lime-green  text-decoration-none' to='/home'>
                    <img src={logo} alt="logo" style={{ width: '10rem', height:'4rem' }} className="logo" />
                </Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="ml-auto d-flex align-items-center">
                    <Link className='mx-2 text-lime-green text-decoration-none' to='/home'><h5>Home</h5></Link>
                    <Link className='mx-2 text-lime-green text-decoration-none' to='/orders'><h5>Orders</h5></Link>
                    <Link className='mx-2 text-lime-green text-decoration-none' to='/admin/manageProduct'><h5>Admin</h5></Link>
                    <Link className='mx-2 text-lime-green text-decoration-none' to='/deals'><h5>Deals</h5></Link>
                    {
                        loggedInUser.email && loggedInUser.displayName ? <Link to='/login' className='mx-2 text-lime-green text-decoration-none' >
                            {loggedInUser.photoURL ? <img src={loggedInUser.photoURL} style={{ width: "50%", borderRadius: "50%" }} alt="..." /> : <h5>{loggedInUser.displayName}</h5>}
                        </Link> : <Link className="mx-2 btn btn-success text-white px-4" to='/login'>Login</Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
