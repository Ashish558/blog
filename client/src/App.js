
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'

import FormModal from './components/home/FormModal/FormModal'
import AppRoutes from './AppRoutes'

import { updateAuth } from './app/slices/auth'
import { verifyAuth } from './services/verifyAuth'

const App = () => {
   const [isLoading, setIsLoading] = useState(true)
   const theme = createTheme({
      breakpoints: {

         values: {
            xs: 0,
            sm: 568,
            md: 760,
            lg: 970,
            xl: 1200,
         }
      },
      palette: {
         background: {
            default: "#f9f8ffe3",
            blue: '#1081e8c2',
            lightgray: '#f3f3f4',
            gray: '#bdbdbd',
            pink: '#ea4c89',
            lightpink: '#f5abc821',
            catBlue: '#219ebc',
         },

         color: {
            secondary: '#505050',
            white: '#fff',
            black: '#000',
            primary: '#1081e8',
         }
      },
      typography: {
         fontFamily: [
            "Open_Sans",
            "Poppins",
            "Helvetica Neue",
            "Arial",
            "sans-serif"
         ].join(",")
      },
      overrides: {
         MuiTableRow: {
            root: {
               "&:last-child td": {
                  borderBottom: 0,
               },
            }
         },
      },

   })

   const isFormModalOpen = useSelector(state => state.formModal.isFormModalOpen)
   const dispatch = useDispatch()

   useEffect(() => {
      verifyAuth((err, res) => {
         if (!res) {
            dispatch(updateAuth(false))
            setIsLoading(false)
            return
         }
         dispatch(updateAuth(true))
         setIsLoading(false)
      })
   }, [dispatch])

   if (isLoading) return <>Loading</>

   return (
      <ThemeProvider theme={theme}>
         <GlobalStyles styles={{ listStyle: 'none' }} />
         <CssBaseline />
         <AppRoutes />

         {isFormModalOpen && <FormModal />}
      </ThemeProvider>
   )
}


export default App
