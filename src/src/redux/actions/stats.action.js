import apiClient from "../../api/apiClient";
import {
    getStats,
    getStatsSuccess,
    getStatsError,
} from '../slices/statsSlice';
import ApiUrls from "../../constants/urls";

export const getStatsAction = async (dispatch, token) => {
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
        const response = await apiClient.get(ApiUrls.getStatsEndpoint, { headers });
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