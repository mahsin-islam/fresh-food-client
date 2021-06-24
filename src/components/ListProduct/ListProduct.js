import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const ListProduct = ({ product }) => {
    const { name, price, _id, quantity } = product;
    const history = useHistory();
    const deleteProduct = id => {
        fetch(`https://gentle-tundra-44730.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
              
                    alert('Your product deleted successfully!');
                    history.push(`/admin/manageProduct`);
             
            })
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{price}</td>
            <td>{quantity}</td>

            <td>
                <Link to={`/editProduct/${_id}`}><span className="fas fa-trash fs-4 px-4 text-success"><FontAwesomeIcon icon={faPen} /></span></Link>

                <span className="fas fa-trash fs-4 text-danger" onClick={() => deleteProduct(_id)}><FontAwesomeIcon icon={faTrash} />
                </span>
            </td>
        </tr>

    );
};

export default ListProduct;