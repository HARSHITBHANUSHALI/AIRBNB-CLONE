import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import PhotosGallery from "../PhotosGallery";
import AddressLink from "../AddressLink";
export default function PlacesFromIndexPage(){
    const {id} = useParams();
    const [place,setPlace] = useState([]);
    
    useEffect(()=>{
        if(!id)
            return;
        else{
            axios.get('/placefromindex/'+id).then(response=>{
                setPlace(response.data);
                console.log(place);
            })
        }
    },[id]);

    

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PhotosGallery place={place}/>
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check In: {place.checkIn}<br/>
                    Check Out: {place.checkOut}
                    Max number of Guests: {place.maxGuests}
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div>
                <div className="bg-white -mx-8 px-8 py-8 border-t">
                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                    <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
                </div>
            </div>
        </div>
    )
}