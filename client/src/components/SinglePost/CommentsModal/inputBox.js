import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { withStyles } from '@material-ui/core'
import { addComment } from '../../../services/posts/comment/comment'


function InputBox(props) {
    const [comment, setComment] = useState('')
    const { classes, postId, fetchComments } = props

    const handleSubmit = () => {
        if (!comment) return console.log('comment cant be empty')
        addComment(postId, comment, (err, res) => {
            if (err) return console.log(err)
            fetchComments()
            setComment('')
        })
    }
    return (
        <Box mb={5} >
            <form onSubmit={handleSubmit} >
                <TextField fullWidth
                    multiline
                    rows={5}
                    sx={{ mb: 1 }}
                    value={comment}
                    classes={classes}
                    variant="outlined"
                    onChange={e => setComment(e.target.value)}
                />
                <Button variant='contained' sx={{ boxShadow: 'none' }} onClick={handleSubmit} >
                    Send
                </Button>
            </form>
        </Box>
    )
}

const styles = {
    root: {
        border: 'solid 1px #dadada',
        borderRadius: '5px',
        padding: '0',

        '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
            '& fieldset': {            // - The <fieldset> inside the Input-root
                borderColor: 'transparent',   // - Set the Input border
            },
            '&:hover fieldset': {
                borderColor: 'transparent', // - Set the Input border when parent has :hover
            },
            '&.Mui-focused fieldset': { // - Set the Input border when parent is focused 
                borderColor: 'transparent',
            },
        },
    },
}

export default withStyles(styles)(InputBox)
