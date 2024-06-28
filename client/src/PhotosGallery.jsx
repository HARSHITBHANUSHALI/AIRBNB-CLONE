import { useState } from "react";

const PhotosGallery = ({place}) => {
    const [showAllPhotos,setShowAllPhotos] = useState(false);
    if(!place) return '';
    if(showAllPhotos){
        return(
            <div className="absolute inset-0 bg-black text-white min-w-full min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-40">Photos of {place.title}</h2>
                        <button onClick={()=>setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black text-black">
                            <img src="/close.svg" alt="" />
                            Close
                        </button>
                    </div>
                    {place?.photos?.length>0 && place.photos.map(photo => (
                        <div key={photo}>
                            <img src={`http://localhost:4000/uploads/${photo}`} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
  return(
    <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
            <div>
                {place.photos?.[0] && (
                    <div >
                        <img onClick={()=>setShowAllPhotos(true)} className="aspect-square object-cover cursor-pointer" src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="" />
                    </div>
                )}
            </div>
            <div className="grid">
                {place.photos?.[1] && (
                    <div >
                        <img onClick={()=>setShowAllPhotos(true)} className="aspect-square object-cover cursor-pointer" src={`http://localhost:4000/uploads/${place.photos[1]}`} alt="" />
                    </div>
                )}
                <div className="overflow-hidden">
                    {place.photos?.[2] && (
                        <div >
                            <img onClick={()=>setShowAllPhotos(true)} className="relative top-2 aspect-square object-cover cursor-pointer" src={`http://localhost:4000/uploads/${place.photos[2]}`} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
        <button onClick={()=>setShowAllPhotos(true)} className="flex gap-1 absolute right-2 bottom-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 opacity-70 hover:opacity-90">
            <img src="/photosicon.svg" alt="" />
            More Photos
        </button>
    </div>
  )
}

export default PhotosGallery
