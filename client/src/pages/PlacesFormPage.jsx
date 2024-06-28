import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, redirect, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage() {
    const {id} = useParams();

    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState();
    const [checkOut,setCheckOut] = useState();
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect,setRedirect] = useState(false);
    useEffect(()=>{
        if(!id)
            return;
        axios.get('/places/'+id).then(response =>{
            const {data}=response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })

    },[id]);

    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    function preInput(header,description){
        return(
            <>
                {inputHeader(header)}{inputDescription(description)}
            </>
        )
    }

    async function savePlace(e){
        e.preventDefault();
        const placeData = {title,address,photos:addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price}
        if(id){
            const {data} = await axios.put('/places',{id,...placeData});
            setRedirect(true);
        }else{
            const {data} = await axios.post('/places',placeData);
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div>
            <AccountNav/>
                    <form onSubmit={savePlace}>
                        {preInput('Title','Title for your place.Should be short and catchy')}                        
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title, for Eg. My lovely Apartment" />

                        {preInput('Address','Address of your property')}
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />

                        {preInput('Photos','More is better')}
                        <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
                        
                        {preInput('Description','Description of the place')}
                        <textarea value={description} onChange={e => setDescription(e.target.value)}/>

                        {preInput('Perks','Select all the perks of your place')}                     
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>
                        {preInput('Extra Info','House rules,etc.')}
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)}/>

                        {preInput('Check In & Out times, Max guests','Add check in and out times and remember to have a time window for cleaning time')}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <div>
                                <h3 className="mt-2 -mb-1">Check In Time</h3>
                                <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="14:00"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                                <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max Guests</h3>
                                <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)}/>
                            </div>                            
                            <div>
                                <h3 className="mt-2 -mb-1">Price per night</h3>
                                <input type="number" value={price} onChange={e => setPrice(e.target.value)}/>
                            </div>                            
                        </div>
                        <button className="primary mt-4">Save</button>
                    </form>
                </div>
    )
}