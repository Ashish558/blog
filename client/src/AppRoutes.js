
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//pages
import Home from "./pages/Home/Home"
import Navbar from './components/Navbar/Navbar'
import CreatePost from './pages/createPost'
import Bookmarks from './pages/bookmarks';
import Dashboard from './pages/dashboard';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import SinglePost from './pages/SinglePost';
import EditPost from './pages/EditPost';

import Navbarloggedin from './components/Navbar/NavbarLoggedin/NavbarLoggedIn'
import { getPosts } from './services/posts/posts'
import { updatePosts } from './app/slices/posts'


const AppRoutes = () => {
   const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
   const dispatch = useDispatch()

   useEffect(() => {
      if (!isAuthenticated) return console.log('not authenticated')
      getPosts(0, (err, res) => {
         if (err) return console.log(err)
         dispatch(updatePosts(res.data))
      })
   }, [isAuthenticated])

   return (
      <BrowserRouter>
         {isAuthenticated ? <Navbarloggedin /> : <Navbar />}

         <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/create'
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <CreatePost />
                  </RequireAuth>
               }
            />
            <Route path='/bookmarks'
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <Bookmarks />
                  </RequireAuth>
               }
            />
            <Route path='/dashboard'
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <Dashboard />
                  </RequireAuth>
               }
            />
            <Route path='/profile'
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <Profile />
                  </RequireAuth>
               }
            />
            <Route path='/user/:id'
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <UserProfile />
                  </RequireAuth>
               }
            />
            <Route path={`/post/:id`}
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <SinglePost />
                  </RequireAuth>
               }
            />
            <Route path={`/post/:id/edit`}
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <EditPost />
                  </RequireAuth>
               }
            />

         </Routes>
      </BrowserRouter>
   )
}


function RequireAuth({ children, isAuthenticated }) {

   return isAuthenticated ? children : <Navigate to='/' />;
}

export default AppRoutes
