import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    statsTillDate: null,
    stats: null,
    recentUsers: null,
    recentPosts: null,
    verifiedUsersStats: null,
    monthlyStats: null,
    error: null,
};

const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        getStats: (state) => {
            state.status = 'loading';
        },

        getStatsSuccess: (state, action) => {
            state.statsTillDate = action.payload.statsTillDate;
            state.stats = action.payload.stats;
            state.status = 'success';
        },

        getStatsError: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },

        resetStats: (state) => {
            state.statsTillDate = null;
            state.stats = null;
            state.error = null;
            state.status = 'idle';
        },

        getRecentUsers: (state) => {
            state.status = 'loading';
        },

        getRecentUsersSuccess: (state, action) => {
            state.recentUsers = action.payload.results;
            state.status = 'success';
        },

        getRecentUsersError: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },

        resetRecentUsers: (state) => {
            state.recentUsers = null;
            state.error = null;
            state.status = 'idle';
        },

        getRecentPosts: (state) => {
            state.status = 'loading';
        },

        getRecentPostsSuccess: (state, action) => {
            state.recentPosts = action.payload.results;
            state.status = 'success';
        },

        getRecentPostsError: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },

        resetRecentPosts: (state) => {
            state.recentPosts = null;
            state.error = null;
            state.status = 'idle';
        },

        getVerifiedUsersStats: (state) => {
            state.status = 'loading';
        },

        getVerifiedUsersStatsSuccess: (state, action) => {
            state.verifiedUsersStats = action.payload.stats;
            state.status = 'success';
        },

        getVerifiedUsersStatsError: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },

        resetVerifiedUsersStats: (state) => {
            state.verifiedUsersStats = null;
            state.error = null;
            state.status = 'idle';
        },

        getMonthlyStats: (state) => {
            state.status = 'loading';
        },

        getMonthlyStatsSuccess: (state, action) => {
            state.monthlyStats = action.payload.results;
            state.status = 'success';
        },

        getMonthlyStatsError: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },

        resetMonthlyStats: (state) => {
            state.status = 'idle';
            state.monthlyStats = null;
            state.error = null;
        },

        clearError: (state) => {
            state.error = null;
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
    clearError,
} = statsSlice.actions;

export default statsSlice;