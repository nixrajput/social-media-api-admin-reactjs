import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    statsTillDate: null,
    stats: null,
    recentUsers: null,
    recentPosts: null,
    verifiedUsersStats: null,
    monthlyStats: null,
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

        getRecentUsers: (state) => {
            state.status = 'loading';
        },

        getRecentUsersSuccess: (state, action) => {
            state.status = 'success';
            state.recentUsers = action.payload.results;
        },

        getRecentUsersError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },

        resetRecentUsers: (state) => {
            state.status = 'idle';
            state.recentUsers = null;
            state.error = '';
        },

        getRecentPosts: (state) => {
            state.status = 'loading';
        },

        getRecentPostsSuccess: (state, action) => {
            state.status = 'success';
            state.recentPosts = action.payload.results;
        },

        getRecentPostsError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },

        resetRecentPosts: (state) => {
            state.status = 'idle';
            state.recentPosts = null;
            state.error = '';
        },

        getVerifiedUsersStats: (state) => {
            state.status = 'loading';
        },

        getVerifiedUsersStatsSuccess: (state, action) => {
            state.status = 'success';
            state.verifiedUsersStats = action.payload.stats;
        },

        getVerifiedUsersStatsError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },

        resetVerifiedUsersStats: (state) => {
            state.status = 'idle';
            state.verifiedUsersStats = null;
            state.error = '';
        },

        getMonthlyStats: (state) => {
            state.status = 'loading';
        },

        getMonthlyStatsSuccess: (state, action) => {
            state.status = 'success';
            state.monthlyStats = action.payload.results;
        },

        getMonthlyStatsError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },

        resetMonthlyStats: (state) => {
            state.status = 'idle';
            state.monthlyStats = null;
            state.error = '';
        },
    }
});

export const {
    getStats,
    getStatsSuccess,
    getStatsError,
    resetStats,
    getRecentUsers,
    getRecentUsersSuccess,
    getRecentUsersError,
    resetRecentUsers,
    getRecentPosts,
    getRecentPostsSuccess,
    getRecentPostsError,
    resetRecentPosts,
    getVerifiedUsersStats,
    getVerifiedUsersStatsSuccess,
    getVerifiedUsersStatsError,
    resetVerifiedUsersStats,
    getMonthlyStats,
    getMonthlyStatsSuccess,
    getMonthlyStatsError,
    resetMonthlyStats,
} = statsSlice.actions;

export default statsSlice;