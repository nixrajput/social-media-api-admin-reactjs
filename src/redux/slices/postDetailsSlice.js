import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    post: null,
    error: null,
};

const postDetailsSlice = createSlice({
    name: "postDetails",
    initialState,
    reducers: {
        getPostDetails: (state, action) => {
            state.status = 'loading';
        },

        getPostDetailsSuccess: (state, action) => {
            state.post = action.payload.post;
            state.status = 'success';
        },

        getPostDetailsError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        clearError: (state, action) => {
            state.error = null;
        },

        clearPostDetails: (state, action) => {
            state.post = null;
            state.error = null;
            state.status = 'idle';
        }
    }
});

export const {
    getPostDetails,
    getPostDetailsSuccess,
    getPostDetailsError,
    clearError,
    clearPostDetails
} = postDetailsSlice.actions;

export default postDetailsSlice;