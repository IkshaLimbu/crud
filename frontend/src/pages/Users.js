import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:4004/user");
                setUsers(res.data);
                console.log(users)
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllUsers();
    }, []);

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:4004/user/" + id)
            window.location.reload()
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1> All users</h1>
            <div className='users'>
                {users.map((user) => (
                    <div className='user' key={user.id}>
                        <h3>{user.name}</h3>
                        <h3>{user.address}</h3>
                        <h3>{user.age}</h3>
                        <button className='delete' onClick={()=> handleDelete(user.id) }> Delete</button>
                        <button className='update'> <Link to={'/update/${user.id}'}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button className='fromButton'> <Link to='/add'>Add new use</Link>r</button>
        </div>
    );
}

export default Users;
