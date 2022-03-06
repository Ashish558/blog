import { Stack, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../../app/slices/singlePost';

export default function Header(props) {

    const dispatch = useDispatch()

    return (
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={3} >
            <Typography variant='h5' fontWeight='600' fontFamily='Open_Sans_bold' >
                Feedback
            </Typography>
            <CloseIcon onClick={() => dispatch(toggleModal(false))} />
        </Stack >
    )
}
