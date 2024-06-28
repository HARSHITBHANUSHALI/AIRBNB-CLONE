import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [mobile,setMobile] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(user){
            setName(user.name);
        }
    },{user})
    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
    }
    async function bookThisPlace (){
        try{
            const data = {
                place:place._id,
                checkIn,checkOut,numberOfGuests,name,mobile,
                price:numberOfNights*place.price
            };
            const response = await axios.post('/booking',data);
            const bookingId = response._id;
            setRedirect(`/account/bookings/${bookingId}`);

        }catch(err){
            console.log(err);
        }
        
        
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ₹{place.price} / per night 
            </div>
            <div className="border rounded-2xl">
                <div className="flex justify-center">
                    <div className="flex gap-1 py-2 px-2">
                        <label>Check In:</label>
                        <input type="date" 
                            value={checkIn} 
                            onChange={e=>setCheckIn(e.target.value)}/>
                    </div>
                    <div className="flex border-l py-2 px-2 gap-1">
                        <label>Check Out:</label>
                        <input type="date" 
                            value={checkOut} 
                            onChange={e=>setCheckOut(e.target.value)}/>
                    </div>
                </div>
                <div className="border-t p-2">
                    <label>Number of Guests:</label>
                    <input type="number" 
                        value={numberOfGuests} 
                        onChange={e=>setNumberOfGuests(e.target.value)}/>
                
                    {numberOfNights>0 && (
                        <div>
                            <label>Your Full Name:</label>
                            <input type="text"
                                value={name}
                                onChange={e=>setName(e.target.value)}
                            />
                            <label>Mobile Number:</label>
                            <input type="tel"
                                value={mobile}
                                onChange={e=>setMobile(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <button onClick={bookThisPlace} className="primary mt-4">
                Book
                {numberOfNights>0 && (
                    <span>
                        ₹ {numberOfNights * place.price}
                    </span>
                )}
            </button>
        </div>
    )
}