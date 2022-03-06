// import { TextField } from '@material-ui/core'
import { Container, Box, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { containerStyle } from './styles/styles'
import Inputfile from '../components/createPost/inputFile'

import { makeStyles } from "@material-ui/core/styles"
import SelectCategory from '../components/createPost/selectCategory'
import { createPost, updateImage } from '../services/posts/posts'
import Story from '../components/createPost/story'
import { LoadingButton } from '@mui/lab'

const useStyles = makeStyles((theme) => ({
    input: {
        "& .MuiFilledInput-root": {
            background: "#f3f3f3"
        }
    }
}));


export default function CreatePost() {
    const classes = useStyles();

    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [story, setStory] = useState('')

    const [imageSrc, setImageSrc] = useState(null)
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState('lifestyle')

    const onImageChange = (event) => {
        setImage(event.target.files[0])
        if (event.target.files && event.target.files[0]) {
            setImageSrc(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title && !story && !image) return console.log('fill all fields')
        setLoading(true)
        const data = { title, story, category }
        createPost(data, (err, res) => {
            if (err) return console.log(err)
            console.log('post created')
            if (image === null) {
                window.location = '/'
                setLoading(false)
            }else{
                uploadImage(res.data._id)
            }
        })

    }

    const uploadImage = (postId) => {
        const formData = new FormData()
        formData.append("postImage", image)

        updateImage(postId, formData, (err, res) => {
            if (err) return console.log(err)
            console.log('image uploaded')
            window.location = '/'
            setLoading(false)
        })
    }

    //on category change
    const onChange = (e) => {
        setCategory(e.target.value)
    }

    return (
        <Container sx={{ ...containerStyle }} >
            <form onSubmit={handleSubmit} >

                <Stack direction='column' alignItems='center' spacing={1} mb={10} >
                    <Box sx={{ maxWidth: '500px' }} >
                        <Box component='img' src={imageSrc} sx={{ width: '100%' }} />
                    </Box>

                    <Inputfile onImageChange={onImageChange} />

                </Stack>

                <Stack spacing={4} alignItems='flex-start' >

                    <TextField fullWidth variant='standard' label='Title'
                        size='medium' sx={{ py: 0 }}
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
                        loading={loading}
                        loadingPosition="center"
                        variant="contained"
                    >
                        Publish

                    </LoadingButton>
                    {/* <Button type='submit' variant='contained' sx={{ backgroundColor: 'background.blue' }} > Publish </Button> */}
                </Stack>

            </form>
        </Container>
    )
}
