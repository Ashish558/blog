import React from 'react'
import { Box, Stack } from '@mui/material'
import Details from './details'

export default function Header({ profile }) {
    
    const { image } = profile

    return (
        <Box>
            <Stack sx={styles.stack}  >
                <Box component='img' src={image} sx={styles.img} />
                <Details profile={profile} />
            </Stack>
        </Box>
    )
}

const styles = {
    img: {
        borderRadius: '50%',
        width: '200px',
        height: '200px',
        objectFit: 'cover',

        ['@media (min-width:760px)']: { // eslint-disable-line no-useless-computed-key
            mr: 4
        },
        ['@media (max-width:760px)']: { // eslint-disable-line no-useless-computed-key
            mb: 3
        }
    },
    stack: {
        ['@media (max-width:760px)']: { // eslint-disable-line no-useless-computed-key
            alignItems: 'center'
        },
        ['@media (min-width:760px)']: { // eslint-disable-line no-useless-computed-key
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }

    }
}
