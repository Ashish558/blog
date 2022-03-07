import React, { useEffect, useState } from 'react'
import { TextField } from '@material-ui/core'
import { Container, Box, Stack, Button } from '@mui/material'
import { containerStyle } from './styles/styles'
import Story from '../components/createPost/story'

import { makeStyles } from "@material-ui/core/styles"
import SelectCategory from '../components/createPost/selectCategory'
import { editPost, getSinglePost } from '../services/posts/posts'
import { withRouter } from '../routes/withRouter'
import { LoadingButton } from '@mui/lab'

const useStyles = makeStyles((theme) => ({
    input: {
        "& .MuiFilledInput-root": {
            background: "#f3f3f3"
        }
    }
}));


function EditPost(props) {
    const classes = useStyles();
    const id = props.params.id

    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    const [title, setTitle] = useState('')
    const [story, setStory] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('lifestyle')

    useEffect(() => {
        setIsLoading(true)
        getSinglePost(id, (err, res) => {
            if (err) return console.log(err)
            const { title, story, category, image } = res.data[0]

            setTitle(title)
            setStory(story)
            setCategory(category)
            setImage(image)
            setIsLoading(false)

        })
    }, [id])

    const handleSubmit = (e) => {
        setIsEditing(true)
        e.preventDefault()
        if (!title && !story) return console.log('fill all fields')
        const data = { title, story, category }

        editPost(id, data, (err, res) => {
            if (err) return console.log(err)
            setIsEditing(false)
            window.location='/dashboard'
        })

    }

    const onChange = (e) => {
        setCategory(e.target.value)
    }

    if (isLoading) {
        return 'loading'
    }


    return (
        <Container sx={{ ...containerStyle }} >
            <form onSubmit={handleSubmit} >

                <Stack direction='column' alignItems='center' spacing={3} mb={10} >
                    <Box sx={{ maxWidth: '500px' }} >
                        <Box component='img' src={image} sx={{ width: '100%' }} />
                    </Box>

                </Stack>

                <Stack spacing={6} alignItems='flex-start' >

                    <TextField fullWidth variant='standard' label='Title'
                        size='medium' sx={{ py: 4 }}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        InputProps={{ style: { fontSize: 25, padding: '6px 0', fontFamily: 'IBM_plex', } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 30 } }}
                    />

                    <Story story={story} classes={classes} setStory={setStory} />
                    <SelectCategory category={category} onChange={onChange} />

                    <LoadingButton
                        type='submit'
                        // onClick={handleClick}
                        loading={isEditing}
                        loadingPosition="center"
                        variant="contained"
                    >
                        Edit
                    </LoadingButton>     
                </Stack>

            </form>
        </Container>
    )
}

export default withRouter(EditPost)
