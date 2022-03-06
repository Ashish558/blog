import React from 'react'
import { Box, InputLabel, TextField } from '@mui/material'
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

const classes = {
    root: {
        border: 'solid 1px #cbcbcb99',
        borderRadius: '4px',
        boxShadow: 'none',

        '& .MuiOutlinedInput-root': {
            fontSize: '16px',
            color: 'rgb(0 0 0 / 70%)',
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',

            },
        },
        '&:hover': {
            border: 'solid 1px #cbcbcb',
        },
    },
};

export default withStyles(classes)(function InputField(props) {
    const { classes, label, value, setValue, type } = props;
    const dispatch = useDispatch()

    return (
        <Box sx={{ mb: 2 }}>
            <InputLabel sx={styles.label} > {label} </InputLabel>
            <TextField required={true} fullWidth
                classes={classes}
                name={label}
                type={type}
                size='small'
                value={value}
                onChange={(e) => dispatch(setValue(e.target.value))}

                variant="outlined"
            />
        </Box>
    )
})

const styles = {
    label: {
        position: 'static',
        mb: 1,
    },

}
