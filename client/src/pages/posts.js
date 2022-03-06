import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/material'

import Filter from '../components/posts/filter/filter'
import PostsList from '../components/posts/postsList/postsList'
import Searchbar from '../components/posts/searchbar/searchbar'
import Footer from '../components/posts/Footer/footer'

import { checkIfReachedBottom } from '../components/functions/functions'
import { addToPosts } from '../app/slices/posts'

import { containerStyle } from './styles/styles'
import { getFilteredPosts } from '../services/posts/posts'

function Posts() {
    const { posts } = useSelector(state => state.posts)

    const containerRef = useRef();
    const dispatch = useDispatch()

    //title which is last searched
    const { lastSearchTitle } = useSelector(state => state.filterDetails)
    const { categories } = useSelector(state => state.categories)

    const [isMaxPostsReached, setIsMaxPostsReached] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setIsMaxPostsReached(false)
    }, [categories, lastSearchTitle])

    //fetch posts again after reached
    const onScroll = () => {
        const checkedCategories = categories.filter(item => item.isChecked === true)
        const categoryList = checkedCategories.map(item => {
            return item.name
        })

        if (isMaxPostsReached) return
        checkIfReachedBottom(containerRef, (res) => {
            setLoading(true)
            //to avoid double fetching
            if (loading === false) {
                getFilteredPosts(posts.length, categoryList, lastSearchTitle, (err, res) => {
                    if (err) return console.log(err)
                    dispatch(addToPosts(res.data))
                    setLoading(false)
                    if (res.status === 204) return setIsMaxPostsReached(true)
                })
            }

        })
    }


    return (
        <Container maxWidth={false}
            sx={{ ...containerStyle }}
            ref={containerRef}
            onScroll={() => onScroll()}>
            <Filter />
            <Searchbar />
            <PostsList />
            <Footer isMaxPostsReached={isMaxPostsReached} loading={loading} />
        </Container>
    )
}

export default Posts