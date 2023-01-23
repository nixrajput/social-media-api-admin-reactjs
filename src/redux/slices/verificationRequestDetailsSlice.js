import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    data: null,
    error: null,
};

const verificationRequestDetailsSlice = createSlice({
    name: "verificationRequestDetails",
    initialState,
    reducers: {
        getVerificationRequestDetails: (state, action) => {
            state.status = 'loading';
        },

        getVerificationRequestDetailsSuccess: (state, action) => {
            state.data = action.payload.data;
            state.status = 'success';
        },

        getVerificationRequestDetailsError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        clearVerificationRequestDetailsError: (state, action) => {
            state.error = null;
        },

        clearVerificationRequestDetails: (state, action) => {
            state.data = null;
            state.error = null;
            state.status = 'idle';
        },

        approveVerificationRequest: (state, action) => {
            state.status = 'approving';
        },

        approveVerificationRequestSuccess: (state, action) => {
            state.data = state.data.status = 'approved';
            state.status = 'approved';
        },

        approveVerificationRequestError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },

        rejectVerificationRequest: (state, action) => {
            state.status = 'rejecting';
        },

        rejectVerificationRequestSuccess: (state, action) => {
            state.status = 'rejected';
        },

        rejectVerificationRequestError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },
    }
});

export const {
    getVerificationRequestDetails,
    getVerificationRequestDetailsSuccess,
    getVerificationRequestDetailsError,
    clearVerificationRequestDetailsError,
    clearVerificationRequestDetails,
    approveVerificationRequest,
    approveVerificationRequestSuccess,
    approveVerificationRequestError,
    rejectVerificationRequest,
    rejectVerificationRequestSuccess,
    rejectVerificationRequestError,
} = verificationRequestDetailsSlice.actions;

export default verificationRequestDetailsSlice;