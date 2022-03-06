import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateModal } from '../../app/slices/formModal'

const linkStyles = {
    fontFamily: 'Poppins',
    cursor: 'pointer',
    color: '#484848'
}

function Navbar() {
    const dispatch = useDispatch()
    return (
        <AppBar
            position="fixed"
            color="default"
            elevation={0}
            sx={{ background: 'white', zIndex: '1000' }}
        >
            <Toolbar sx={{ alignItems: 'center' }}>
                <Typography variant='h5' sx={{ marginRight: 'auto', color: '#1081e8' }} >
                    Blog
                </Typography>
                <Typography component='p' onClick={() => dispatch(updateModal(true))} sx={{ ...linkStyles, marginRight: 3 }} >
                    Register
                </Typography>
                <Typography component='p' onClick={() => dispatch(updateModal(true))} sx={linkStyles} >
                    Login
                </Typography>
            </Toolbar>
        </AppBar>
    )
}


export default Navbar
