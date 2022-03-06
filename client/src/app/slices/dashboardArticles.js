

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboardArticles: [],
    isModalOpen: false,
    viewsHistory: [],
    chart: {
        viewsHistory: [],
        months: []
    }
}

const dashboardArticles = createSlice({
    name: 'dashboardArticles',
    initialState,
    reducers: {
        updateArticles: (state, { payload }) => {
            state.dashboardArticles = payload
        },
        updateDeleteModal: (state, { payload }) => {
            state.isModalOpen = payload
        },
        updateViewsHistory: (state, { payload }) => {
            state.chart.viewsHistory = payload
        },
        updateMonths: (state, { payload }) => {
            state.chart.months = payload
        },
    }
})

export const { updateArticles, updateDeleteModal, updateViewsHistory, updateMonths } = dashboardArticles.actions
export default dashboardArticles.reducer
