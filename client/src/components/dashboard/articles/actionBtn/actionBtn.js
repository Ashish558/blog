import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Menu, MenuItem } from '@mui/material'
import { withStyles } from '@material-ui/core/styles'

import DeleteBtn from './deleteBtn.js/deleteBtn'


function ActionBtn(props) {
    const { classes, _id } = props
    let navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const viewPost = () => {
        navigate(`/post/${_id}`)
        setAnchorEl(null);
    }

    const editPost = () => {
        navigate(`/post/${_id}/edit`)
        setAnchorEl(null);
    }

    return (
        <div>
            <MoreHorizIcon id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={styles.icon} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                classes={{ list: classes.list }}
            >
                <MenuItem onClick={viewPost} sx={{ ...styles.link }}  >
                    View
                </MenuItem>
                <MenuItem onClick={editPost} sx={{ ...styles.link }} >
                    Edit
                </MenuItem>
                <DeleteBtn setAnchorEl={setAnchorEl}  _id={_id} />
            </Menu>
        </div>
    )
}

const styles = {
    link: {
        color: 'rgb(0 0 0 / 67%)',
        textDecoration: 'none',
        fontSize: '14.5px',
        borderRadius: '3px'
    },
    icon: {
        '&:hover': {
            backgroundColor: '#f3f3f3',
        },
    }
}

const classes = theme => ({
    list: {
        padding: '0',
        width: '92px',
    }
})

export default withStyles(classes)(ActionBtn)