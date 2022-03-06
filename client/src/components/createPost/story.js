import { TextField } from '@mui/material'
import React from 'react'

export default function Story({ story, classes, setStory }) {


    return (
        <TextField fullWidth variant='filled'
            size='small'
            placeholder='Tell your story...'
            value={story}
            onChange={e => setStory(e.target.value)}
            sx={{ py: 4, mt: 1 }}
            className={classes.input}
            multiline
            rows={9}
            InputProps={{
                disableUnderline: true,
                style: { fontSize: 20, padding: '14px 14px' }
            }} 
            InputLabelProps={{ style: { fontSize: 20 } }}
        />
    )
}
