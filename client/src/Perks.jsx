export default function Perks({selected,onChange}){

    function handleCheckbox(e){
        const {checked,name} = e.target;
        if(checked){
            onChange([...selected,name]);
        }else{
            onChange([...selected.filter(item => item!==name)]);
        }
    }
    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('wifi')} name='wifi' onChange={handleCheckbox}/>
                <img src="/wifi.svg" alt="" />
                <span>Wifi</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('parking')} name='parking' onChange={handleCheckbox}/>
                <img src="/parking.svg" alt="" />
                <span>Free Parking Spot</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('tv')} name='tv' onChange={handleCheckbox}/>
                <img src="/tv.svg" alt="" />
                <span>TV</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('pets')} name='pets' onChange={handleCheckbox}/>
            <img src="/pets.svg" alt="" />
                <span>Pets</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('entrance')} name='entrance' onChange={handleCheckbox}/>
                <img src="/entrance.svg" alt="" />
                <span>Private Entrance</span>
            </label>
        </>
    )
}