import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const getBg = (isActive) => {
    return isActive ? 'background.blue' : '#f3f3f3'
}
export default function Navitem({ name, icon: Icon, isActive, linkTo, setIsNavMenuActive }) {
    //blue = #1081e8c2
    const styles = {
        item: {
            display: 'flex',
            alignItems: 'center',
            px: '16px',
            py: '8px',
            borderRadius: '5px',
            color: 'color.secondary',
            ['@media (max-width:970px)']: { // eslint-disable-line no-useless-computed-key
                '&:hover': {
                    backgroundColor: '#f3f3f3',
                    color: '#1081e8'
                },
            },
            ['@media (min-width:970px)']: { // eslint-disable-line no-useless-computed-key
                py: '1rem',
                backgroundColor: isActive ? 'background.blue' : 'transparent',
                '&:hover': {
                    // backgroundColor: isActive ? 'background.blue' : '#f3f3f3',
                    backgroundColor: getBg(isActive),
                    color: '#1081e8'
                },
            },

        },
        icon: {
            mr: 2,
            fontSize: '2rem',

            ['@media (min-width:970px)']: { // eslint-disable-line no-useless-computed-key
                fontSize: '1.5rem',
                color: isActive ? 'color.white' : 'color.secondary',
            }
        },
        text: {
            lineHeight: 'normal',

            ['@media (min-width:970px)']: { // eslint-disable-line no-useless-computed-key
                fontSize: '1rem',
                color: isActive ? 'color.white' : 'color.secondary',
            }
        }
    }
    const handleClick = () => {
        if (window.innerWidth < 970) return setIsNavMenuActive(false)
    }
    return (
        <Box sx={styles.item} component={Link} to={linkTo} onClick={handleClick} >
            <Icon sx={styles.icon} />
            <Typography variant='p' sx={styles.text} fontFamily='Poppins' >
                {name}
            </Typography>
        </Box>

    )
}
