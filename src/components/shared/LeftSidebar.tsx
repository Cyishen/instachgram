import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { useSignOutAccount } from '@/lib/react-query/query'
import { useUserContext } from '@/Context/AuthContext'

import { sidebarLinks } from '@/constants'
import { Button } from '../ui/button'


const LeftSidebar = () => {
  const { pathname } = useLocation()

  const { mutate: signOut, isSuccess }  = useSignOutAccount()


  const navigate = useNavigate()
  const { user } = useUserContext()

  useEffect(() => {
      if (isSuccess) navigate(0)
  }, [isSuccess])


  return (
    <nav className="leftsidebar text-black border-r">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
            <h1 className="text-2xl font-extrabold">instachgram</h1>
        </Link>

        {user.id ? (
          <Link to={`/profile/${user.id }`} className="flex gap-3 items-center">
            <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
                alt="profile" className="h-10 w-10 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        ) : (
          <Link to="/sign-in" className="flex gap-3 items-center">
            <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
                alt="profile" className="h-10 w-10 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">Guest</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map( (link) => {
            const isActive = pathname === link.route

            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>
                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                  <img src={link.imgURL} alt={link.label} className={`${isActive && "invert-white"} group-hover:invert-white`}/>
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
        {user.id ? (
          <Link to="/sign-in">
            <Button variant="ghost" onClick={()=>signOut()} className="shad-button_ghost">
              <img src="/assets/icons/logout.svg" alt="logout"/>
              <p>Log Out</p>
            </Button>
          </Link> 
        ): (
          <Link to="/sign-in">
            <Button variant="ghost" className="shad-button_ghost">
              <img src="/assets/icons/signin.svg" alt="logout"/>
              <p>Sign in</p>
            </Button>
          </Link> 
        )}

    </nav>
  )
}

export default LeftSidebar