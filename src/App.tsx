import { Routes, Route } from 'react-router-dom'
import './globals.css'

import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import Home from './_root/pages/Home'
import AuthLAyout from './_auth/AuthLAyout'
import RootLayout from './_root/RootLayout'

import { Toaster } from "@/components/ui/toaster"

import Explore from './_root/pages/Explore'
import AllUsers from './_root/pages/AllUsers'
import Saved from './_root/pages/Saved'
import CreatePost from './_root/pages/CreatePost'
import EditPost from './_root/pages/EditPost'
import Profile from './_root/pages/Profile'
import PostDetails from './components/shared/PostDetails'


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLAyout />}>
          <Route path="/sign-in" element={<SigninForm />}/>
          <Route path="/sign-up" element={<SignupForm />}/>
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />}/>
          <Route path="/explore" element={<Explore />}/>
          <Route path="/all-users" element={<AllUsers />}/>
          <Route path="/saved" element={<Saved />}/>
          <Route path="/create-post" element={<CreatePost />}/>
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/profile/:id/*" element={<Profile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>

  )
}

export default App