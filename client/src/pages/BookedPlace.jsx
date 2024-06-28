import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import PhotosGallery from "../PhotosGallery";
import BookingDates from "../BookingDates";

const BookedPlace = () => {
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
    useEffect(()=>{
      if(id){
        axios.get('/bookings').then(response =>{
          const foundBooking = response.data.find(({_id})=>_id ===id);
          if(foundBooking)
            setBooking(foundBooking);
        })
      }
    },[id])
    if(!booking){
      return null;
    }
  return (
    <div className="my-3">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
      <div className="flex items-center justify-between bg-gray-200 rounded-2xl p-6 mb-6">
        <div>
          <h2 className="text-2xl mb-4">Your Booking Information:</h2>
          <BookingDates booking={booking}/>
        </div>
        <div className="bg-primary text-center text-white rounded-2xl p-4">
          <div>Total Price:</div>
          <div className="text-3xl">₹{booking.price}</div>
        </div>
      </div>
      <PhotosGallery place={booking.place}/>
    </div>
  )
}

export default BookedPlace
