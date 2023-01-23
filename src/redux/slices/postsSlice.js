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
    results: null,
    postList: [],
    error: null,
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
            state.postList = [...state.results];
            state.status = 'success';
        },

        getPostsError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        loadMorePosts: (state, action) => {
            state.status = 'loadingMore';
        },

        loadMorePostsSuccess: (state, action) => {
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.hasNextPage = action.payload.hasNextPage;
            state.hasPrevPage = action.payload.hasPrevPage;
            state.limit = action.payload.limit;
            state.nextPage = action.payload.nextPage;
            state.prevPage = action.payload.prevPage;
            state.results = JSON.parse(JSON.stringify(action.payload.results));
            state.postList = [...state.postList, ...state.results];
            state.status = 'success';
        },

        loadMorePostsError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        searchingPosts: (state, action) => {
            state.status = 'searching';
        },

        searchingPostsSuccess: (state, action) => {
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.hasNextPage = action.payload.hasNextPage;
            state.hasPrevPage = action.payload.hasPrevPage;
            state.limit = action.payload.limit;
            state.nextPage = action.payload.nextPage;
            state.prevPage = action.payload.prevPage;
            state.results = JSON.parse(JSON.stringify(action.payload.results));
            state.postList = [...state.results];
            state.status = 'success';
        },

        searchingPostsError: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },

        clearError: (state, action) => {
            state.error = null;
        },

        clearPosts: (state, action) => {
            state.currentPage = null;
            state.totalPages = null;
            state.hasNextPage = false;
            state.hasPrevPage = false;
            state.limit = null;
            state.nextPage = null;
            state.prevPage = null;
            state.results = null;
            state.postList = [];
            state.error = null;
            state.status = 'idle';
        },
    }
});

export const {
    getPosts,
    getPostsSuccess,
    getPostsError,
    loadMorePosts,
    loadMorePostsSuccess,
    loadMorePostsError,
    searchingPosts,
    searchingPostsSuccess,
    searchingPostsError,
    clearError,
    clearPosts,
} = postsSlice.actions;

export default postsSlice;