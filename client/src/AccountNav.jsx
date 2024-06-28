import { Link, useLocation } from "react-router-dom";
export default function AccountNav(){
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if(subpage===undefined){
        subpage='profile';
    }
    function linkclass(type = null){
        
        let classes = 'inline-flex py-2 px-6 gap-1 rounded-full';
        if(type === subpage){
            classes += ' bg-primary text-white'
        }else{
            classes += ' bg-gray-300'
        }
        return classes;
    }
    return (
        <nav className="w-full flex justify-center mt-8 gap-8 mb-8">
            <Link className={linkclass('profile')} to={'/account'}>
                <img src="/usericon.svg" className=''alt="" />
                My Profile
            </Link>
            <Link className={linkclass('bookings')} to={'/account/bookings'}>
                <img src="/menuicon.svg" className=''alt="" />
                My Bookings
            </Link>
            <Link className={linkclass('places')} to={'/account/places'}>
                <img src="/houseicon.svg" className=''alt="" />
                My Accommodations
            </Link>
        </nav>
    );
}