import { Box, Modal } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal, updateComments } from '../../../app/slices/singlePost'
import { getPostComments } from '../../../services/posts/comment/comment'
import Header from './header'
import InputBox from './inputBox'
import SingleComment from './SingleComment/singleComment'

export default function CommentsModal({ postId }) {

    const { isModalOpen, comments } = useSelector(state => state.singlePost)
    const dispatch = useDispatch()

    const handleClose = () => dispatch(toggleModal(false))

    const fetchComments = useCallback(() => {
        getPostComments(postId, (err, res) => {
            if (err) return console.log(err)
            dispatch(updateComments(res.comments))
        })
    }, [dispatch, postId])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])
   

    return (
        <Modal open={isModalOpen}
            onClose={handleClose}
            BackdropProps={{
                style: { background: 'transparent' }
            }}
        >
            <Box sx={styles.modal} >
                <Box >
                    <Header />
                    <InputBox postId={postId} fetchComments={fetchComments} />
                    {/* <Divider light /> */}
                    <Box >
                        {comments.map(comment => {
                            return <SingleComment key={comment._id} {...comment} />
                        })}
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

const styles = {
    modal: {
        position: 'fixed',
        top: '30px',
        bottom: '0',
        right: '0',
        width: '100%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        px: 2,
        py: 3,
        overflow: 'auto',
        ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
            left: '0',
        },
        ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
            top: '0',
            maxWidth: '500px'
        }
    }
}