import apiClient from "../../api/apiClient";
import {
    getRequests,
    getRequestsSuccess,
    loadMoreRequests,
    loadMoreRequestsSuccess,
    getRequestsError,
    clearError,
} from '../slices/verificationRequestsSlice';
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
            `${ApiUrls.getBlueTickRequestsEndpoint}?page=${page}&limit=${limit}`,
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
            `${ApiUrls.getUsersEndpoint}?page=${page}&limit=${limit}`,
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

export const clearRequestsErrorAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearError());
}