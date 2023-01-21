import apiClient from "../../api/apiClient";
import {
    getProjects, getProjectsError,
    getProjectsSuccess, clearProjectsError,
    loadMoreProjects, loadMoreProjectsSuccess
} from '../slices/projectSlice';
import {
    getProjectDetails, getProjectDetailsError,
    getProjectDetailsSuccess, clearProjectDetailsError
} from '../slices/projectDetailsSlice';
import ApiUrls from "../../constants/urls";

export const getProjectsAction = async (dispatch, page = 1, limit = 10) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(getProjects());

    try {
        const response = await apiClient.get(
            `${ApiUrls.getProjectsEndpoint}?page=${page}&limit=${limit}`
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

export const loadMoreProjectsAction = async (dispatch, page, limit = 10) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!page) {
        getProjectsError("Page number is required");
        return;
    }

    if (page < 1) {
        getProjectsError("Page number must be greater than 0");
        return;
    }

    dispatch(loadMoreProjects());

    try {
        const response = await apiClient.get(
            `${ApiUrls.getProjectsEndpoint}?page=${page}&limit=${limit}`
        );
        if (response.status === 200) {
            dispatch(loadMoreProjectsSuccess(response));
        }
        else {
            dispatch(getProjectsError(response.message));
        }
    } catch (error) {
        dispatch(getProjectsError(error));
    }
}

export const getProjectDetailsAction = async (dispatch, projectId) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!projectId) {
        getProjectDetailsError("Project id is required");
        return;
    }

    dispatch(getProjectDetails());

    try {
        const response = await apiClient.get(
            `${ApiUrls.getProjectDetailsEndpoint}?projectId=${projectId}`,
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

export const incrementProjectViewsCountAction = async (dispatch, projectId) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!projectId) {
        console.log("Project id is required");
        return;
    }

    try {
        const response = await apiClient.get(
            `${ApiUrls.incrementProjectViewsCountEndpoint}?projectId=${projectId}`,
        );
        if (response.status === 200) {
            console.log("Incremented project views");
        }
        else {
            console.log("Failed to increment project views");
        }
    } catch (error) {
        console.log(error);
    }
}

export const incrementProjectDownloadsCountAction = async (dispatch, projectId) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    if (!projectId) {
        console.log("Project id is required");
        return;
    }

    try {
        const response = await apiClient.get(
            `${ApiUrls.incrementProjectDownloadsCountEndpoint}?projectId=${projectId}`,
        );
        if (response.status === 200) {
            console.log("Incremented project downloads count");
        }
        else {
            console.log("Failed to increment project downloads count");
        }
    } catch (error) {
        console.log(error);
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