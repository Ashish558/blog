import React from 'react'
import { Button } from '@mui/material'
import { addToBookmarks } from '../../../../services/user/users'
import { useDispatch } from 'react-redux'

import { updateHasBookmarked } from '../../../../app/slices/posts'
import { updateBookmark } from '../../../../app/slices/singlePost'


export default function BookmarkBtn({ _id }) {

    const dispatch = useDispatch()

    const add = () => {
        addToBookmarks(_id, (err, res) => {
            if (err) return console.log(err)
            const payload = {
                _id,
                hasBookmarked: true
            }

            //update both singlepost and post array
            dispatch(updateHasBookmarked(payload))
            dispatch(updateBookmark({hasBookmarked: true  }))
        })
    }

    return (
        <Button sx={styles.btn} onClick={add} >
            Bookmark
        </Button>
    )
}

const styles = {
    btn: {
        px: 1,
        minWidth: 'auto',
        boxShadow: 0,
        backgroundColor: '#e7e7e7',
        border: '0',
        color: 'black',
        fontFamily: 'Nunito',
        textTransform: 'capitalize',
        fontSize: '15px',
        ml: 2,
        '&:hover': {
            backgroundColor: 'background.gray',
            boxShadow: '0'
        },
    }
}