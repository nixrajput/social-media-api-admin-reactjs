import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    statsTillDate: null,
    stats: null,
    error: '',
};


const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        getStats: (state) => {
            state.status = 'loading';
        },

        getStatsSuccess: (state, action) => {
            state.status = 'success';
            state.statsTillDate = action.payload.statsTillDate;
            state.stats = action.payload.stats;
        },

        getStatsError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },

        resetStats: (state) => {
            state.status = 'idle';
            state.statsTillDate = null;
            state.stats = null;
            state.error = '';
        },
    }
});

export const {
    getStats,
    getStatsSuccess,
    getStatsError,
    resetStats,
} = statsSlice.actions;

export default statsSlice;