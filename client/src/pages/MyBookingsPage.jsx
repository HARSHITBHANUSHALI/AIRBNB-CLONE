import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios";
import PlaceImg from "../PlaceImg";
import {differenceInCalendarDays, format} from 'date-fns';
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";
export default function MyBookingsPage(){
    const [bookings,setBookings] = useState([]);
    useEffect(()=>{
        axios.get('/bookings').then((response)=>{
            setBookings(response.data);
        })
    },[]);
    return(
        <div>
            <AccountNav/>
            <div>
                {bookings?.length>0 && bookings.map(booking=>(
                    <Link to={`/account/bookings/${booking._id}`} className="flex my-3 gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-48 flex">
                            <PlaceImg place={booking.place}/>
                        </div>
                        <div className="py-2">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <div className="flex items-center gap-3">
                                <BookingDates booking={booking} className={'text-lg border-t border-gray-300 mt-2 py-2'}/>
                                
                                <div className="flex border-l-2 border-gray-500 p-4 justify-center text-xl">
                                    <img className='' src="/money.svg" alt=""/>Total Price: ₹{booking.price}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}