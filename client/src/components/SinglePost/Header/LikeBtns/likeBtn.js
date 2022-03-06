import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import { addLikeToPost } from '../../../../services/posts/posts'
import { useDispatch, useSelector } from 'react-redux'
import { updateLikes } from '../../../../app/slices/singlePost';

export default function LikeBtn() {
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()

    const { post } = useSelector(state => state.singlePost)
    const { _id } = post

    function handleClick() {
        setLoading(true);
        addLikeToPost(_id, (err, res) => {
            if (err) return console.log(err)
            setLoading(false)
            const payload = { isLiked: true,  likesCount: res}
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
                Like

                <FavoriteBorderRoundedIcon sx={{ ml: '4px', fontSize: '20px' }} />
            </LoadingButton>
        </>
    )
}


const styles = {
    btn: {
        px: 1,
        minWidth: 'auto',
        boxShadow: 0,
        backgroundColor: 'background.pink',
        border: '0',
        color: 'white',
        borderColor: 'background.pink',
        fontFamily: 'Nunito',
        textTransform: 'capitalize',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: '#f14286',
            boxShadow: '0'
        },
    }
}
