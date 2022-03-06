import { Box, Container, Grid } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Post from '../components/posts/postsList/post/post'
import Header from '../components/userProfile/header/header'
import { withRouter } from '../routes/withRouter'

import { getUserPosts } from '../services/posts/profile/profile'
import { addToPosts, updatePosts } from '../app/slices/profilePosts'
import { getUserProfileDetails } from '../services/user/users'

import { containerStyle } from './styles/styles'
import { checkIfReachedBottom } from '../components/functions/functions'
import Footer from '../components/posts/Footer/footer'

function UserProfile(props) {
    const userId = props.params.id

    const [loading, setLoading] = useState(false)
    const [profile, setprofile] = useState({})

    const { posts } = useSelector(state => state.profilePosts)

    const dispatch = useDispatch()
    const containerRef = useRef()

    const [isMaxPostsReached, setIsMaxPostsReached] = useState(false)

    useEffect(() => {
        setLoading(true)
        getUserProfileDetails(1, (err, res) => {
            if (err) return console.log(err)
            let topCategories = res.maxCategories.map(item => item._id)
            setprofile({ ...res.data, topCategories })
        })
        setLoading(false)
    }, [])

    const onScroll = () => {
        if (isMaxPostsReached) return
        checkIfReachedBottom(containerRef, (res) => {
            setLoading(true)
            if (loading === false) {
                getUserPosts(userId, posts.length, (err, res) => {
                    if (err) return console.log(err)
                    dispatch(addToPosts(res.data))
                    setLoading(false)
                    if (res.status === 204) return setIsMaxPostsReached(true)
                })
            }
        })
    }

    useEffect(() => {
        getUserPosts(userId, 0, (err, res) => {
            if (err) return console.log(err)
            dispatch(updatePosts(res.data))
        })
    }, [])

    if (loading) return <></>
    if (Object.keys(profile).length < 1) return <></>

    return (
        <Container maxWidth={false} sx={{ ...containerStyle }} ref={containerRef}
            onScroll={() => onScroll()} >
            <Grid container justifyItems='center' alignItems='center' >
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Header profile={profile} />
                </Grid>

            </Grid>

            <Box sx={styles.line} > </Box>

            <Grid container spacing={2} >
                {posts && posts.map(post => {
                    return <Post key={post._id} {...post} route='userProfile' />
                })}
            </Grid>
            <Footer isMaxPostsReached={isMaxPostsReached} loading={loading} />

        </Container>
    )
}


const styles = {
    title: {
        mb: {
            xs: 3,
            lg: 5
        }
    },
    line: {
        width: '100%',
        height: '2px',
        backgroundColor: '#ededed',
        mt: 5,
        mb: 5
    }

}

export default withRouter(UserProfile)