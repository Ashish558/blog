import { Alert } from '@mui/material'
import React from 'react'

export default function AlertBtn() {
 
    return (
       <Alert sx={styles.alert} severity="success">Profile updated successfully!</Alert>
    )
}

const styles= {
    alert: {
        position: 'fixed',
        zIndex: 500,
        bottom: '1rem',
    }
}