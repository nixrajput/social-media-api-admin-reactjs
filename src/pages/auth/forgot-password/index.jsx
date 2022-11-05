import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import {
    sendingEmail, success, setError
} from '../../../redux/slices/authSlice';

const ForgotPassword = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");

    const onClickBtnEvent = (e) => async (dispatch) => {
        e.preventDefault();
        const body = {
            "email": email.trim(),
        };

        dispatch(sendingEmail());
        try {
            const response = await apiClient.post('/forgot-password', body);
            if (response.status === 200) {
                dispatch(success());
                navigate('/auth/reset-password');
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
                auth.status === "sending" ?
                    <div className="app__box__form_container">
                        <div className="app__loading_text">
                            Please wait...
                        </div>
                    </div>
                    :
                    <form className="app__box__form_container"
                        onSubmit={(e) => dispatch(onClickBtnEvent(e))}>

                        <p className="title">Forgot your password?</p>

                        <p style={{
                            marginBottom: "0.5rem",
                            fontSize: "0.95rem",
                        }}>
                            Enter your email address and an OTP will be sent to your
                            email address if account exists
                        </p>

                        <div className="app__form_control">
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                required
                                disabled={auth.status === 'sending'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value="send otp"
                                disabled={auth.status === 'sending'}
                                className="app__filled_btn app__form_control"
                            />
                        </div>

                        <div className="app__form_control">
                            <span>
                                Already have an OTP?
                            </span>
                            <NavLink to="/auth/reset-password">
                                <div className="app__text_btn">Reset Password</div>
                            </NavLink>
                        </div>
                    </form>
            }

        </div>
    )
}

export default ForgotPassword;