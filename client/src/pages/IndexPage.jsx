import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const IndexPage = () => {
  const [places,setPlaces] = useState([]);
  useEffect(()=>{
    axios.get('/index').then(response =>{
      setPlaces([...response.data,...response.data,...response.data,...response.data]);
    });
  },[])
  
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length >0 && places.map(place=>(
        <Link to={'/place/'+place._id}>
            <div className="rounded-2xl mb-2 bg-gray-500 flex">
              {place.photos?.[0] && (
                <img className='rounded-2xl aspect-square dobject-cover'src={'http://localhost:4000/uploads/'+ place.photos?.[0]} alt="" />
              )}
            </div>
            <h2 className="font-bold truncate ">{place.address}</h2>
            <h3 className="text-sm">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">
                ₹{place.price} per night
              </span>;
            </div>
          </Link>
        ))}
    </div>
  )
}

export default IndexPage
