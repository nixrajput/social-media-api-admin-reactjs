import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { resetPasswordAction } from '../../../redux/actions';

const ResetPasswordPage = () => {
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

    const closeBackdrop = () => {
        setOpen(false);
    };

    const openBackdrop = () => {
        setOpen(true);
    };

    const onClickBtnEvent = (e) => async (dispatch) => {
        e.preventDefault();

        openBackdrop();

        await resetPasswordAction(dispatch, otp, password, confirmPassword);

        closeBackdrop();

        if (auth.status === 'passwordReset') {
            navigate('/auth/login', { replace: true });
        }
    }

    useEffect(() => {
        document.title = "Reset Password | Dashboard";

        const returnUrl = location.state?.from?.pathname || '/';

        if (auth.token && auth.user && auth.status === 'userLoaded') {
            navigate(returnUrl, { replace: true });
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
                onSubmit={(e) => dispatch(onClickBtnEvent(e))}>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <p className="title">Reset your password</p>

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
        </div>
    )
}

export default ResetPasswordPage;