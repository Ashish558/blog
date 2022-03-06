import React from 'react'
import { Container } from '@mui/material'
import { Linechart } from '../components/chart/chart'
import Articles from '../components/dashboard/articles/articles'
import Header from '../components/dashboard/header/header'
import { containerStyle } from './styles/styles'
import { useSelector } from 'react-redux'

export default function Dashboard(props) {

    const { chart } = useSelector(state => state.dashboardArticles)

    return (
        <Container sx={{ ...containerStyle }} >
            <Header />
            {chart.viewsHistory.length >= 1 && <Linechart />}
            <Articles />
        </Container>
    )
}
