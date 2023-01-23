import apiClient from "../../api/apiClient";
import {
    getPosts,
    getPostsSuccess,
    getPostsError,
    loadMorePosts,
    loadMorePostsSuccess,
    loadMorePostsError,
    searchingPosts,
    searchingPostsSuccess,
    searchingPostsError,
    clearError as clearPostsError,
} from '../slices/postsSlice';
import {
    getPostDetails,
    getPostDetailsSuccess,
    getPostDetailsError,
    clearError as clearPostDetailsError,
} from '../slices/postDetailsSlice';
import ApiUrls from "../../constants/urls";

export const getPostsAction = async (dispatch, token, page = 1, limit = 10) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(getPostsError('No token found'));
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

export const loadMorePostsAction = async (dispatch, token, page, limit = 20) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(loadMorePostsError('No token found'));
        return;
    }

    if (!page) {
        dispatch(loadMorePostsError('Page number is required'));
        return;
    }

    if (page < 1) {
        dispatch(loadMorePostsError('Page number must be greater than 0'));
        return;
    }

    dispatch(loadMorePosts());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.getPostsEndpoint}?page=${page}&limit=${limit}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(loadMorePostsSuccess(response));
        }
        else {
            dispatch(loadMorePostsError(response.message));
        }
    } catch (error) {
        dispatch(loadMorePostsError(error));
    }
}

export const getPostDetailsAction = async (dispatch, token, postId) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(getPostDetailsError('No token found'));
        return;
    }

    if (!postId) {
        dispatch(getPostDetailsError('Post id is required'));
        return;
    }

    dispatch(getPostDetails());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get(
            `${ApiUrls.getPostDetailsEndpoint}?id=${postId}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(getPostDetailsSuccess(response));
        }
        else {
            dispatch(getPostDetailsError(response.message));
        }
    } catch (error) {
        dispatch(getPostDetailsError(error));
    }
}

export const searchPostsAction = async (dispatch, token, searchQuery, page = 1, limit = 10) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(searchingPostsError('No token found'));
        return;
    }

    if (!searchQuery) {
        dispatch(searchingPostsError('Search query is required'));
        return;
    }

    dispatch(searchingPosts());
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
        const response = await apiClient.get(
            `${ApiUrls.searchPostsEndpoint}?q=${searchQuery}&page=${page}&limit=${limit}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(searchingPostsSuccess(response));
        }
        else {
            dispatch(searchingPostsError(response.message));
        }
    } catch (error) {
        dispatch(searchingPostsError(error));
    }
}

export const clearPostsErrorAction = (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearPostsError());
}

export const clearPostDetailsErrorAction = (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearPostDetailsError());
}
