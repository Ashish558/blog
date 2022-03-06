import React from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { format } from 'timeago.js'

export default function SingleComment({ body, commentedBy, createdAt }) {

    const { name, image } = commentedBy

    return (
        <Stack direction='row' alignItems='flex-start' mb={3} >
            <Avatar alt="profile" src={image} sx={{ mr: 2 }} />
            <Box>
                <Box sx={{ mb: 1.5 }} >
                    <Typography> {name.first} {name.last} </Typography>
                    <Typography fontSize='13px' color='background.gray' >
                        {format(createdAt)}
                    </Typography>
                </Box>
                <Typography>
                    {body}
                </Typography>
            </Box>

        </Stack>
    )
}
