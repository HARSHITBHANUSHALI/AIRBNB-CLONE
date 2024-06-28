import { useContext } from 'react'
import { Link, useActionData } from 'react-router-dom'
import { UserContext } from '../UserContext'
const Header = () => {
  const {user}= useContext(UserContext)
  return (
    <div>
      <header className='flex justify-between'>
          
        <Link to={'/'} className="flex items-center gap-1">
          <img src="/airbnblogo.svg" alt="" />
          <span className='font-bold text-xl'>Airbnb</span>
        </Link>
        <div className='flex border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-gray-300'>
          <div>Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div>Any week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
          <button className='bg-primary rounded-full p-1'>
            <img src="/searchicon.svg" alt="" />
          </button>
        </div>
        <Link to={user?'/account':'/login'} className="flex items-center border border-gray-300 rounded-full py-2 px-4 gap-2 ">
          <img src="/menuicon.svg" alt="" />
          <div className='bg-gray-500 p-1 rounded-full overflow-hidden'>
            <img src="/usericon.svg" alt="" />
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>
      </header>
    </div>
  )
}

export default Header
