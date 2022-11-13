import apiClient from "../../api/apiClient";
import {
    getUsers,
    getUsersSuccess,
    getUsersError,
} from '../slices/usersSlice';

export const getAllUsersAction = async (dispatch, token, page = 1, limit = 10) => {
    if (!dispatch) {
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
            `/admin/users?page=${page}&limit=${limit}`,
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