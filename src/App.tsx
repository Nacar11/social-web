import { Toaster } from "@/components/ui/toaster";
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import SignInForm from './_auth/forms/SigninForm';
import SignUpForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';
import {
  AllUsers,
  CreatePost,
  EditPost,
  EmailVerification,
  Explore,
  Home,
  LikedPosts,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile
} from './_root/pages/index';
 
import './globals.css';
const App = () => {
  return (
   <main className="flex h-screen">
<Routes>
    {/* { public routes} */}
    <Route element ={<AuthLayout/>}>
    <Route path="/sign-in" element={<SignInForm/>}/>
    <Route path="/sign-up" element={<SignUpForm/>}/>
    </Route>
    {/* { private routes} */}
    <Route element ={<RootLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="/explore" element={<Explore/>}/>
    <Route path="/email-verification" element={<EmailVerification/>}/>
    <Route path="/saved" element={<Saved/>}/>
    <Route path="/all-users" element={<AllUsers/>}/>
    <Route path="/create-post" element={<CreatePost/>}/>
    <Route path="/update-post/:id" element={<EditPost/>}/>
    <Route path="/posts/:id" element={<PostDetails/>}/>
    <Route path="/:username/*" element={<Profile/>}/>
    <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
    <Route path="/liked-posts" element={<LikedPosts/>}/>
    </Route>
</Routes>
<Toaster/>
   </main>


  )
}

export default App