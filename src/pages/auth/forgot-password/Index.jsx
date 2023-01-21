import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
    forgotPasswordAction, clearAuthErrorAction
} from '../../../redux/actions';
import Topbar from "../../../components/Topbar";

const ForgotPasswordPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const closeBackdrop = () => {
        setOpen(false);
    };

    const openBackdrop = () => {
        setOpen(true);
    };

    const onClickBtnEvent = async (e) => {
        e.preventDefault();

        const forgotPasswordPromise = forgotPasswordAction(dispatch, email.trim());
        await forgotPasswordPromise;
    }

    useEffect(() => {
        document.title = "Forgot Password | Dashboard";

        if (auth.status === 'emailSent') {
            enqueueSnackbar('OTP sent successfully', { variant: 'success' });
            navigate('/auth/reset-password', { replace: true });
        }

        if (auth.status === 'authenticated' && auth.token) {
            const returnUrl = location.state?.from?.pathname || '/';
            navigate(returnUrl, { replace: true });
        }

        if (auth.status === 'authenticating' || auth.status === 'sendingEmail') {
            openBackdrop();
        }
        else {
            closeBackdrop();
        }

        if (auth.status === 'error') {
            enqueueSnackbar(auth.error, { variant: 'error' });
            clearAuthErrorAction(dispatch);
        }

        return () => { }

    }, [
        auth.token, navigate, auth.status,
        location.state?.from?.pathname,
        enqueueSnackbar, auth.error, dispatch
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
                    sm: colors.dialog,
                    md: colors.dialog,
                    lg: colors.dialog,
                    xl: colors.dialog,
                }}
                padding={{
                    xs: '16px',
                    sm: '16px 24px',
                    md: '16px 24px',
                    lg: "16px 24px",
                    xl: "16px 24px",
                }}
                overflow="hidden"
                transition="all 0.3s ease"
            >

                <form onSubmit={(e) => dispatch(onClickBtnEvent(e))}
                    style={{
                        width: '100%',
                        maxWidth: '600px'
                    }}
                >

                    <p
                        style={{
                            fontSize: "2rem",
                            fontWeight: 700,
                            textTransform: "capitalize",
                            marginBottom: "2rem",
                        }}
                    >
                        Forgot your password?
                    </p>

                    <p style={{
                        marginBottom: "0.5rem",
                        fontSize: "0.95rem",
                    }}>
                        Enter your email address and we'll send you an OTP
                        to reset your password.
                    </p>

                    <div className="app__form_control">
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            required
                            disabled={auth.status === 'sendingEmail'}
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
                            disabled={auth.status === 'sendingEmail'}
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

            </Box>
        </Box>
    )
}

export default ForgotPasswordPage;