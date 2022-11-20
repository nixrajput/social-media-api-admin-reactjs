import { createSlice } from "@reduxjs/toolkit";
import storage from '../../utils/storage';

const initialState = {
    status: 'idle',
    token: null,
    expiresAt: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticating: (state, action) => {
            state.status = 'authenticating';
        },

        authenticated: (state, action) => {
            state.token = action.payload.token;
            state.expiresAt = action.payload.expiresAt;
            storage.set('auth', action.payload);
            state.status = 'authenticated';
        },

        unauthenticated: (state, action) => {
            state.token = null;
            state.expiresAt = null;
            state.error = null;
            storage.remove('auth');
            state.status = 'unauthenticated';
        },

        setError: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },

        logout: (state, action) => {
            state.token = null;
            state.expiresAt = null;
            state.error = null;
            storage.remove('auth');
            storage.remove('user');
            state.status = 'idle';
        },

        sendingEmail: (state, action) => {
            state.status = 'sendingEmail';
        },

        emailSent: (state, action) => {
            state.status = 'emailSent';
        },

        resetPassword: (state, action) => {
            state.status = 'resetPassword';
        },

        passwordReset: (state, action) => {
            state.status = 'passwordReset';
        },

        success: (state, action) => {
            state.status = 'success';
        },
    }
});

export const {
    authenticating,
    authenticated,
    unauthenticated,
    logout,
    setError,
    sendingEmail,
    emailSent,
    resetPassword,
    passwordReset,
    success,
} = authSlice.actions;

export default authSlice;