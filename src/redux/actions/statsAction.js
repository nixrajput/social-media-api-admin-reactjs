import apiClient from "../../api/apiClient";
import {
    getStats,
    getStatsSuccess,
    getStatsError,
    getRecentPosts,
    getRecentPostsSuccess,
    getRecentPostsError,
    getRecentUsers,
    getRecentUsersSuccess,
    getRecentUsersError,
    getVerifiedUsersStats,
    getVerifiedUsersStatsSuccess,
    getVerifiedUsersStatsError,
    getMonthlyStats,
    getMonthlyStatsSuccess,
    getMonthlyStatsError,
} from '../slices/statsSlice';
import ApiUrls from "../../constants/urls";

export const getStatsAction = async (dispatch, token) => {
    if (!dispatch) {
        console.log('Dispatch is null');
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

export const getRecentUsersAction = async (dispatch, token) => {
    if (!dispatch) {
        console.log('Dispatch is null');
        return;
    }
    if (!token) {
        console.log('No token found');
        return;
    }

    dispatch(getRecentUsers());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get(ApiUrls.getRecentUsersEndpoint, { headers });
        if (response.status === 200) {
            dispatch(getRecentUsersSuccess(response));
        }
        else {
            dispatch(getRecentUsersError(response.message));
        }
    } catch (error) {
        dispatch(getRecentUsersError(error));
    }
}

export const getRecentPostsAction = async (dispatch, token) => {
    if (!dispatch) {
        console.log('Dispatch is null');
        return;
    }
    if (!token) {
        console.log('No token found');
        return;
    }

    dispatch(getRecentPosts());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get(ApiUrls.getRecentPostsEndpoint, { headers });
        if (response.status === 200) {
            dispatch(getRecentPostsSuccess(response));
        }
        else {
            dispatch(getRecentPostsError(response.message));
        }
    } catch (error) {
        dispatch(getRecentPostsError(error));
    }
}

export const getVerifiedUsersStatsAction = async (dispatch, token) => {
    if (!dispatch) {
        console.log('Dispatch is null');
        return;
    }
    if (!token) {
        console.log('No token found');
        return;
    }

    dispatch(getVerifiedUsersStats());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get(ApiUrls.getVerifiedUsersStatsEndpoint, { headers });
        if (response.status === 200) {
            dispatch(getVerifiedUsersStatsSuccess(response));
        }
        else {
            dispatch(getVerifiedUsersStatsError(response.message));
        }
    } catch (error) {
        dispatch(getVerifiedUsersStatsError(error));
    }
}

export const getMonthlyStatsAction = async (dispatch, token) => {
    if (!dispatch) {
        console.log('Dispatch is null');
        return;
    }
    if (!token) {
        console.log('No token found');
        return;
    }

    dispatch(getMonthlyStats());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get(ApiUrls.getMonthlyStatsEndpoint, { headers });
        if (response.status === 200) {
            dispatch(getMonthlyStatsSuccess(response));
        }
        else {
            dispatch(getMonthlyStatsError(response.message));
        }
    } catch (error) {
        dispatch(getMonthlyStatsError(error));
    }
}