import { Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AlertBtn from '../components/profile/AlertBtn'
import FormFields from '../components/profile/FormFields/FormFields'
import SaveBtn from '../components/profile/FormFields/saveBtn'
import ImageInput from '../components/profile/ImageInput/imageInput'

import { updateCity, updateCountry, updateEmail, updateFirstName, updateLastName } from '../app/slices/profileForm'
import { getUserDetails, updateUserDetails } from '../services/user/users'

import { containerStyle } from './styles/styles'

export default function Profile(props) {
    const [loading, setLoading] = useState(false)
    const profileForm = useSelector(state => state.profileForm)
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        updateUserDetails(profileForm, (err, res) => {
            if (err) return console.log(err)
            setLoading(false)
            localStorage.setItem('email', res.email)
            setIsAlertVisible(true)
            setTimeout(function () {
                setIsAlertVisible(false)
            }, 3500);
        })
    }
    useEffect(() => {
        getUserDetails((err, res) => {
            if (err) return console.log(err)
            dispatch(updateFirstName(res.name.first))
            dispatch(updateLastName(res.name.last))
            dispatch(updateEmail(res.email))
            dispatch(updateCity(res.location.city))
            dispatch(updateCountry(res.location.country))
        })
    }, [])

    return (
        <Container sx={{ ...containerStyle }} >
            <Grid container>
                <Grid item xs={12} sm={12} md={10} lg={8} >
                    <form onSubmit={handleSubmit}  >
                        <Typography variant='h5' sx={styles.title} >
                            Edit Profile
                        </Typography>
                        <ImageInput />
                        <FormFields />
                        <SaveBtn loading={loading} />
                    </form>
                    {isAlertVisible && <AlertBtn />}
                </Grid>
            </Grid>

        </Container>
    )
}


const styles = {

    title: {
        mb: {
            xs: 3,
            lg: 5
        }
    }

}