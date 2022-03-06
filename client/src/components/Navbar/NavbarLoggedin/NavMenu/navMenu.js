import { Box, Stack } from '@mui/material'
import React from 'react'
import Navitem from './navItem';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { NavbarData } from '../NavbarData';

export default function Navmenu({ setIsNavMenuActive, linkTo }) {
    const styles = {
        container: {
            position: 'fixed',
            top: 0,
            left: '0',
            bottom: 0,
            right: 0,
            background: '#fff',
            display: 'flex',
        },
        list: {
            width: '100%',
            py: 4,
            pt: 8,
            px: 2
        }
    }

    return (
        <Box sx={styles.container} component='div' >
            <Stack sx={styles.list} spacing={3} >
                {NavbarData.map(item => {
                    return <Navitem key={item.name} name={item.name} icon={item.icon} linkTo={item.linkTo} setIsNavMenuActive={setIsNavMenuActive} />
                })}
            </Stack>
            <CloseRoundedIcon sx={{ position: 'absolute', top: '20px', right: '20px' }}
                onClick={() => setIsNavMenuActive(false)} />
        </Box>
    )
}
