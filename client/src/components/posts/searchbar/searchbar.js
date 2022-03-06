import React from 'react'
import {  TextField } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';
import { getFilteredPosts } from '../../../services/posts/posts';
import { useDispatch, useSelector } from 'react-redux';
import { updatePosts } from '../../../app/slices/posts';
import { updateLastSearchTitle, updateSearchTitle } from '../../../app/slices/filterDetails';


export default function Searchbar() {

    // const [lastSearchItem, setLastSearchItem] = useState('')
    const { categories } = useSelector(state => state.categories)

    const { searchTitle } = useSelector(state => state.filterDetails)
    const { lastSearchTitle } = useSelector(state => state.filterDetails)

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const checkedCategories = categories.filter(item => item.isChecked === true)
        const categoryList = checkedCategories.map(item => {
            return item.name
        })
      
        //if input empty get original posts and also update last searched
        if (!searchTitle) {
            dispatch(updateLastSearchTitle(searchTitle))
            getFilteredPosts(0, categoryList, searchTitle, (err, res) => {
                if (err) return console.log(err)
                dispatch(updatePosts(res.data))
            })
            return
        }

        if (searchTitle === lastSearchTitle) {
            return console.log('you just searched for it!')
        } else {
            dispatch(updateLastSearchTitle(searchTitle))
            // setLastSearchItem(searchTitle)
        }

        getFilteredPosts(0, categoryList, searchTitle, (err, res) => {
            if (err) return console.log(err)
            dispatch(updatePosts(res.data))
        })
    }


    return (
        <form onSubmit={handleSubmit} style={styles.form} >
            <TextField
                placeholder='Search articles'
                variant="standard"
                fullWidth
                size='small'
                sx={styles.input}
                value={searchTitle}
                onChange={e => dispatch(updateSearchTitle(e.target.value))}
                InputProps={{ disableUnderline: true, style: { fontSize: 16, padding: '10px 10px', backgroundColor: 'transparent' } }} // font size of input text
            // InputLabelProps={{ style: { fontSize: 20 } }}
            />
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            />
        </form >
    )
}


const styles = {

    form: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '2rem',
        backgroundColor: '#efefef',
        borderRadius: '30rem',
        padding: '0 10px'
    }
}