import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { baseApiUrl } from '../config';

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`${baseApiUrl}/all`);
        //const result = await axios.get("http://localhost:8082/employee/all");
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`${baseApiUrl}/${id}`);
        loadUsers();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Index</th>
                            <th scope="col">Name</th>
                            <th scope="col">Title</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Image Url</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{user.name}</td>
                                <td>{user.jobTitle}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.imageUrl}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary mx-2"
                                        to={`/viewuser/${user.id}`} >
                                        View
                                    </Link>
                                    <Link className='btn btn-outline-primary mx-2'
                                        to={`/edituser/${user.id}`}>Edit</Link>
                                    <button
                                        className="btn btn-outline-danger mx-2"
                                        onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
