import React, { useRef } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import FileInput from './fileInput';
import { updateProfileImage } from '../../../services/user/users';

export default function Editicon({setUserImg}) {

    const hiddenFileInput = useRef(null)

    const onImageChange = (event) => {

        const formData = new FormData()
        formData.append("profileImage", event.target.files[0])

        updateProfileImage( formData, (err, res) => {
            if (err) return console.log(err)
            localStorage.setItem('user_img', res.data.image)
            setUserImg(res.data.image)
        })

    }
 
    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    return (
        <Box sx={styles.iconBox} onClick={handleClick} >
            <EditIcon sx={styles.icon} fontSize='large' />
            <FileInput onImageChange={onImageChange} hiddenFileInput={hiddenFileInput} />
        </Box>
    )
}


const styles = {
    iconBox: {
        position: 'absolute',
        bottom: '15px',
        right: '15px',
        zIndex: 100, 
        cursor : 'pointer'
    },
    icon: {
        backgroundColor: '#1081e8',
        borderRadius: '50%',
        p: 1,
        color: 'white'
    }
}
