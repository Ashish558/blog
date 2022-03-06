import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

export default function Headeritem({ name, icon: Icon, color, bgColor, details }) {
   
    const styles = {
        icon: {
            color: color
        },
        iconBox: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: bgColor,
            px: '10px',
            py: '10px',
            mr: 2.5,
            borderRadius: '8px',
        },
        contentContainer: {
            backgroundColor: '#fff', display: 'flex',
            alignItems: 'center', px: 2.5, py: 1.5, borderRadius: '8px',
        }
    }

    return (
        <Box>
            <Stack direction='row' alignItems='center'  >
                <Box sx={styles.contentContainer} >
                    <Box sx={styles.iconBox}  >
                        <Icon sx={styles.icon} />
                    </Box>
                    <Box >
                        <Typography variant='h5' color='#1d3f53' sx={{ minWidth: '60px' }} >
                            {details[name]}
                        </Typography>
                        <Typography variant='p' color='#c8cdd6' fontSize='13px' textTransform='capitalize' >
                            {name}
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}
