import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({addedPhotos,setAddedPhotos,selectedPhoto,setSelectedPhoto}){
    
    const [photoLink,setPhotoLink] = useState('');

    async function addPhotoByLink(e){
        e.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link',{link:photoLink})
        setAddedPhotos(prev => {
            return [...prev,filename]});
        setPhotoLink('');
    }

    async function uploadPhoto(e){
        e.preventDefault();
        const files = e.target.files;
        console.log(files);
        const data = new FormData();
        for(let i=0;i<files.length;i++){
            data.append('photos',files[i]);
        }
        const response = await axios.post('/upload',data,{
            headers:{'Content-type':'multipart/form-data'}
        })
        const filenames = response?.data;
        console.log(filenames);
        setAddedPhotos(prev => {
            return [...prev,...filenames]});
    }

    function handleImageSelection(e){
        console.log(e.target.src.split('/')[4]);

    }

    function removePhoto(ev,filename){
        ev.preventDefault();
        setAddedPhotos([...addedPhotos.filter(photo=> photo!==filename)]);
    }
    function selectAsMainPhoto(ev,filename){
        ev.preventDefault();
        const newAddedPhotos = [filename,...addedPhotos.filter(photo => photo!==filename)];
        setAddedPhotos(newAddedPhotos);
    }
    return(
        <>
        <div className="flex gap-2">
            <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using a link ....jpg" />
            <button onClick={addPhotoByLink} className="bg-gray-200 grow px-4 rounded-2xl">Add&nbsp;Photo</button>
        </div>
        
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length>0 && addedPhotos.map(link => (
                <div className="h-32 flex relative" key={link}>
                    <img onClick={handleImageSelection} className='rounded-2xl w-full object-cover' src={'http://localhost:4000/uploads/'+link} alt="" />
                    <button onClick={(ev)=>removePhoto(ev,link)} className="cursor-pointer absolute bottom-2 right-2 bg-black opacity-60 rounded-2xl p-1 hover:opacity-80">
                        <img src="/trash.svg" alt="" />
                    </button>
                    <button onClick={(ev)=>selectAsMainPhoto(ev,link)} className="cursor-pointer absolute top-2 right-2 bg-black opacity-60 rounded-2xl p-1 hover:opacity-80">
                        {link===addedPhotos[0] && (
                            <img src="/starfilled.svg" alt="" />
                        )}
                        {link!==addedPhotos[0] && (
                            <img src="/star.svg" alt="" />                            
                        )}
                    </button>
                </div>
            ))}
            <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input multiple type="file" className="hidden" onChange={uploadPhoto}/>
                <img src="/uploadicon.svg" className="relative top-1" alt="" />
                Upload
            </label>
        </div>
        </>
    );
}