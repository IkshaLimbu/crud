import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const [users, setUsers] = useState({
        name: "",
        address: "",
        age: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsers(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4004/user", users);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    console.log(users);

    return (
        <div className='form'>
            <h1>Add new user</h1>
            <input 
                type='text' 
                placeholder='name' 
                name="name" 
                value={users.name} 
                onChange={handleChange} 
            />
            <input 
                type='text' 
                placeholder='address' 
                name="address" 
                value={users.address} 
                onChange={handleChange} 
            />
            <input 
                type='number' 
                placeholder='age' 
                name="age" 
                value={users.age} 
                onChange={handleChange} 
            />
            <button className='formButton' onClick={handleClick}>Add</button>
        </div>
    );
}

export default Add;
