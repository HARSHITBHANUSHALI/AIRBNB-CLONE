import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios";
import { UserContext } from "../UserContext";
const LoginPage = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[redirect,setRedirect]=useState(false);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    async function handleLogin(e){
        e.preventDefault();
        try{
            const {data} = await axios.post('/login',{email,password});
            
            setUser(data);
            alert('Login Successful');
            setRedirect(true);
        }catch(err){
            alert('Login Failed.');
        }

    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                    <input type="email" placeholder="your@email.com" 
                        value={email} 
                        onChange={e=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="password" 
                        value={password} 
                        onChange={e=>setPassword(e.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-enter py-2 text-gray-500">
                        Don't have an account? <Link className="underline text-black"to={'/register'}>Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
