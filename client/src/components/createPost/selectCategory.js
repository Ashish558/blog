import React from 'react'
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'

export const categories = [
    'food', 'travel', 'health', 'lifestyle','fashion', 'photography', 'sports', 'personal', 'DIY'
]

export default function Selectcategory({category,onChange }) {


    return (
        <FormControl fullWidth >
            <InputLabel id="select-label">Category</InputLabel>
            <Select
                labelId="select-label"
                id="select"
                size='small'
                value={category}
                variant='outlined'
                label="Category"
                onChange={onChange}
                sx={{ color: 'black', px: 2, py: 1 }}
            >
                {categories.map(item => {
                    return <MenuItem key={item} value={item} sx={{ textTransform: 'capitalize' }} >{item} </MenuItem>
                })}
            </Select>
        </FormControl>
    )
}
