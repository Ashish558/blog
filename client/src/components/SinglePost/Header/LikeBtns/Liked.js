import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import {  removeLikeFromPost } from '../../../../services/posts/posts'
import { updateLikes } from '../../../../app/slices/singlePost';

export default function Liked() {

    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)

    const { post } = useSelector(state => state.singlePost)
    const { _id,  likesCount } = post


    function handleClick() {
        setLoading(true);
        removeLikeFromPost(_id, (err, res) => {
            if (err) return console.log(err)
            setLoading(false)
            const payload = { isLiked: false, likesCount: res }
            dispatch(updateLikes(payload))

        })
    }

    return (
        <>
            <LoadingButton
                onClick={handleClick}
                loading={loading}
                loadingPosition="center"
                variant="contained"
                sx={styles.btn}
            >

                <FavoriteRoundedIcon sx={{ mr: '4px', fontSize: '20px' }} />
                {likesCount}
            </LoadingButton>
        </>
    )
}


const styles = {
    btn: {
        px: 1,
        minWidth: 'auto',
        boxShadow: 0,
        backgroundColor: 'transparent',
        border: '1px solid',
        color: 'background.pink',
        borderColor: 'background.pink',
        fontFamily: 'Nunito',
        textTransform: 'capitalize',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: '0'
        },
    }
}