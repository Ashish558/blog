import React from 'react'
import { useSelector } from 'react-redux'

import Hero from '../../components/home/hero'
import Posts from '../posts'

//display hero if not authenticated 
const Home = () => {
   const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

   return (
      <>
         {
            isAuthenticated ? <Posts /> : <Hero />
         }
      </>
   )
}

export default Home