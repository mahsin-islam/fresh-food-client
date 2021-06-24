import { faEdit, faPlusSquare, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation  } from 'react-router-dom';
import logo from '../../logo.png';
const Sidebar = () => {
    // let isActive = this.context.router.isActive(this.props.to, true);
    // let className = isActive ? "active" : "";
      //assigning location variable
      const location = useLocation();

      //destructuring pathname from location
      const { pathname } = location;
  
      //Javascript split method to get the name of the path in array
      const splitLocation = pathname.split("/");
      console.log(splitLocation)
    return (
        <div id="sidebar" className="active">
            <div className="sidebar-wrapper active">
                <div className="sidebar-header">
                    <div className="d-flex justify-content-between">
                        <div className="logo">
                            <a href="index.html">
                                <img src={logo} alt="logo" style={{ width: '14rem', height: '4rem'}} className="logo" /></a>
                        </div>
                        <div className="toggler">
                            <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                        </div>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">


                        <li className={splitLocation[2] === "manageProduct" ? "sidebar-item active" : "sidebar-item"} >
                            <Link to='/admin/manageProduct' className='sidebar-link'>
                                <FontAwesomeIcon icon={faTasks} className='mx-2' />
                                <span>Manage Products</span>
                            </Link>
                        </li>
                        <li className={splitLocation[2] === "addProduct" ? "sidebar-item active" : "sidebar-item"}>
                            <Link to='/admin/addProduct' className='sidebar-link'>
                                <FontAwesomeIcon icon={faPlusSquare} className='mx-2' />
                                <span>Add Product</span>
                            </Link>
                        </li>
                        <li className={splitLocation[2] === "editProduct" ? "sidebar-item active" : "sidebar-item"}>
                            <Link to='/admin/editProduct' className='sidebar-link'>
                                <FontAwesomeIcon icon={faEdit} className='mx-2' />
                                <span>Edit Product</span>
                            </Link>
                        </li>


                    </ul>
                </div>
                <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>
    );
};

export default Sidebar;