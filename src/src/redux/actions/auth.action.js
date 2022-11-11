import apiClient from "../../api/apiClient";
import {
    loadUser, loadingUser,
    setError
} from '../slices/authSlice';

export const fetchProfileDetails = async (dispatch, token) => {
    if (!dispatch) {
        return;
    }
    if (!token) {
        console.log('No token found');
        return;
    }

    dispatch(loadingUser());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get('/me', { headers });
        if (response.status === 200) {
            dispatch(loadUser(response.user));
        }
        else {
            dispatch(setError(response.message));
        }
    } catch (error) {
        dispatch(setError(error));
    }
}