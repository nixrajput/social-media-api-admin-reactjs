import apiClient from "../../api/apiClient";
import {
    loadProfileDetails,
    loadProfileDetailsSuccess,
    loadProfileDetailsError,
    getProfileDetails,
    getProfileDetailsSuccess,
    getProfileDetailsError,
} from '../slices/profileDetailsSlice';
import ApiUrls from "../../constants/urls";
import storage from "../../utils/storage";

export const loadProfileDetailsAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(loadProfileDetails());
    try {
        const data = storage.get('user');
        if (data) {
            dispatch(loadProfileDetailsSuccess(data));
        }
        else {
            dispatch(loadProfileDetailsError("No user data found"));
        }
    } catch (error) {
        dispatch(loadProfileDetailsError(error));
    }
};


export const getProfileDetailsAction = async (dispatch, token) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        console.log('No token found');
        return;
    }

    dispatch(getProfileDetails());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get(ApiUrls.getProfileEndpoint, { headers });
        if (response.status === 200) {
            dispatch(getProfileDetailsSuccess(response));
        }
        else {
            dispatch(getProfileDetailsError(response.message));
        }
    } catch (error) {
        dispatch(getProfileDetailsError(error));
    }
}