import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'

import { topContainer } from '../../pages/styles/styles'
import { useDispatch } from 'react-redux'
import { updateModal } from '../../app/slices/formModal'


const styles = {
   title: {
      pt: 5,
      pb: 7,
      ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
         pr: '60px',
      }
   },
   container: {
      ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
         display: 'flex',
         alignItems: 'center'
      }
   }
}
const Hero = () => {

   const dispatch = useDispatch()
   return (
      <Container maxWidth='xl' sx={{ ...topContainer, height: '100vh', zIndex: '10', position: 'relative', ...styles.container }}>
         <Grid container alignItems="center" >
            <Grid item xs={12} md={12} lg={6} sx={styles.title}>
               <Typography component='h3' variant='h4' sx={{ mb: 4 }} >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
               </Typography>
               <Typography component='p' variant='p' sx={{ mb: 4 }} color='#505050' >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
               </Typography>
               <Button variant='outlined' onClick={()=> dispatch(updateModal(true))} >Sign up</Button>
            </Grid>
            <Grid item xs={12} md={12} lg={6} pb={3} display='flex' justifyContent='center' >
               <Box
                  component="img"
                  sx={{ maxWidth: '500px', width: '100%' }}
                  src='/assets/illustration.svg' />
            </Grid>
         </Grid>

      </Container>

   )
}

export default Hero