import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Footer({ loading, isMaxPostsReached }) {

    return (
        <Box sx={styles.footer} >
            {isMaxPostsReached && (
                <Typography align='center' color='#999b9b' >
                    That's it
                </Typography>
            )}

            {loading && (
                <Typography align='center' color='#999b9b' >
                    Loading
                </Typography>
            )}

        </Box>
    )
}

const styles = {
    footer: {
        py: 2
    }
}
