import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import Post from './post/post'

export default function PostsList() {

    const { posts } = useSelector(state => state.posts)

    if (posts.length === 0) return (
        posts.length === 0 &&
        <Typography px={5}>
            No Articles found
        </Typography>
    )

    return (
        <>

            <Grid container spacing={2} >
                {posts && posts.map(post => {
                    return <Post key={post._id} {...post} route='home' />
                })}
            </Grid>

        </>
    )
}
