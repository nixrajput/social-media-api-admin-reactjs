import apiClient from "../../api/apiClient";
import {
    getProjects, getProjectsError,
    getProjectsSuccess, loadMoreProjects,
    loadMoreProjectsSuccess, loadMoreProjectsError,
    searchingProjects, searchingProjectsSuccess,
    searchingProjectsError, clearProjectsError,
} from '../slices/projectSlice';
import {
    getProjectDetails, getProjectDetailsError,
    getProjectDetailsSuccess, clearProjectDetailsError
} from '../slices/projectDetailsSlice';
import ApiUrls from "../../constants/urls";

export const getProjectsAction = async (dispatch, token, page = 1, limit = 10) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(getProjectsError('No token found'));
        return;
    }

    dispatch(getProjects());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.getProjectsEndpoint}?page=${page}&limit=${limit}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(getProjectsSuccess(response));
        }
        else {
            dispatch(getProjectsError(response.message));
        }
    } catch (error) {
        dispatch(getProjectsError(error));
    }
}

export const loadMoreProjectsAction = async (dispatch, token, page, limit = 10) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }
    if (!token) {
        dispatch(loadMoreProjectsError('No token found'));
        return;
    }

    if (!page) {
        dispatch(loadMoreProjectsError("Page number is required"));
        return;
    }

    if (page < 1) {
        dispatch(loadMoreProjectsError("Page number must be greater than 0"));
        return;
    }

    dispatch(loadMoreProjects());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.getProjectsEndpoint}?page=${page}&limit=${limit}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(loadMoreProjectsSuccess(response));
        }
        else {
            dispatch(loadMoreProjectsError(response.message));
        }
    } catch (error) {
        dispatch(loadMoreProjectsError(error));
    }
}

export const getProjectDetailsAction = async (dispatch, token, projectId) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(getProjectDetailsError('No token found'));
        return;
    }

    if (!projectId) {
        dispatch(getProjectDetailsError("Project id is required"));
        return;
    }

    dispatch(getProjectDetails());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.getProjectDetailsEndpoint}?id=${projectId}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(getProjectDetailsSuccess(response));
        }
        else {
            dispatch(getProjectDetailsError(response.message));
        }
    } catch (error) {
        dispatch(getProjectDetailsError(error));
    }
}

export const searcProjectsAction = async (dispatch, token, searchText) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!token) {
        dispatch(searchingProjectsError('No token found'));
        return;
    }

    if (!searchText) {
        dispatch(searchingProjectsError("Search text is required"));
        return;
    }

    dispatch(searchingProjects());

    try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await apiClient.get(
            `${ApiUrls.searchProjectsEndpoint}?q=${searchText}`,
            { headers }
        );
        if (response.status === 200) {
            dispatch(searchingProjectsSuccess(response));
        }
        else {
            dispatch(searchingProjectsError(response.message));
        }
    } catch (error) {
        dispatch(searchingProjectsError(error));
    }
}

export const clearProjectsErrorAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearProjectsError());
}

export const clearProjectsDetailsErrorAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearProjectDetailsError());
}