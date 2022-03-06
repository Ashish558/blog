import React from 'react'
import { Box, Button, Stack } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import Filterlist from './filterList'

import { useDispatch, useSelector } from 'react-redux'
import { toggleFilter } from '../../../app/slices/filterDetails'

const styles = {
    button: {
        ml: 'auto',
        boxShadow: 0,
        color: 'black',
        backgroundColor: '#e5e5e5',
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: 'background.gray',
            boxShadow: '0'
        },
    }
}

export default function Filter() {

    const { isFilterOn } = useSelector(state => state.filterDetails)
    const dispatch = useDispatch()

    return (
        <Box component='div' sx={{ borderBottom: '1px solid', borderBlockColor: '#d7d7d7', mb: 4 }} >
            <Stack direction='row' mb='14px'  >
                <Button
                    endIcon={isFilterOn ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                    variant='contained'
                    sx={styles.button}
                    onClick={() => dispatch(toggleFilter(!isFilterOn))} >Filters</Button>
            </Stack>
            {isFilterOn && <Filterlist />}
        </Box>
    )
}
