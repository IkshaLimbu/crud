import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const [user, setUser] = useState({
        name: "",
        address: "",
        age: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    // Extract userId from URL path
    const userId = location.pathname.split("/")[2];
    console.log(userId);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Correct URL with template literal
                const res = await axios.get(`http://localhost:4004/user/${userId}`);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            // Correct URL with template literal
            await axios.put(`http://localhost:4004/user/` +userId, user);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h1>Update User Details</h1>
            <input 
                type='text' 
                placeholder='Name' 
                name="name" 
                value={user.name} 
                onChange={handleChange} 
            />
            <input 
                type='text' 
                placeholder='Address' 
                name="address" 
                value={user.address} 
                onChange={handleChange} 
            />
            <input 
                type='number' 
                placeholder='Age' 
                name="age" 
                value={user.age} 
                onChange={handleChange} 
            />
            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    );
}

export default Update;
