import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    loginAction, getProfileAction
} from '../../../redux/actions';

const Login = () => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [emailUsername, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);

    const closeBackdrop = () => {
        setOpen(false);
    };

    const openBackdrop = () => {
        setOpen(true);
    };

    const onClickLoginEvent = (e) => async (dispatch) => {
        e.preventDefault();

        openBackdrop();

        await loginAction(dispatch, emailUsername, password);

        if (auth.token && auth.status === 'authenticated') {
            await getProfileAction(dispatch, auth.token);
            if (auth.user && auth.status === 'userLoaded') {
                const returnUrl = location.state?.from?.pathname || '/';
                navigate(returnUrl, { replace: true });
            }
        }
        closeBackdrop();
    }

    useEffect(() => {
        document.title = "Dashboard - Login";

        const returnUrl = location.state?.from?.pathname || '/';

        if (auth.token && auth.user && auth.status === 'userLoaded') {
            navigate(returnUrl, { replace: true });
        }

        if (auth.status === 'authenticating' || auth.status === 'loadingUser') {
            openBackdrop();
        }
        else {
            closeBackdrop();
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

            <form className="app__box__form_container"
                onSubmit={(e) => dispatch(onClickLoginEvent(e))}>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <p className="title">Welcome, Login to continue</p>

                <div className="app__form_control">
                    <input
                        type="text"
                        placeholder="Email or Username"
                        name="emailUsername"
                        required
                        disabled={
                            auth.status === "authenticating"
                            ||
                            auth.status === "loadingUser"
                        }
                        value={emailUsername}
                        onChange={(e) => setEmailUsername(e.target.value)}
                    />
                </div>

                <div className="app__form_control">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        required
                        disabled={
                            auth.status === "authenticating"
                            ||
                            auth.status === "loadingUser"
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password_toggle_btn">
                        {
                            showPassword ?
                                <VisibilityIcon
                                    onClick={() => setShowPassword(false)}
                                />
                                :
                                <VisibilityOffIcon
                                    onClick={() => setShowPassword(true)}
                                />
                        }
                    </div>
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
                        disabled={
                            auth.status === "authenticating"
                            ||
                            auth.status === "loadingUser"
                        }
                        className="app__filled_btn app__form_control"
                    />
                </div>
            </form>
        </div>
    )
}

export default Login;