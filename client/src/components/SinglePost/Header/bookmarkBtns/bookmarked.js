import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateHasBookmarked } from '../../../../app/slices/posts'
import { updateBookmark } from '../../../../app/slices/singlePost'
import { removeFromBookmarks } from '../../../../services/user/users'


export default function Bookmarked({ _id }) {


    const dispatch = useDispatch()

    const remove = () => {
        removeFromBookmarks(_id, (err, res) => {
            if (err) return console.log(err)
            const payload = {
                _id,
                hasBookmarked: false
            }
            //update both singlepost and post array
            dispatch(updateHasBookmarked(payload))
            dispatch(updateBookmark({ hasBookmarked: false }))
        })
    }

    return (
        <Button onClick={remove} sx={styles.btn} >
            Bookmarked
        </Button>
    )
}

const styles = {
    btn: {
        px: 1,
        minWidth: 'auto',
        boxShadow: 0,
        backgroundColor: 'background.lightpink',
        border: '0',
        color: 'background.pink',
        fontFamily: 'Nunito',
        textTransform: 'capitalize',
        fontSize: '15px',
        ml: 2,
        '&:hover': {
            backgroundColor: 'background.lightpink',
            boxShadow: '0'
        },
    }
}