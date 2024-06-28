import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import PlaceImg from "../PlaceImg";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";
import axios from "axios";
export default function PlacesPage(){
    const [places,setPlaces] = useState([]);
    useEffect(()=>{
        axios.get('/places').then(({data})=>{
            setPlaces(data);
        })
    },[])
    console.log(places);
    
    return(
        <div>
            <AccountNav/>
            <div className="text-center">
                List of all Added Pages<br/>
                <Link className='inline-flex bg-primary text-white py-2 px-6 rounded-full'to={'/account/places/new'}>
                <img src="/plusicon.svg" alt="" />
                    Add new places
                </Link>
            </div>
            <div className="mt-4">
                {places.length>0 && places.map(place =>
                    <Link to={'/account/places/'+ place._id}className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            <PlaceImg place={place}/>
                        </div>
                        <div className="grow-9 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}