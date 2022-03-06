import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deletePost } from '../../../../../services/posts/posts';


export default function DeletePostModal({ _id, open, setOpen, setAnchorEl }) {


    const handleClose = () => {
        deletePost(_id, (err, res) => {
            if (err) return console.log(err)
            setOpen(false)
            setAnchorEl(null)
            window.location.reload()
        })
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ boxShadow: 'none' }}
                BackdropProps={{ style: { backgroundColor: 'rgba(10,10,10,0.4)' } }}
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete this post
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flex-start', px: 3, py: 2 }} >
                    <Button onClick={handleClose} variant='contained' color='error' autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}