import React from 'react'
import TextTruncate from 'react-text-truncate'
import { Typography, CardContent } from '@mui/material'

const styles = {
    story: {
        color: '#5a5a5a'
    }
}

export default function PostContents({ title, createdAt, story }) {

    return (
        <CardContent>
            <Typography gutterBottom variant="h5" component="h5" fontWeight={600} textTransform='capitalize' >
                {title}
            </Typography>
            <Typography fontSize='14px'
                variant="p"
                component="p"
                color="#bdbdbd"
                fontFamily='Nunito'
                sx={{ mb: 2.5 }} >
                {new Date(createdAt).toDateString()}
            </Typography>

            <Typography variant="body2" sx={styles.story}>
                <TextTruncate
                    line={4}
                    element="span"
                    truncateText="…"
                    text={story}
                />
            </Typography>
        </CardContent>
    )
}
