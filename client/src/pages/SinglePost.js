import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Stack, Typography } from '@mui/material'

import { containerStyle } from './styles/styles'

import { withRouter } from '../routes/withRouter'
import { addViewToPost, getSinglePost } from '../services/posts/posts'
import Header from '../components/SinglePost/Header/header'
import { updateSinglePost } from '../app/slices/singlePost'
import { Link } from 'react-router-dom'
import CommentsModal from '../components/SinglePost/CommentsModal/commentsModal'

const styles = {
    img: {
        width: '100%',
        borderRadius: '6px',
    }
}

function SinglePost(props) {
    const id = props.params.id
    const dispatch = useDispatch()

    const { post } = useSelector(state => state.singlePost)

    useEffect(() => {
        getSinglePost(id, (err, res) => {
            if (err) return console.log(err)
            dispatch(updateSinglePost(res.data[0]))
        })
        addViewToPost(id, (err, res) => {
            // console.log(res)
        })
    }, [])

    if (Object.keys(post).length === 0) {
        return <></>
    }

    let { _id, title, story, image, createdAt, posted_by, isLiked } = post
    const { _id: userId, name } = posted_by[0]

    return (
        <Container maxWidth={false} sx={{ ...containerStyle }} >
            <Header title={title} _id={_id} isLiked={isLiked} />
            <Stack direction='row' justifyContent='center' sx={{ mb: 5 }} >
                <Box component='img' src={image} sx={styles.img} />
            </Stack>
            <Box pb={10} >
                <Stack direction='row' justifyContent='space-between' sx={{ mb: 1, px: '3px' }} >
                    <Box
                        sx={{ mb: 2.5, fontSize: '14px', color: "#9d9d9d", fontFamily: 'Nunito' }} >
                        <Typography variant='p' mr={1} >
                            By
                        </Typography>

                        <Link to={`/user/${userId}`} >
                            <Typography variant='p' fontSize='15px' color='#ff50c1f5' >
                                {name.first} {name.last}
                            </Typography>
                        </Link>

                    </Box>
                    <Typography fontSize='14px'
                        variant="p"
                        color="#9d9d9d"
                        fontFamily='Nunito'
                        sx={{ mb: 2.5 }} >
                        {new Date(createdAt).toDateString()}
                    </Typography>
                </Stack>

                <Typography gutterBottom variant="p" whiteSpace='pre-line' >
                    {story}
                </Typography>
            </Box>
            <CommentsModal postId={id} />
        </Container>
    )
}

export default withRouter(SinglePost)