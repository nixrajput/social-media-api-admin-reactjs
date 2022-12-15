import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    currentPage: null,
    totalPages: null,
    hasNextPage: false,
    hasPrevPage: false,
    limit: null,
    nextPage: null,
    prevPage: null,
    results: [],
    error: '',
};


const blueTickRequestsSlice = createSlice({
    name: "blueTickRequests",
    initialState,
    reducers: {
        getRequests: (state, action) => {
            state.status = 'loading';
        },

        getRequestsSuccess: (state, action) => {
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.hasNextPage = action.payload.hasNextPage;
            state.hasPrevPage = action.payload.hasPrevPage;
            state.limit = action.payload.limit;
            state.nextPage = action.payload.nextPage;
            state.prevPage = action.payload.prevPage;
            state.results = JSON.parse(JSON.stringify(action.payload.results));
            state.status = 'success';
        },

        getRequestsError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        clearError: (state, action) => {
            state.error = null;
            state.status = 'idle';
        },

        clearRequests: (state, action) => {
            state.currentPage = null;
            state.totalPages = null;
            state.hasNextPage = false;
            state.hasPrevPage = false;
            state.limit = null;
            state.nextPage = null;
            state.prevPage = null;
            state.results = [];
            state.error = null;
            state.status = 'idle';
        },
    }
});

export const {
    getRequests,
    getRequestsSuccess,
    getRequestsError,
    clearError,
    clearRequests,
} = blueTickRequestsSlice.actions;

export default blueTickRequestsSlice;