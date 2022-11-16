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


const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getPosts: (state, action) => {
            state.status = 'loading';
        },

        getPostsSuccess: (state, action) => {
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

        getPostsError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        clearError: (state, action) => {
            state.error = null;
            state.status = 'idle';
        },

        clearPosts: (state, action) => {
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

        deletePost: (state, action) => {
            state.results = state.results.filter(post => post._id !== action.payload);
        },

        updatePost: (state, action) => {
            const index = state.results.findIndex(post => post._id === action.payload._id);
            if (index !== -1) {
                state.results[index] = action.payload;
            }
        },

        addPost: (state, action) => {
            state.results.push(action.payload);
        },
    }
});

export const {
    getPosts,
    getPostsSuccess,
    getPostsError,
    clearError,
    clearPosts,
    deletePost,
    updatePost,
    addPost,
} = postsSlice.actions;

export default postsSlice;