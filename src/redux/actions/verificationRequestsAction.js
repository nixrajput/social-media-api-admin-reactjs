import apiClient from "../../api/apiClient";
import {
    getRequests,
    getRequestsSuccess,
    loadMoreRequests,
    loadMoreRequestsSuccess,
    getRequestsError,
    clearError,
} from '../slices/verificationRequestsSlice';
import {
    getVerificationRequestDetails,
    getVerificationRequestDetailsSuccess,
    getVerificationRequestDetailsError,
    clearVerificationRequestDetailsError,
    approveVerificationRequest,
    approveVerificationRequestSuccess,
    approveVerificationRequestError,
    rejectVerificationRequest,
    rejectVerificationRequestSuccess,
    rejectVerificationRequestError,
} from '../slices/verificationRequestDetailsSlice';
import ApiUrls from "../../constants/urls";

export const getRequestsAction = async (dispatch, token, page = 1, limit = 20) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(getRequestsError("No token found"));
        return;
    }

    dispatch(getRequests());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.getVerificationRequestsEndpoint}?page=${page}&limit=${limit}`,
            { headers }
        );

        if (response.status === 200) {
            dispatch(getRequestsSuccess(response));
        }
        else {
            dispatch(getRequestsError(response.message));
        }
    } catch (error) {
        dispatch(getRequestsError(error));
    }
}

export const loadMoreRequestsAction = async (dispatch, token, page, limit = 20) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        getRequestsError('No token found');
        return;
    }

    if (!page) {
        getRequestsError("Page number is required");
        return;
    }

    if (page < 1) {
        getRequestsError("Page number must be greater than 0");
        return;
    }

    dispatch(loadMoreRequests());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.getVerificationRequestsEndpoint}?page=${page}&limit=${limit}`,
            { headers }
        );

        if (response.status === 200) {
            dispatch(loadMoreRequestsSuccess(response));
        }
        else {
            dispatch(getRequestsError(response.message));
        }
    } catch (error) {
        dispatch(getRequestsError(error));
    }
}

export const getVerificationRequestDetailsAction = async (dispatch, token, id) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(getVerificationRequestDetailsError("No token found"));
        return;
    }

    if (!id) {
        dispatch(getVerificationRequestDetailsError("Id is required"));
        return;
    }

    dispatch(getVerificationRequestDetails());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.getVerificationRequestDetailsEndpoint}?id=${id}`,
            { headers }
        );

        if (response.status === 200) {
            dispatch(getVerificationRequestDetailsSuccess(response));
        }
        else {
            dispatch(getVerificationRequestDetailsError(response.message));
        }
    } catch (error) {
        dispatch(getVerificationRequestDetailsError(error));
    }
}

export const approveVerificationRequestAction = async (dispatch, token, id) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(approveVerificationRequestError("No token found"));
        return;
    }

    if (!id) {
        dispatch(approveVerificationRequestError("Id is required"));
        return;
    }

    dispatch(approveVerificationRequest());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.approveVerificationRequestEndpoint}?id=${id}`,
            { headers }
        );

        if (response.status === 200) {
            dispatch(approveVerificationRequestSuccess(response));
        }

        else {
            dispatch(approveVerificationRequestError(response.message));
        }
    } catch (error) {
        dispatch(approveVerificationRequestError(error));
    }
}

export const rejectVerificationRequestAction = async (dispatch, token, id, reason) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(rejectVerificationRequestError("No token found"));
        return;
    }

    if (!id) {
        dispatch(rejectVerificationRequestError("Id is required"));
        return;
    }

    dispatch(rejectVerificationRequest());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const body = {
            id: id,
            reason: reason,
        }

        const response = await apiClient.post(
            `${ApiUrls.rejectVerificationRequestEndpoint}`,
            body,
            { headers }
        );

        if (response.status === 200) {
            dispatch(rejectVerificationRequestSuccess(response));
        }

        else {
            dispatch(rejectVerificationRequestError(response.message));
        }
    } catch (error) {
        dispatch(rejectVerificationRequestError(error));
    }
}

export const clearRequestsErrorAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearError());
}

export const clearVerificationRequestDetailsErrorAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearVerificationRequestDetailsError());
}