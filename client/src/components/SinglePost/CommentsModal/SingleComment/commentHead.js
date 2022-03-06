import React from 'react'
import { format } from 'timeago.js'
import { Avatar, Box, Stack, Typography } from '@mui/material'

export default function CommentHead({ commentedBy, createdAt }) {
    const { name, image } = commentedBy

    return (
        <Stack direction='row' alignItems='center' >
            <Avatar alt="Remy Sharp" src={image} sx={{ mr: 2 }} />
            <Box>
                <Typography> {name.first} {name.last} </Typography>
                <Typography fontSize='13px' color='background.gray' >
                    {format(createdAt)}
                </Typography>
            </Box>
        </Stack>
    )
}
