import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import Editicon from './editIcon'

export default function ImageInput() {
    const [userImg, setUserImg] = useState(localStorage.getItem('user_img'))

    return (

        <Stack alignItems='center' sx={styles.imgContainer} >
            <Box sx={styles.iconContainer} >
                <Box component='img' src={userImg} sx={styles.img} />
                <Editicon setUserImg={setUserImg} />
            </Box>
        </Stack>

    )
}

const styles = {
    img: {
        borderRadius: '50%',
        width: '200px',
        height: '200px',
        objectFit: 'cover',
    },
    iconContainer: {
        position: 'relative'
    },
    imgContainer: {
        mb: {
            xs: 3,
            lg: 5
        }

    }
}
