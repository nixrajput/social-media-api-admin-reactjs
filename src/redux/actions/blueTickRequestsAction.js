import apiClient from "../../api/apiClient";
import {
    getRequests,
    getRequestsSuccess,
    getRequestsError,
    clearError,
} from '../slices/blueTickRequestsSlice';
import ApiUrls from "../../constants/urls";

export const getAllBlueTickRequestsAction = async (dispatch, token, page = 1, limit = 10) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(getRequestsError("No token found"));
        return;
    }

    dispatch(getRequests());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
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

export const clearBlueTickRequestsErrorAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearError());
}