import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    resetPasswordAction, clearAuthErrorAction
} from '../../../redux/actions';
import Topbar from "../../../components/global/Topbar";

const ResetPasswordPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
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

        const resetPasswordPromise = resetPasswordAction(dispatch, otp.trim(), password.trim(), confirmPassword.trim());
        await resetPasswordPromise;
    }

    useEffect(() => {
        document.title = "Reset Password | Dashboard";

        if (auth.status === 'passwordReset') {
            enqueueSnackbar('Password reset successfully', { variant: 'success' });
            navigate('/auth/login', { replace: true });
        }

        if (auth.status === 'authenticated' && auth.token) {
            const returnUrl = location.state?.from?.pathname || '/';
            navigate(returnUrl, { replace: true });
        }

        if (auth.status === 'authenticating' || auth.status === 'resetPassword') {
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
                <form onSubmit={(e) => dispatch(onClickBtnEvent(e))}
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
                        Reset your password
                    </p>

                    <p style={{
                        marginBottom: "0.5rem",
                        fontSize: "0.95rem",
                    }}>
                        Enter the OTP sent to your email address and a new password.
                    </p>

                    <div className="app__form_control">
                        <input
                            type="tel"
                            pattern="[0-9]*"
                            placeholder="OTP"
                            name="otp"
                            required
                            disabled={auth.status === 'resetPassword'}
                            value={otp}
                            maxLength={6}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (
                                    e.target.value.length <= 6 &&
                                    (e.target.value === '' || re.test(e.target.value))
                                ) {
                                    setOtp(e.target.value);
                                }
                            }}
                        />
                    </div>

                    <div className="app__form_control">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            name="newPassword"
                            required
                            disabled={auth.status === 'resetPassword'}
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

                    <div className="app__form_control">
                        <input
                            type={showConfPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            required
                            disabled={auth.status === 'resetPassword'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="password_toggle_btn">
                            {
                                showConfPassword ?
                                    <VisibilityIcon
                                        onClick={() => setShowConfPassword(false)}
                                    />
                                    :
                                    <VisibilityOffIcon
                                        onClick={() => setShowConfPassword(true)}
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
                            disabled={auth.status === 'resetPassword'}
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
            </Box>
        </Box>
    )
}

export default ResetPasswordPage;