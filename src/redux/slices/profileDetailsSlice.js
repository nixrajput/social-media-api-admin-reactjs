import { createSlice } from "@reduxjs/toolkit";
import storage from '../../utils/storage';

const initialState = {
    status: 'idle',
    user: null,
    error: '',
};

const profileDetailsSlice = createSlice({
    name: "profileDetails",
    initialState,
    reducers: {
        loadProfileDetails: (state, action) => {
            state.status = 'loading';
        },

        loadProfileDetailsSuccess: (state, action) => {
            state.user = action.payload;
            state.status = 'success';
        },

        loadProfileDetailsError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        getProfileDetails: (state, action) => {
            state.status = 'loading';
        },

        getProfileDetailsSuccess: (state, action) => {
            state.user = action.payload.user;
            storage.set('user', action.payload.user);
            state.status = 'success';
        },

        getProfileDetailsError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        clearError: (state, action) => {
            state.error = null;
            state.status = 'noError';
        },

        clearProfileDetails: (state, action) => {
            state.user = null;
            state.error = null;
            storage.remove('user');
            state.status = 'idle';
        },

        updateProfileDetails: (state, action) => {
            state.status = 'loading';
        },

        updateProfileDetailsSuccess: (state, action) => {
            state.user = action.payload.user;
            state.status = 'success';
        },

        updateProfileDetailsError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        updatePassword: (state, action) => {
            state.status = 'loading';
        },

        updatePasswordSuccess: (state, action) => {
            state.status = 'success';
        },

        updatePasswordError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },
    }
});

export const {
    loadProfileDetails,
    loadProfileDetailsSuccess,
    loadProfileDetailsError,
    getProfileDetails,
    getProfileDetailsSuccess,
    getProfileDetailsError,
    clearError,
    clearProfileDetails,
    updateProfileDetails,
    updateProfileDetailsSuccess,
    updateProfileDetailsError,
    updatePassword,
    updatePasswordSuccess,
    updatePasswordError
} = profileDetailsSlice.actions;

export default profileDetailsSlice;