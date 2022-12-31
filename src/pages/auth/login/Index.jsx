import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';
import {
    loginAction, getProfileDetailsAction,
    clearAuthErrorAction, clearProfileErrorAction,
} from '../../../redux/actions';
import Topbar from "../../../components/global/Topbar";

const LoginPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const auth = useSelector((state) => state.auth);
    const profileDetails = useSelector((state) => state.profileDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [emailUsername, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const closeBackdrop = () => {
        setOpen(false);
    };

    const openBackdrop = () => {
        setOpen(true);
    };

    const onClickLoginEvent = async (e) => {
        e.preventDefault();

        const loginPromise = loginAction(dispatch, emailUsername.trim(), password.trim());
        await loginPromise;

        if (auth.status === 'authenticated' && auth.token) {
            const getProfileDetailsPromise = getProfileDetailsAction(dispatch, auth.token);
            await getProfileDetailsPromise;
            if (profileDetails.status === 'success' && profileDetails.user) {
                const returnUrl = location.state?.from?.pathname || '/';
                navigate(returnUrl, { replace: true });
            }
        }
    }

    useEffect(() => {
        document.title = "Login | Dashboard";

        const returnUrl = location.state?.from?.pathname || '/';

        if (auth.status === 'authenticated' && auth.token &&
            profileDetails.status === 'success' && profileDetails.user) {
            enqueueSnackbar('Login successful', { variant: 'success' });
            navigate(returnUrl, { replace: true });
        }

        if (auth.status === 'authenticating' || profileDetails.status === 'loading') {
            openBackdrop();
        }
        else {
            closeBackdrop();
        }

        if (auth.status === 'error') {
            enqueueSnackbar(auth.error, { variant: 'error' });
            clearAuthErrorAction(dispatch);
        }

        if (profileDetails.status === 'error') {
            enqueueSnackbar(profileDetails.error, { variant: 'error' });
            clearProfileErrorAction(dispatch);
        }

        return () => { }

    }, [
        auth.token, navigate, auth.status, profileDetails.status,
        profileDetails.user, location.state?.from?.pathname,
        enqueueSnackbar, auth.error, profileDetails.error,
        dispatch
    ]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100vh"
            position="relative"
            bgcolor={colors.background}
        >
            <Topbar />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
                maxWidth={{
                    xs: "100%",
                    sm: "600px",
                    md: "600px",
                    lg: "600px",
                    xl: "600px",
                }}
                bgcolor={{
                    xs: 'transparent',
                    sm: colors.primary[400],
                    md: colors.primary[400],
                    lg: colors.primary[400]
                }}
                padding={{
                    xs: '16px',
                    sm: '16px 24px',
                    md: '16px 24px',
                    lg: "16px 24px",
                }}
                overflow="hidden"
                transition="all 0.3s ease"
            >
                <form onSubmit={(e) => onClickLoginEvent(e)}
                    style={{
                        width: '100%',
                        maxWidth: '600px'
                    }}
                >

                    <p style={{
                        fontSize: "2rem",
                        fontWeight: 700,
                        textTransform: "capitalize",
                        marginBottom: "2rem",
                    }}
                    >
                        Welcome, Login to continue
                    </p>

                    <div className="app__form_control">
                        <input
                            type="text"
                            placeholder="Email or Username"
                            name="emailUsername"
                            required
                            disabled={
                                auth.status === 'authenticating'
                                ||
                                profileDetails.status === 'loading'
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
                                auth.status === 'authenticating'
                                ||
                                profileDetails.status === 'loading'
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
                                auth.status === 'authenticating'
                                ||
                                profileDetails.status === 'loading'
                            }
                            className="app__filled_btn app__form_control"
                        />
                    </div>
                </form>
            </Box>

        </Box>
    )
}

export default LoginPage;