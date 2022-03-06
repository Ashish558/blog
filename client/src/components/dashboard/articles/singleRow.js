import React from 'react'
import { TableCell, TableRow, Typography, Stack, Box } from '@mui/material'
import { withStyles } from '@material-ui/core/styles';
import ActionBtn from './actionBtn/actionBtn';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const fnStyles = theme => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'hide',
    },
    table: {
        minWidth: 340,
    },
    tableCell: {
        padding: '8px 10px',
        fontSize: '14px'
    }
});

function SingleRow(props) {
    const { _id, category, image, title, createdAt, classes, likesCount, number, commentsCount, views } = props
    const { width } = useWindowDimensions()

    let dateStr = new Date(createdAt).toDateString()
    const d = dateStr.split(' ')
    let date = `${d[1]} ${d[2]} ${d[3]}`

    if (category === 'travel' || 'sports' || 'health' || 'DIY') {
        styles.btn.backgroundColor = 'background.catBlue'
    }
    const blueCategories = ['travel', 'sports', 'health', 'personal']
    return (
        <TableRow>
            <TableCell className={classes.tableCell} sx={{ ...styles.cell }} component="th" scope="row">
                <Typography component='p' variant='p' sx={styles.number} >
                    {number}
                </Typography>
            </TableCell>
            <TableCell className={classes.tableCell} sx={{ ...styles.cell }}>
                <Stack direction='row' alignItems='center' >
                    <Box component='img' src={image} sx={styles.img} />
                    <Typography variant='p' sx={{ maxWidth: '200px' }} >
                        {title}
                    </Typography>
                </Stack>
            </TableCell>

            {width > 820 &&
                <>
                    <TableCell className={classes.tableCell} sx={styles.cell} >
                        {date}
                    </TableCell>
                    <TableCell className={classes.tableCell} sx={{ ...styles.cell }}>
                        <Typography component='p' variant='p'
                            sx={{
                                ...styles.btn,
                                backgroundColor: blueCategories.includes(category)
                                    ? 'background.catBlue' : '#ff60a9'
                            }}>
                            {category}
                        </Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell} sx={styles.cell} >
                        {likesCount} {likesCount > 1 ? 'Likes' : 'Like'}
                    </TableCell>
                    <TableCell className={classes.tableCell} sx={styles.cell} align='center' >
                        {commentsCount}
                    </TableCell>
                </>
            }
            {width > 500 &&
                <TableCell className={classes.tableCell} sx={styles.cell} align='center' >
                    {views}
                </TableCell>
            }

            <TableCell className={classes.tableCell} sx={styles.cell} align='right' >
                <ActionBtn _id={_id} />
            </TableCell>

        </TableRow>
    )


}
// sx = { blueCategories.includes(category) ? {...styles.btn, styles.btnPink} :  {...styles.btn, styles.btnBlue} }

const styles = {
    img: {
        width: '50px',
        height: '50px',
        borderRadius: '8px',
        mr: 3,
        objectFit: 'cover'
    },
    cell: {
        color: 'rgb(0 0 0 / 57%)',
        borderBottom: 0,
    },
    number: {
        width: '25px',
        height: '25px',
        fontWeight: '600',
        padding: '4px 8px',
        backgroundColor: 'background.blue',
        textAlign: 'center',
        borderRadius: '3px',
        color: 'white',
        fontSize: '12px'
    },
    btn: {
        padding: '8px 8px',
        borderRadius: '5px',
        color: 'white',
        textAlign: 'center',
        maxWidth: '110px'
    },
    btnPink: {
        backgroundColor: '#ff60a9',
    }
}

export default withStyles(fnStyles)(SingleRow);