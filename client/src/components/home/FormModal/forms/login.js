import React, { useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'

import InputField from '../../../inputs/InputField'
import { loginUser } from '../../../../services/auth'

    
const setUserStorage = (token, email, user_id, user_img) => {
    localStorage.setItem("auth-token", token)
    localStorage.setItem("email", email)
    localStorage.setItem("user_id", user_id)
    localStorage.setItem("user_img", user_img)
}

export default function Login({ setIsSignupActive }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMsg, setErrorMsg] = useState('')

    const styles = {
        inputCon: {
            marginBottom: '25px'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { email, password }

		loginUser(data, (err, data) => {
            console.log(err)
			if (err) return setErrorMsg(err.response.data)
			const { token, email, user_id, user_img } = data
			setErrorMsg("")
			setUserStorage(token, email, user_id, user_img)
			 window.location='/'

		})
    }


    return (
        <form onSubmit={handleSubmit}>
            <Typography color='#d32f2f' align='center' mb={3} >
                {errorMsg}
            </Typography>

            <div style={styles.inputCon}>
                <InputField type='email' label='Email' value={email} setValue={setEmail} />
                <InputField type='password' label='Password' value={password} setValue={setPassword} />
            </div>
            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={0.5} mb={4} >
                <Button variant='contained' type='submit'>
                    Login
                </Button>
                <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setIsSignupActive(true)} >
                    or Sign up
                </Typography>
            </Stack>
        </form>
    )
}
