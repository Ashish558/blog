import React from 'react'
import { Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategories } from '../../../app/slices/categories'
import { updateLastSearchTitle } from '../../../app/slices/filterDetails'


export default function Filteritem({ name, isChecked }) {

    const { categories } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    const handleChange = () => {
        const tempCategories = categories.map(category => {
            if (category.name === name) return { ...category, isChecked: !category.isChecked }
            return { ...category }
        })
        dispatch(updateLastSearchTitle(''))
        dispatch(updateCategories(tempCategories))
    }

    return (

        <Grid item xs={6} sm={4} md={3} >
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={isChecked}
                        onChange={() => handleChange()}
                        inputProps={{ 'aria-label': 'controlled' }} />}
                    // label={name}
                    label={
                        <Typography variant='p' sx={{ fontFamily: 'Open_Sans' }} >
                            {name}
                        </Typography>}

                />
            </FormGroup>
        </Grid>

    )
}
