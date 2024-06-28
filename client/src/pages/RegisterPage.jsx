import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
const RegisterPage = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function registerUser(ev){
        ev.preventDefault();
        try{
            const response = await axios.post('/register',{
                name,
                email,
                password
            });
            alert('Registration Successful. Now you can login.');
        }catch(err){
            alert('Registration failed. Please try again later.')
        }
        
                
    }
  return (
    <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="John Doe" 
                        value={name} 
                        onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="your@email.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}/>
                    <button className="primary" >Register</button>
                    <div className="text-enter py-2 text-gray-500">
                        Already have an account? <Link className="underline text-black"to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default RegisterPage
