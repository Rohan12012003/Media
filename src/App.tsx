import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from '../src/_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';
import { AllUsers, CreatePost, EditPost, Explore, Home, LikedPosts, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import './globals.css';
import { Routes,Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public pages */}
            <Route element={<AuthLayout />}>
                <Route path='/signin' element={<SigninForm/>} />
                <Route path='/signup' element={<SignupForm/>} />
            </Route>
            {/* private pages */}
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/saved' element={<Saved />} />
                <Route path='/allusers' element={<AllUsers />} />
                <Route path='/createpost' element={<CreatePost/>} />
                <Route path='/updatepost/:id' element={<EditPost />} />
                <Route path='/posts/:id' element={<PostDetails />} />
                <Route path='/profile/:id/*' element={<Profile />} />
                <Route path='/updateprofile/:id' element={<UpdateProfile />} />
                <Route path='Likedposts/:id' element={<LikedPosts />} />
            </Route>
        </Routes>
        <Toaster />
    </main>
  )
}

export default App