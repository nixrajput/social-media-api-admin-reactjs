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


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.status = 'loading';
        },

        getUsersSuccess: (state, action) => {
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

        getUsersError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        clearError: (state, action) => {
            state.error = null;
            state.status = 'idle';
        },

        clearUsers: (state, action) => {
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

        deleteUser: (state, action) => {
            state.results = state.results.filter(user => user._id !== action.payload);
        },

        updateUser: (state, action) => {
            const index = state.results.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
                state.results[index] = action.payload;
            }
        },

        addUser: (state, action) => {
            state.results.push(action.payload);
        },
    }
});

export const {
    getUsers,
    getUsersSuccess,
    getUsersError,
    clearError,
    clearUsers,
    deleteUser,
    updateUser,
    addUser,
} = usersSlice.actions;

export default usersSlice;