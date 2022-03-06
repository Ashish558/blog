import { Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToBookmarkPosts, updateBookmarkPosts } from '../app/slices/user'
import { checkIfReachedBottom } from '../components/functions/functions'
import Footer from '../components/posts/Footer/footer'
import Post from '../components/posts/postsList/post/post'
import { getBookmarkedPosts } from '../services/posts/posts'
import { containerStyle } from './styles/styles'

export default function Bookmarks() {
    const { bookmarkPosts } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const containerRef = useRef()

    const [isMaxPostsReached, setIsMaxPostsReached] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getBookmarkedPosts(0, (err, res) => {
            if (err) return console.log(err)
            dispatch(updateBookmarkPosts(res.data))
        })
    }, [])

    const onScroll = () => {
        if (isMaxPostsReached) return
        checkIfReachedBottom(containerRef, (res) => {
            setLoading(true)
            if (loading === false) {
                getBookmarkedPosts(bookmarkPosts.length, (err, res) => {
                    if (err) return console.log(err)
                    dispatch(addToBookmarkPosts(res.data))
                    setLoading(false)
                    if (res.status === 204) return setIsMaxPostsReached(true)
                })
            }
        })
    }

    return (
        <Container maxWidth={false} sx={{ ...containerStyle }} ref={containerRef}
            onScroll={() => onScroll()} >
            {bookmarkPosts.length === 0 &&
                <Typography>
                    No Bookmarks found
                </Typography>
            }
            <Grid container spacing={2} >
                {bookmarkPosts.length >= 1 && bookmarkPosts.map(post => {
                    return <Post key={post._id} {...post} route='bookmarks' />
                })}
            </Grid>

            <Footer isMaxPostsReached={isMaxPostsReached} loading={loading} />

        </Container>
    )
}
