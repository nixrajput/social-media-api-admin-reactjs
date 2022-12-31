import apiClient from "../../api/apiClient";
import {
    getUsers,
    getUsersSuccess,
    getUsersError,
} from '../slices/usersSlice';
import {
    getUserDetails,
    getUserDetailsSuccess,
    getUserDetailsError,
} from '../slices/userDetailsSlice';
import ApiUrls from "../../constants/urls";

export const getAllUsersAction = async (dispatch, token, page = 1, limit = 10) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        console.log('No token found');
        return;
    }

    dispatch(getUsers());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
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