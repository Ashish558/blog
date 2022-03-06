import React, { useState } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
// import useWindowDimensions from '../../hooks/useWindowDimensions';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Navmenu from './NavMenu/navMenu';
import NavSidebar from './NavSidebar/NavSidebar';
import useWindowDimensions from '../../../hooks/useWindowDimensions';


const styles = {
    navbar: {
        zIndex: '1000',
        // borderBottom: '1px solid #6262623b',
        top: 0,
        left: 0,
        backgroundColor: '#fff',
        ['@media (min-width:970px)']: { // eslint-disable-line no-useless-computed-key
            maxWidth: '300px',
            height: '100%',
            background: '#fff',
            // borderRight: '1px solid #dfdede'
        }
    },
    logo: {
        color: '#1081e8',
        ['@media (max-width:970px)']: { // eslint-disable-line no-useless-computed-key
            marginRight: 'auto',

        },
        ['@media (min-width:970px)']: { // eslint-disable-line no-useless-computed-key
            mt: 3,
            mb: 5
        }
    },

    wrapper: {
        ['@media (max-width:970px)']: { // eslint-disable-line no-useless-computed-key
            justifyContent: 'space-between' ,
        },
        ['@media (min-width:970px)']: { // eslint-disable-line no-useless-computed-key
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column',
            py: 2
        }
    },


}
//navmenu for mobile and nav_sidebar for desktop
export default function Navbarloggedin(props) {
    const { width } = useWindowDimensions()
    const [isNavMenuActive, setIsNavMenuActive] = useState(false)

   
    return (
        <AppBar
            position="fixed"
            color="default"
            elevation={0}
            sx={{ ...styles.navbar }}
        >
            <Toolbar sx={{ ...styles.wrapper }}>

                <Typography variant='h5' sx={styles.logo} >
                    Blog
                </Typography>

                {width > 970 ?
                    (
                        <NavSidebar />
                    ) : (
                        <>
                            <MenuRoundedIcon onClick={() => setIsNavMenuActive(true)} />
                            {isNavMenuActive && <Navmenu setIsNavMenuActive={setIsNavMenuActive} />}
                        </>
                    )
                }

            </Toolbar>
        </AppBar>
    )
}
