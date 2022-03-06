import React from 'react'
import { Grid, Card, CardMedia, CardActions, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import PostContents from './postContents'
import BookmarkBtn from './bookmarkBtn'

//when in route bookmark
import { updateHasBookmarked as updateBookmarksPageBookmarks } from '../../../../app/slices/user'

//when in route /
import { updateHasBookmarked as updateHomePageBookmarks } from '../../../../app/slices/posts'

//when in route /user/:id
import { updateHasBookmarked as updateProfilePageBookmarks } from '../../../../app/slices/profilePosts'

export default function Post({ _id, title, story, image, category, createdAt, likesCount, posted_by, route, hasBookmarked }) {

    return (
        <Grid item xs={12} sm={6} md={6} lg={6} >
            <Card sx={styles.card}>
                <CardMedia
                    component="img"
                    height="180"
                    image={image}
                    alt="post image"
                />
                <PostContents title={title} createdAt={createdAt} story={story} />
                <CardActions sx={{ mb: 1 }} >
                    <Link to={`/post/${_id}`} >
                        <Button size="small">Read More</Button>
                    </Link>
                </CardActions>
                <BookmarkBtn _id={_id} posted_by={posted_by} isBookmarked={hasBookmarked}
                    updateHasBookmarked={
                        route === 'home' ? updateHomePageBookmarks :
                            route === 'bookmarks' ? updateBookmarksPageBookmarks :
                                updateProfilePageBookmarks
                    }
                />
            </Card>
        </Grid>
    )
}

const styles = {
    card: {
        // maxWidth: {
        //     sx: '100%',
        //     md: '345px'
        // },
        position: 'relative',
        boxShadow: '0',
        border: '1px solid #e1e1e1',
        borderRadius: '10px',
        '&:hover .post-overlay': {
            opacity: '1',
            top: '14px',
            pointerEvents: 'all'
        },
    },
    story: {
        color: '#5a5a5a'
    }
}