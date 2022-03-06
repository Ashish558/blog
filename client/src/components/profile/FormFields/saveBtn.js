import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react'

export default function SaveBtn({ loading}) {
    

    return (
        <LoadingButton
        type='submit'
            // onClick={handleClick}
            loading={loading}
            loadingPosition="center"
            variant="contained"
        >
            Save

        </LoadingButton>
    )
}
