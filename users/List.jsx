import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../_services';

function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Users</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '8%' }}>order_id</th>
                        <th style={{ width: '30%' }}>customer_id</th>
                        <th style={{ width: '30%' }}>order_date</th>
                        <th style={{ width: '10%' }}>shipping_date</th>
                        <th style={{ width: '10%' }}>product_id</th>
                        <th style={{ width: '30%' }}>product_name</th>
                        <th style={{ width: '30%' }}>product_category</th>
                        <th style={{ width: '30%' }}>name</th>
                        <th style={{ width: '10%' }}>gender</th>
                        <th style={{ width: '10%' }}>street_address</th>
                        <th style={{ width: '30%' }}>city</th>
                        <th style={{ width: '30%' }}>state</th>
                        <th style={{ width: '30%' }}>postal_code</th>
                        <th style={{ width: '10%' }}>country</th>
                        <th style={{ width: '10%' }}>year_of_birth</th>
                        <th style={{ width: '30%' }}>description</th>
                        <th style={{ width: '30%' }}>data_collected</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id} </td>
                            <td>{user.customer_id}</td>
                            <td>{user.order_date}</td>
                            <td>{user.shipping_date} </td>
                            <td>{user.product_id}</td>
                            <td>{user.product_name}</td>
                            <td>{user.product_category} </td>
                            <td>{user.name}</td>
                            <td>{user.gender}</td>
                            <td>{user.street_address} </td>
                            <td>{user.city}</td>
                            <td>{user.state}</td>
                            <td>{user.postal_code}</td>
                            <td>{user.country}</td>
                            <td>{user.year_of_birth} </td>
                            <td>{user.description}</td>
                            <td>{user.data_collected}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };