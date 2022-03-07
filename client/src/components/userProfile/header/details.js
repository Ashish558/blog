import { Stack, Typography } from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Details({ profile }) {

    const { name, location, topCategories } = profile

    return (
        <Stack sx={styles.details} >
            <Typography variant='h5' sx={styles.name} >
                {name.first} {name.last}
            </Typography>

            {location !== undefined &&
                <Stack variant='h5' direction='row' alignItems='center' sx={styles.location} >
                    <LocationOnIcon sx={{ ...styles.city, fontSize: '18px', mr: 2 }} />
                    <Typography variant='p' sx={styles.city} >
                        {location.city}, {location.country}
                    </Typography>
                </Stack>
            }

            <Stack direction='row' spacing={1} >
                <Typography variant='span' sx={styles.cat}  >
                    {topCategories[0]}
                </Typography>
                <Typography variant='span' sx={styles.cat} >
                    {topCategories[1]}
                </Typography>
                <Typography variant='span' sx={styles.cat} >
                    {topCategories[2]}
                </Typography>
            </Stack>
        </Stack>
    )
}


const styles = {
    details: {
        py: 1,
        justifyContent: 'center',
    },
    name: {
        ['@media (max-width:760px)']: { // eslint-disable-line no-useless-computed-key
            textAlign: 'center'
        },
        mb: 4
    },
    city: {
        color: '#b3b1b1',
        fontSize: '15px',
    },
    location: {
        mb: 1,
        ['@media (max-width:760px)']: { // eslint-disable-line no-useless-computed-key
            display: 'flex',
            justifyContent: 'center'
        },
    },
    cat: {
        // backgroundColor: 'transparent',
        fontSize: '13px',
        color: '#b3b1b1',
        backgroundColor: '#f5f5f5',
        px: 0.5,
        borderRadius: '3px'
    }
}
