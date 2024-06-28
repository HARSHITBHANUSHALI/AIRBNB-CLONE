import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

const AccountPage = () => {
    const {user,ready,setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [redirect,setRedirect]=useState(null)
    
    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if(!ready){
        return 'Loading...';
        }
        
    if(ready && !user && !redirect){
        return navigate('/login');
    }
    
    if(redirect){
        return navigate(redirect);
    }
    
  return (
    <div>
        <AccountNav/>
        {subpage ==='profile' && (
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name} {user.email}<br/>
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        )}
        {subpage==='places' && (
            <PlacesPage/>
        )}
    </div>
  )
}

export default AccountPage
