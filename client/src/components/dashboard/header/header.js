import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import Headeritem from './headerItem'

import { getUserDashboardDetails } from '../../../services/user/users'
import { useDispatch } from 'react-redux';
import { updateMonths, updateViewsHistory } from '../../../app/slices/dashboardArticles';

function Header() {

    const [isLoading, setIsLoading] = useState(true)
    const [details, setDetails] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        setIsLoading(true)
        getUserDashboardDetails((err, res) => {
            if (err) return console.log(err)
            let months = getMonths(res.data)
            let views = getViews(res.data, months)
            setDetails({
                posts: res.posts,
                likes: res.likes,
                comments: res.comments,
                views: res.views,
            })

            dispatch(updateViewsHistory(views))
            dispatch(updateMonths(months))
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <></>
    }

    return (
        <Box sx={{ mb: 3 }} component='div' >
            <Grid container rowSpacing={1} spacing={2} >
                {
                    data.map(item => {
                        return (
                            <Grid key={item.name} item xs={6} sm={6} md={3} lg={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }} >
                                <Headeritem details={details} {...item} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

let data = [
    {
        name: 'posts',
        icon: ArticleIcon,
        color: '#f78b13',
        bgColor: '#fff3e3'
    },
    {
        name: 'likes',
        icon: FavoriteIcon,
        color: '#ff4d6e',
        bgColor: '#ffedf1'
    },
    {
        name: 'comments',
        icon: ChatBubbleIcon,
        color: '#05afb9',
        bgColor: '#e1f8f8'

    },
    {
        name: 'views',
        icon: AutoGraphIcon,
        color: '#1281ea',
        bgColor: '#e6f2fe'
    },
]

//only gets month of current year
var getMonths = function (posts) {
    let months = [];
    posts.forEach((post) => {
        post.viewsHistory.forEach((view) => {
            if (!months.includes(view.month) && view.year == new Date().getFullYear()) {
                months.push(view.month)
            }
        })
    })

    return months;
}

// get monthly views
var getViews = function (posts, months) {
    let views = []

    months.forEach((month) => {
        posts.forEach((post, idx) => {
            post.viewsHistory.forEach((viewHistory) => {
                let viewCount = viewHistory.views
                if (views.length === 0) {
                    views.push({ month, views: viewCount })
                }
                else {
                    if (viewHistory.month === month) {
                        let ifViewsContainsMonth = false
                        let viewIdx = 0
                        views.forEach((v, idx) => {
                            if (v.month === month) {
                                ifViewsContainsMonth = true
                                viewIdx = idx
                            }
                        })
                        if (ifViewsContainsMonth) {
                            views[viewIdx].views += viewCount
                        } else {
                            views.push({ month, views: viewCount })
                        }
                    }
                }

            })
        })
    })


    return views
}

export default Header
