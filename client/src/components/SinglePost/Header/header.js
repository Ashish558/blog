import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box,  IconButton, Stack, Typography } from '@mui/material'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded'

import BookmarkBtn from './bookmarkBtns/bookmarkBtn'
import Bookmarked from './bookmarkBtns/bookmarked'
import LikeBtn from './LikeBtns/likeBtn'
import Liked from './LikeBtns/Liked'
import { toggleModal } from '../../../app/slices/singlePost';

export default function Header({ title, _id, isLiked }) {

    const { post } = useSelector(state => state.singlePost)
    const { hasBookmarked } = post
    
    const dispatch = useDispatch()

    return (
        <Stack sx={{ mb: 4, mt: 1 }} >
            <Typography variant="h4" component="h4" fontWeight={600} mb={2} textTransform='capitalize' >
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                {isLiked ?
                    <Liked />
                    :
                    <LikeBtn />
                }

                {hasBookmarked ?
                    <Bookmarked _id={_id} />
                    :
                    <BookmarkBtn _id={_id} />
                }

                <IconButton color='primary'
                 onClick={()=> dispatch(toggleModal(true))}
                    sx={{ ml: 'auto', color: '#3e3e3e', border: '1px solid #e7e7e9' }} >
                    <ChatBubbleRoundedIcon
                        sx={{ color: '#3e3e3e', fontSize: '21px' }} />
                </IconButton>


            </Box>
        </Stack>

    )
}
