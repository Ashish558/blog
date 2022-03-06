import { Box } from '@material-ui/core'
import React from 'react'

export default function FileInput({ onImageChange, hiddenFileInput }) {

    return (
        <Box sx={{ position: 'relative', component: 'div', width: '100%' }} >
            <input id='profile' name='profile' ref={hiddenFileInput} onChange={onImageChange} type='file' style={styles.input} />
        </Box>
    )
}


const styles = {
    input: {
        display: 'none'
    },
}
