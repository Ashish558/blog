import React from 'react'
import { useDispatch } from 'react-redux';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import { Box, Tooltip } from '@mui/material'

import { addToBookmarks, removeFromBookmarks } from '../../../../services/user/users'
// import { updateHasBookmarked } from '../../../../app/slices/posts';

const styles = {
    box: {
        position: 'absolute',
        right: '14px',
        top: '5px',
        opacity: '0',
        transition: '0.3s',
        pointerEvents: 'none'
    },
}

//_id = post id
export default function BookmarkBtn({ _id, isBookmarked, posted_by, updateHasBookmarked }) {

    const dispatch = useDispatch()

    const add = () => {
        addToBookmarks(_id, (err, res) => {
            if (err) return console.log(err)
            const payload = {
                _id,
                hasBookmarked: true
            }
            dispatch(updateHasBookmarked(payload)) 
        })
    }

    const remove = () => {
        removeFromBookmarks(_id, (err, res) => {
            if (err) return console.log(err)
            const payload = {
                _id,
               hasBookmarked: false
            }
            dispatch(updateHasBookmarked(payload))
        })
    }


    return (
        <Box className='post-overlay' sx={styles.box} >
            <Box sx={{ display: 'flex' }} >
                {isBookmarked ?
                    <Tooltip title="Remove from bookmark">
                        <BookmarkAddedIcon onClick={remove} />
                    </Tooltip>
                    :
                    <Tooltip title="Bookmark">
                        <BookmarkBorderRoundedIcon onClick={add} />
                    </Tooltip>
                }
            </Box>
        </Box>
    )
}
