import { Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { registerUser } from '../../../../services/auth'
import InputField from '../../../inputs/InputField'

export default function Signup({ setIsSignupActive }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const styles = {
        inputCon: {
            marginBottom: '25px'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) return setErrorMsg('passwords dont match')
        const data = { firstName, lastName, email, password }

        registerUser(data, (err, data) => {
            if (err) return setErrorMsg(err.response.data)
            setErrorMsg("")
            setSuccessMsg('Successfully registered! login to continue')
            // console.log(data)
            // window.location = '/login'
        })
    }

    return (
        <form onSubmit={handleSubmit} >
            <Typography color='#d32f2f' align='center' mb={4} >
                {errorMsg}
            </Typography>
            <Typography color='#66bb6a' align='center' mb={4} >
                {successMsg}
            </Typography>
            <div style={styles.inputCon}>
                <Stack direction='row' spacing={0.5} >
                    <InputField  label='First Name' type='text' value={firstName} setValue={setFirstName} />
                    <InputField label='Last Name' type='text' value={lastName} setValue={setLastName} />
                </Stack>
                <InputField type='email' label='Email' value={email} setValue={setEmail} />
                <InputField type='password' label='Password' value={password} setValue={setPassword} />
                <InputField type='password' label='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} />

            </div>
            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={0.5} mb={4} >
                <Button variant='contained' type='submit' >
                    Sign up
                </Button>
                <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setIsSignupActive(false)} >
                    or Sign in
                </Typography>
            </Stack>
        </form>
    )
}
