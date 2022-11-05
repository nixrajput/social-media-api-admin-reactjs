import { createSlice } from "@reduxjs/toolkit";
import storage from '../../utils/storage';

const initialState = {
    token: '',
    expiresAt: '',
    status: 'idle',
    user: {},
    error: '',
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
            state.status = 'unauthenticated';
        },

        loadingUser: (state, action) => {
            if (state.status === 'authenticated') {
                state.status = 'loadingUser';
            }
        },

        loadUser: (state, action) => {
            if (state.status === 'loadingUser') {
                state.error = '';
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
            state.token = '';
            state.expiresAt = '';
            state.user = {};
            state.error = '';
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
            state.status = 'sending';
        },

        pending: (state, action) => {
            state.status = 'pending';
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
    pending,
    success,
} = authSlice.actions;

export default authSlice;