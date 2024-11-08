import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import Navbar from './Navbar';
import Footer from './Footer';
import About from './About';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate(); 
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://expense-tracker-backend-2-2mum.onrender.com/api/auth/signup', user);
            alert('Signup successful!');
            console.log(response.data);
    
            // Store JWT token and username in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.user.username); 
    
            navigate('/dashboard'); 
        } catch (err) {
            console.error('Error signing up:', err.response.data);
            alert('Signup failed.');
        }
    };
    

    return (
        <>
        <Navbar/>
        <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} required />
                </div>
                <button type="submit">Signup</button>
            </form>
            <About/>
        <Footer/>
        </>
            
    );
};

export default Signup;
