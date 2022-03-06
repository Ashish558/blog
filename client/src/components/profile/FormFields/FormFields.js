import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { updateCity, updateCountry, updateEmail, updateFirstName, updateLastName } from '../../../app/slices/profileForm'
import InputField from './InputField'

export default function FormFields() {


    const { firstName, lastName, email, country, city } = useSelector(state => state.profileForm)

    return (
        <Grid container spacing={1} sx={{ mb: 4 }} >
            <Grid item xs={12} sm={6} md={6} lg={6} >
                <InputField type='text' label='First Name' value={firstName} setValue={updateFirstName} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} >
                <InputField type='text' label='Last Name' value={lastName} setValue={updateLastName} />
            </Grid>
            {/* location */}
            <Grid item xs={12} sm={6} md={6} lg={6} >
                <InputField type='text' label='City' value={city} setValue={updateCity} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} >
                <InputField type='text' label='Country' value={country} setValue={updateCountry} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} >
                <InputField type='email' label='Email' value={email} setValue={updateEmail} />
            </Grid>

        </Grid>
    )
}
