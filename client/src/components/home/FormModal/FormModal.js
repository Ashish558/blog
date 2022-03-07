import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import Signup from './forms/signup'
import Login from './forms/login'
import { useDispatch } from 'react-redux'
import { updateModal } from '../../../app/slices/formModal'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const styles = {
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        height: '100%',
        background: '#1e1e1e87',
        zIndex: 2000,
        justifyContent: 'stretch',
        ['@media (min-width:700px)']: { // eslint-disable-line no-useless-computed-key
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1e1e1e87',
        }
    },
    form: {
        position: 'relative',
        flex: 1,
        boxShadow: '0px 8px 24px rgb(0 0 0 / 25%)',
        borderRadius: '8px 8px 0px 0px',
        background: 'white',
        py: 3,
        px: 2,
        //tablet
        ['@media (min-width:700px)']: { // eslint-disable-line no-useless-computed-key
            flex: 'auto',
            borderRadius: '8px',
            maxWidth: '600px',   
        },

        //desktop
        ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
            minWidth: '800px',
        }
    },
    closeIcon_tablet: {
        cursor: 'pointer',
        ml: 'auto',
        color: '#5c5c5c',
        ['@media (min-width:700px)']: { // eslint-disable-line no-useless-computed-key
            position: 'absolute',
            display: 'none',
        }
    },
    closeIcon_desktop: {
        cursor: 'pointer',
        display: 'none',
        ['@media (min-width:700px)']: { // eslint-disable-line no-useless-computed-key
            display: 'block',
            position: 'absolute',
            top: '-30px',
            right: '-20px',
            color: '#ededed'
        }
    },
    formWrapper: {

        //desktop
        ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
            display: 'flex',
            alignItems: 'center',
        }
    },
    form_left: {

        //desktop
        ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
            flex: '1',
        }
    },
    formImg: {
        display: 'none',

        //desktop
        ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1',
        }
    }
}

export default function FormModal() {
    const [isSignupActive, setIsSignupActive] = useState(true)
    const dispatch = useDispatch()
    return (
        <Box sx={styles.modal}>

            <Box sx={styles.form} >
                <Box sx={styles.formWrapper} >
                    <Box sx={styles.form_left} >
                        {/* header */}
                        <Box mb={4} sx={{ display: 'flex', width: '100%' }} >
                            <Typography variant='h5' fontWeight='600' >
                                {
                                    isSignupActive ? 'Create Account' : 'Login'
                                }
                            </Typography>
                            <CancelRoundedIcon color='white' sx={styles.closeIcon_tablet} onClick={() => dispatch(updateModal(false))} />   
                        </Box>
                        {/* form */}
                        {
                            isSignupActive ?
                                <Signup setIsSignupActive={setIsSignupActive} />
                                :
                                <Login setIsSignupActive={setIsSignupActive} />
                        }

                        <Typography sx={{ textAlign: 'center', fontSize: '14px', color: '#565656', fontFamily: 'Nunito' }} >
                            By signing up you agree to our Terms and conditions, Privacy policy
                        </Typography>
                    </Box>

                    {/* right side */}
                    <Box sx={styles.formImg} >
                        <Box component='img' src='/assets/form.png' sx={{ width: '300px' }} />
                    </Box>
                </Box>
                <CancelRoundedIcon color='white' sx={styles.closeIcon_desktop} onClick={() => dispatch(updateModal(false))} />
            </Box>


        </Box>
    )
}
