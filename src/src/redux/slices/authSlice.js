import { createSlice } from "@reduxjs/toolkit";
import storage from '../../utils/storage';

const initialState = {
    token: null,
    expiresAt: null,
    status: 'idle',
    user: null,
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
            if (state.status === 'authenticating') {
                state.token = action.payload.token;
                state.expiresAt = action.payload.expiresAt;
                storage.set('auth', action.payload);
                state.status = 'authenticated';
            }
        },

        unauthenticated: (state, action) => {
            state.token = null;
            state.expiresAt = null;
            state.user = null;
            state.error = null;
            storage.remove('auth');
            state.status = 'unauthenticated';
        },

        loadingUser: (state, action) => {
            if (state.status === 'authenticated') {
                state.status = 'loadingUser';
            }
        },

        loadUser: (state, action) => {
            if (state.status === 'loadingUser') {
                state.error = null;
                state.user = action.payload;
                storage.set('user', action.payload);
                state.status = 'userLoaded';
            }
        },

        setError: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },

        logout: (state, action) => {
            state.token = null;
            state.expiresAt = null;
            state.user = null;
            state.error = null;
            storage.remove('auth');
            storage.remove('user');
            state.status = 'idle';
        },

        registering: (state, action) => {
            state.status = 'registering';
        },

        registered: (state, action) => {
            if (state.status === 'registering') {
                state.status = 'registered';
            }
        },

        sendingEmail: (state, action) => {
            state.status = 'sendingEmail';
        },

        emailSent: (state, action) => {
            if (state.status === 'sendingEmail') {
                state.status = 'emailSent';
            }
        },

        resetPassword: (state, action) => {
            state.status = 'resetPassword';
        },

        passwordReset: (state, action) => {
            if (state.status === 'resetPassword') {
                state.status = 'passwordReset';
            }
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
    loadingUser,
    loadUser,
    logout,
    setError,
    registering,
    registered,
    sendingEmail,
    emailSent,
    resetPassword,
    passwordReset,
    success,
} = authSlice.actions;

export default authSlice;