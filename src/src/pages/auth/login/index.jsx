import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import {
    authenticating, authenticated,
    loadUser, loadingUser,
    setError
} from '../../../redux/slices/authSlice';

const Login = () => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [emailUsername, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");

    const onClickLoginEvent = (e) => async (dispatch) => {
        e.preventDefault();
        const body = {
            "emailUname": emailUsername.trimEnd(),
            "password": password,
        };

        dispatch(authenticating());
        try {
            const response = await apiClient.post('/admin/login', body);
            if (response.status === 200) {
                const payload = {
                    token: response.token,
                    expiresAt: response.expiresAt,
                }
                dispatch(authenticated(payload));
                if (auth.token) {
                    dispatch(loadingUser());
                    const headers = { 'Authorization': `Bearer ${auth.token}` };
                    try {
                        const response = await apiClient.get('/me', { headers });
                        if (response.status === 200) {
                            dispatch(loadUser(response.user));
                            const returnUrl = location.state?.from?.pathname || '/';
                            navigate(returnUrl);
                        }
                        else {
                            console.log(response.message);
                            dispatch(setError(response.message));
                        }
                    } catch (error) {
                        dispatch(setError(error));
                    }
                }
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
                (auth.status === "authenticating" || auth.status === "loadingUser") ?
                    <div className="app__box__form_container">
                        <div className="app__loading_text">
                            Please wait...
                        </div>
                    </div> :
                    <form className="app__box__form_container"
                        onSubmit={(e) => dispatch(onClickLoginEvent(e))}>

                        <p className="title">Welcome, Login to continue</p>

                        <div className="app__form_control">
                            <input
                                type="text"
                                placeholder="Email or Username"
                                name="emailUsername"
                                required
                                disabled={auth.status === 'pending'}
                                value={emailUsername}
                                onChange={(e) => setEmailUsername(e.target.value)}
                            />
                        </div>

                        <div className="app__form_control">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                required
                                disabled={auth.status === 'pending'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div style={{
                            width: '100%',
                            marginTop: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <NavLink to="/auth/forgot-password">
                                <div className="app__text_btn">Forgot Password?</div>
                            </NavLink>
                        </div>

                        <div style={{
                            width: '100%',
                            marginTop: '2rem',
                        }}>
                            <input
                                type="submit"
                                value="Login"
                                disabled={auth.status === 'pending'}
                                className="app__filled_btn app__form_control"
                            />
                        </div>
                    </form>
            }
        </div>
    )
}

export default Login