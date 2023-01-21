import apiClient from "../../api/apiClient";
import {
    getUsers,
    getUsersSuccess,
    getUsersError,
    loadMoreUsers,
    loadMoreUsersSuccess,
    clearError as clearUsersError,
} from '../slices/usersSlice';
import {
    getUserDetails,
    getUserDetailsSuccess,
    getUserDetailsError,
    clearError as clearUserDetailsError,
} from '../slices/userDetailsSlice';
import ApiUrls from "../../constants/urls";

export const getAllUsersAction = async (dispatch, token, page = 1, limit = 20) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        console.log('No token found');
        return;
    }

    dispatch(getUsers());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.getUsersEndpoint}?page=${page}&limit=${limit}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(getUsersSuccess(response));
        }
        else {
            dispatch(getUsersError(response.message));
        }
    } catch (error) {
        dispatch(getUsersError(error));
    }
}

export const loadMoreUsersAction = async (dispatch, token, page, limit = 20) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        getUsersError('No token found');
        return;
    }

    if (!page) {
        getUsersError("Page number is required");
        return;
    }

    if (page < 1) {
        getUsersError("Page number must be greater than 0");
        return;
    }

    dispatch(loadMoreUsers());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.getUsersEndpoint}?page=${page}&limit=${limit}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(loadMoreUsersSuccess(response));
        }
        else {
            dispatch(getUsersError(response.message));
        }
    } catch (error) {
        dispatch(getUsersError(error));
    }
}

export const getUserDetailsAction = async (dispatch, token, userId) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        console.log('No token found');
        return;
    }

    if (!userId) {
        console.log('No user id found');
        return;
    }

    dispatch(getUserDetails());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get(
            `${ApiUrls.getUserDetailsEndpoint}?id=${userId}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(getUserDetailsSuccess(response));
        }
        else {
            dispatch(getUserDetailsError(response.message));
        }
    } catch (error) {
        dispatch(getUserDetailsError(error));
    }
}

export const clearUsersErrorAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearUsersError());
}

export const clearUserDetailsErrorAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearUserDetailsError());
}