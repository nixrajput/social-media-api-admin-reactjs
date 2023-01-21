import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    user: null,
    error: null,
};

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        getUserDetails: (state, action) => {
            state.status = 'loading';
        },

        getUserDetailsSuccess: (state, action) => {
            state.user = action.payload.user;
            state.status = 'success';
        },

        getUserDetailsError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        clearError: (state, action) => {
            state.error = null;
        },

        clearUserDetails: (state, action) => {
            state.user = null;
            state.error = null;
            state.status = 'idle';
        }
    }
});

export const {
    getUserDetails,
    getUserDetailsSuccess,
    getUserDetailsError,
    clearError,
    clearUserDetails
} = userDetailsSlice.actions;

export default userDetailsSlice;