import React from 'react'
import { Box, Grid, Checkbox, FormControlLabel, FormGroup, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Filteritem from './filterItem'
import { checkAllCategory, uncheckAllCategory } from '../../../app/slices/categories'
import { toggleFilter, toggleAllCategory } from '../../../app/slices/filterDetails'
import { getFilteredPosts } from '../../../services/posts/posts'
import { updatePosts } from '../../../app/slices/posts'
/*
pink 
#FE938C
vio
#3943B7
*/
const styles = {
    button: {
        ml: 'auto',
        boxShadow: 0,
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        fontSize: '14px',
        mb: 1,
        '&:hover': {
            boxShadow: '0'
        },
    }
}

export default function Filterlist() {
    const { isAllCategoryChecked } = useSelector(state => state.filterDetails)
    const { categories } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    const { searchTitle } = useSelector(state => state.filterDetails)

    const handleChange = () => {
        if (isAllCategoryChecked) {
            dispatch(uncheckAllCategory())
        }
        if (!isAllCategoryChecked) {
            dispatch(checkAllCategory())
        }
        dispatch(toggleAllCategory(!isAllCategoryChecked))
    }

    const handleClick = () => {
        const checkedCategories = categories.filter(item => item.isChecked === true)
        const categoryList = checkedCategories.map(item => {
            return item.name
        })
        getFilteredPosts(0, categoryList, searchTitle, (err, res) => {
            if (err) return console.log(err)
            dispatch(updatePosts(res.data))
        })
        dispatch(toggleFilter(false))
    }

    return (
        <Box component='div' mb={1} >
            <FormGroup sx={{ mb: 2 }} >
                <FormControlLabel
                    control={<Checkbox checked={isAllCategoryChecked}
                        onChange={() => handleChange()}
                        inputProps={{ 'aria-label': 'controlled' }} />}
                    label={<Typography variant='p' sx={{ fontFamily: 'Open_Sans_bold', fontWeight: '600' }} >
                        All
                    </Typography>} />
            </FormGroup>
            <Grid container sx={{ mb: 2 }} >
                {categories.map(category => {
                    return (
                        <Filteritem key={category.name} {...category} />
                    )
                })}
            </Grid>
            <Button variant='contained'
                onClick={() => handleClick()}
                sx={styles.button} >
                Done
            </Button>
        </Box>
    )
}
