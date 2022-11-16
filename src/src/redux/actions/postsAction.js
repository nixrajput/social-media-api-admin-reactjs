import apiClient from "../../api/apiClient";
import {
    getPosts,
    getPostsSuccess,
    getPostsError,
} from '../slices/postsSlice';
import ApiUrls from "../../constants/urls";

export const getAllPostsAction = async (dispatch, token, page = 1, limit = 10) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        console.log('No token found');
        return;
    }

    dispatch(getPosts());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get(
            `${ApiUrls.getPostsEndpoint}?page=${page}&limit=${limit}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(getPostsSuccess(response));
        }
        else {
            dispatch(getPostsError(response.message));
        }
    } catch (error) {
        dispatch(getPostsError(error));
    }
}