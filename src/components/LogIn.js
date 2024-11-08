import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import Navbar from './Navbar';
import Footer from './Footer';
import About from './About';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate(); 
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://expense-tracker-backend-2-2mum.onrender.com/api/auth/login', credentials);
            alert('Login successful!');
            console.log(response.data);
            
            // Store JWT token and username in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.user.username); 
    
            navigate('/dashboard'); 
        } catch (err) {
            console.error('Error logging in:', err.response.data);
            alert('Login failed.');
        }
    };
    

    return (
        <>
        <Navbar/>
         <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <About/>
            <Footer/>
        </>
        
           
        
    );
};

export default Login;
