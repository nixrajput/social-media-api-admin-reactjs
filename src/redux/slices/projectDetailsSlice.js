import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    project: null,
    error: null,
};


const projectDetailsSlice = createSlice({
    name: "projectDetails",
    initialState,
    reducers: {
        getProjectDetails: (state, action) => {
            state.status = 'loading';
        },

        getProjectDetailsSuccess: (state, action) => {
            state.project = action.payload.project;
            state.status = 'success';
        },

        getProjectDetailsError: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },

        clearProjectDetailsError: (state, action) => {
            state.error = null;
        },

        clearProjectDetails: (state, action) => {
            state.project = null;
            state.error = null;
            state.status = 'idle';
        }
    }
});

export const {
    getProjectDetails,
    getProjectDetailsSuccess,
    getProjectDetailsError,
    clearProjectDetailsError,
    clearProjectDetails,
} = projectDetailsSlice.actions;

export default projectDetailsSlice;