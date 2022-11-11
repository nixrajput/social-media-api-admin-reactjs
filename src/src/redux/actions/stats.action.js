import apiClient from "../../api/apiClient";
import {
    getStats,
    getStatsSuccess,
    getStatsError,
} from '../slices/statsSlice';

export const fetchStatsProgress = async (dispatch, token) => {
    if (!dispatch) {
        return;
    }
    if (!token) {
        console.log('No token found');
        return;
    }

    dispatch(getStats());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get(`/admin/get-progress`, { headers });
        if (response.status === 200) {
            dispatch(getStatsSuccess(response));
        }
        else {
            dispatch(getStatsError(response.message));
        }
    } catch (error) {
        dispatch(getStatsError(error));
    }
}