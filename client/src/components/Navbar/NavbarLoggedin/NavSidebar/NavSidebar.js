import React from 'react'
import { Stack } from '@mui/material'
import { useLocation } from 'react-router-dom'

import { NavbarData } from '../NavbarData';
import Navitem from '../NavMenu/navItem'

export default function NavSidebar(props) {
    const { pathname } = useLocation()

    const styles = {
        link: {
            fontFamily: 'Poppins',
            cursor: 'pointer',
            color: '#484848'
        },
        link2: {
            ['@media (max-width:970px)']: { // eslint-disable-line no-useless-computed-key
                marginRight: 3
            }
        },
        list: {
            ['@media (min-width:970px)']: { // eslint-disable-line no-useless-computed-key
                width: '100%'
            }
        }
    }

    return (
        <>
            <Stack sx={styles.list} spacing={2} >
                {NavbarData.map(item => {
                    return <Navitem key={item.name} isActive={pathname === item.linkTo ? true : false} name={item.name} icon={item.icon} linkTo={item.linkTo} />
                })}
            </Stack>
        </>

    )
}
