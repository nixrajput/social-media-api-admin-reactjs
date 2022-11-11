import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { forgotPasswordAction } from '../../../redux/actions';

const ForgotPassword = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
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

        await forgotPasswordAction(dispatch, email);

        closeBackdrop();

        if (auth.status === 'emailSent') {
            navigate('/auth/reset-password', { replace: true });
        }
    }

    useEffect(() => {
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
                    onClick={closeBackdrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <p className="title">Forgot your password?</p>

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

        </div>
    )
}

export default ForgotPassword;