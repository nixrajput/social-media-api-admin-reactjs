import apiClient from "../../api/apiClient";
import {
    authenticating, authenticated, unauthenticated,
    sendingEmail, emailSent, resetPassword, passwordReset,
    setError
} from '../slices/authSlice';
import { clearProfileDetails } from '../slices/profileDetailsSlice';
import ApiUrls from "../../constants/urls";
import storage from "../../utils/storage";

export const loginAction = async (dispatch, emailUname, password) => {
    const body = {
        "emailUname": emailUname.trim(),
        "password": password.trim(),
    };

    dispatch(authenticating());

    try {
        const response = await apiClient.post(ApiUrls.loginEndpoint, body);
        if (response.status === 200) {
            const payload = {
                token: response.token,
                expiresAt: response.expiresAt,
            }
            dispatch(authenticated(payload));
        }
        else {
            dispatch(setError(response.message));
        }
    }
    catch (error) {
        dispatch(setError(error));
    }
}

export const forgotPasswordAction = async (dispatch, email) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    const body = {
        "email": email.trim(),
    };

    dispatch(sendingEmail());

    try {
        const response = await apiClient.post(ApiUrls.forgotPasswordEndpoint, body);
        if (response.status === 200) {
            dispatch(emailSent());
        }
        else {
            dispatch(setError(response.message));
        }
    }
    catch (error) {
        dispatch(setError(error));
    }
}

export const resetPasswordAction = async (dispatch, otp, password, confirmPassword) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    const body = {
        "otp": otp.trim(),
        "newPassword": password.trim(),
        "confirmPassword": confirmPassword.trim(),
    };

    dispatch(resetPassword());

    try {
        const response = await apiClient.post(ApiUrls.resetPasswordEndpoint, body);
        if (response.status === 200) {
            dispatch(passwordReset());
        }
        else {
            dispatch(setError(response.message));
        }
    }
    catch (error) {
        dispatch(setError(error));
    }
}

export const loadAuthDetailsAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(authenticating());
    const data = storage.get('auth');
    if (!data || !data.token) {
        dispatch(unauthenticated());
    }
    else {
        dispatch(authenticated(data));
    }
}

export const logoutAction = async (dispatch) => {
    if (!dispatch) {
        console.log("dispatch is null");
        return;
    }

    dispatch(clearProfileDetails());
    dispatch(unauthenticated());
}