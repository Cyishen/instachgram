import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/query'
import { useEffect } from 'react'
import { useUserContext } from '@/Context/AuthContext'


const Topbar = () => {

    const { mutate: signOut, isSuccess }  = useSignOutAccount()
    const navigate = useNavigate()
    const { user } = useUserContext()

    useEffect(() => {
        if (isSuccess) navigate(0)
    }, [isSuccess])


  return (
    <section className="topbar">
        <div className="flex-between py-4 px-5">
            <Link to="/" className="flex gap-3 items-center">
                <h1 className="text-2xl font-extrabold">instachgram</h1>
            </Link>

            <div className="flex">
                {user.id ? (
                    <Link to="/sign-in">                
                        <Button variant="ghost" onClick={()=>signOut()}>
                            <img src="/assets/icons/logout.svg" alt="logout"/>
                        </Button>
                    </Link>
                ) : ""}

                {user.id ? (
                    <Link to={`/profile/${user.id }`} className="flex-center gap-3">
                        <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
                            alt="profile" className="h-8 w-8 rounded-full"
                        />
                    </Link>
                ) : (
                    <Link to="/sign-in">
                        <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
                            alt="profile" className="h-8 w-8 rounded-full"
                        />
                    </Link>
                )}
            </div>
        </div>
    </section>
  )
}

export default Topbar