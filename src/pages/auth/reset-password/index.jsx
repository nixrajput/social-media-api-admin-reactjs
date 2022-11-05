import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import {
    pending, success, setError
} from '../../../redux/slices/authSlice';

const ResetPassword = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onClickBtnEvent = (e) => async (dispatch) => {
        e.preventDefault();
        const body = {
            "otp": otp.trim(),
            "newPassword": password.trim(),
            "confirmPassword": confirmPassword.trim(),
        };

        dispatch(pending());
        try {
            const response = await apiClient.post('/reset-password', body);
            if (response.status === 200) {
                dispatch(success());
                navigate('/auth/login');
            }
            else {
                dispatch(setError(response.message));
            }
        }
        catch (error) {
            dispatch(setError(error));
        }
    }

    useEffect(() => {
        const returnUrl = location.state?.from?.pathname || '/';

        if (auth.status === 'userLoaded' && auth.token && auth.user) {
            navigate(returnUrl);
        }

        return () => { }

    }, [
        auth.token, auth.user, navigate, auth.status,
        location.state?.from?.pathname
    ]);

    return (
        <div className="app__flex" style={{
            width: "100%",
            height: "100vh",
        }}>
            {
                auth.status === 'error' &&
                <div className="app__error_box">
                    <p>{auth.error}</p>
                </div>
            }

            {
                auth.status === "pending" ?
                    <div className="app__box__form_container">
                        <div className="app__loading_text">
                            Please wait...
                        </div>
                    </div>
                    :
                    <form className="app__box__form_container"
                        onSubmit={(e) => dispatch(onClickBtnEvent(e))}>

                        <p className="title">Reset your password</p>

                        <p style={{
                            marginBottom: "0.5rem",
                            fontSize: "0.95rem",
                        }}>
                            An OTP has been sent to your email address,
                            please enter it and reset your password
                        </p>

                        <div className="app__form_control">
                            <input
                                type="text"
                                placeholder="OTP"
                                name="email"
                                required
                                disabled={auth.status === 'pending'}
                                value={otp}
                                maxLength={6}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <div className="app__form_control">
                            <input
                                type="password"
                                placeholder="New Password"
                                name="newPassword"
                                required
                                disabled={auth.status === 'pending'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="app__form_control">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                required
                                disabled={auth.status === 'pending'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div style={{
                            width: '100%',
                            marginTop: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <NavLink to="/auth/login">
                                <div className="app__text_btn">Login to account</div>
                            </NavLink>
                        </div>

                        <div style={{
                            width: '100%',
                            marginTop: '2rem',
                        }}>
                            <input
                                type="submit"
                                value="reset password"
                                disabled={auth.status === 'pending'}
                                className="app__filled_btn app__form_control"
                            />
                        </div>

                        <div className="app__form_control">
                            <span>
                                Don&apos;t have an OTP?
                            </span>
                            <NavLink to="/auth/forgot-password">
                                <div className="app__text_btn">Get OTP</div>
                            </NavLink>
                        </div>
                    </form>
            }
        </div>
    )
}

export default ResetPassword;