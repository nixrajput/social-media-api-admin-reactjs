import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import { useSnackbar } from "notistack";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import CircleAvatar from '../../components/global/CircleAvatar';
import {
    logoutAction, clearProfileErrorAction
} from '../../redux/actions';
import PageHOC from "../../helpers/PageHOC";
import { toDateTimeString } from "../../utils/dateUtils";

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const auth = useSelector((state) => state.auth);
    const profileDetails = useSelector((state) => state.profileDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);

    const closeBackdrop = () => {
        setOpen(false);
    };

    const openBackdrop = () => {
        setOpen(true);
    };

    const logoutUser = async () => {
        const logoutPromise = logoutAction(dispatch);
        await logoutPromise;
    }

    useEffect(() => {
        document.title = "Profile - Dashboard";

        if (
            (auth.status === 'authenticated' && !auth.token)
            || auth.status === 'unauthenticated'
        ) {
            navigate('/auth/login');
        }

        if (profileDetails.status === 'loading') {
            openBackdrop();
        }
        else {
            closeBackdrop();
        }

        if (profileDetails.status === 'error') {
            enqueueSnackbar(profileDetails.error, { variant: 'error' });
            clearProfileErrorAction(dispatch);
        }

        return () => { }

    }, [
        profileDetails.status, auth.status,
        enqueueSnackbar, dispatch, auth.token,
        profileDetails.error, navigate
    ]);

    return (
        <Box m="20px" mt="0" width="100%">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Header title="PROFILE DETAILS" subtitle="Managing the Profile Details" />

            {
                profileDetails.status === 'success' ?
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gridAutoRows="140px"
                        gap="20px"
                        pb="20px"
                    >

                        {/* User Avatar Start */}

                        <Box
                            width="100%"
                            gridColumn={{ xs: "span 12", lg: "span 4" }}
                            gridRow="span 3"
                            backgroundColor={colors.primary[400]}
                            overflow="hidden"
                        >
                            <Box
                                width="100%"
                                height="100%"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <CircleAvatar
                                    avatar={profileDetails.user?.avatar}
                                    size="320px"
                                />
                            </Box>
                        </Box>

                        {/* User Avatar End */}

                        {/* User Details Start */}

                        <Box
                            gridColumn={{ xs: "span 12", lg: "span 8" }}
                            gridRow="span 6"
                            backgroundColor={colors.primary[400]}
                            overflow="auto"
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.background}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h3"
                                    fontWeight="600"
                                >
                                    Details
                                </Typography>
                            </Box>

                            {/* First Name Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.background}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    First Name
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {profileDetails.user?.fname}
                                </Typography>
                            </Box>

                            {/* First Name End */}

                            {/* Last Name Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.background}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Last Name
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {profileDetails.user?.lname}
                                </Typography>
                            </Box>

                            {/* Last Name End */}

                            {/* Username Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.background}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Username
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {profileDetails.user?.uname}
                                </Typography>
                            </Box>

                            {/* Username End */}

                            {/* Email Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.background}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Email
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {profileDetails.user?.email}
                                </Typography>
                            </Box>

                            {/* Email End */}

                            {/* Phone Start */}

                            {
                                profileDetails.user?.phone ?
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        justifyContent="stretch"
                                        borderBottom={`2px solid ${colors.background}`}
                                        colors={colors.grey[100]}
                                        p="15px"
                                    >
                                        <Typography
                                            color={colors.grey[100]}
                                            variant="h5"
                                            fontWeight="600"
                                        >
                                            Phone
                                        </Typography>

                                        <Typography color={colors.grey[200]}
                                            variant="subtitle1"
                                        >
                                            {profileDetails.user?.countryCode} {profileDetails.user?.phone}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* Phone End */}

                            {/* Gender Start */}

                            {
                                profileDetails.user?.gender ?
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        justifyContent="stretch"
                                        borderBottom={`2px solid ${colors.background}`}
                                        colors={colors.grey[100]}
                                        p="15px"
                                    >
                                        <Typography
                                            color={colors.grey[100]}
                                            variant="h5"
                                            fontWeight="600"
                                        >
                                            Gender
                                        </Typography>

                                        <Typography color={colors.grey[200]}
                                            variant="subtitle1"
                                        >
                                            {profileDetails.user?.gender}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* Gender End */}

                            {/* About Start */}

                            {
                                profileDetails.user?.about ?
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        justifyContent="stretch"
                                        borderBottom={`2px solid ${colors.background}`}
                                        colors={colors.grey[100]}
                                        p="15px"
                                    >
                                        <Typography
                                            color={colors.grey[100]}
                                            variant="h5"
                                            fontWeight="600"
                                        >
                                            About
                                        </Typography>

                                        <Typography color={colors.grey[200]}
                                            variant="subtitle1"
                                        >
                                            {profileDetails.user?.about}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* About End */}

                            {/* DOB Start */}

                            {
                                profileDetails.user?.dob ?
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        justifyContent="stretch"
                                        borderBottom={`2px solid ${colors.background}`}
                                        colors={colors.grey[100]}
                                        p="15px"
                                    >
                                        <Typography
                                            color={colors.grey[100]}
                                            variant="h5"
                                            fontWeight="600"
                                        >
                                            Date of Birth
                                        </Typography>

                                        <Typography color={colors.grey[200]}
                                            variant="subtitle1"
                                        >
                                            {profileDetails.user?.dob}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* DOB End */}

                            {/* Profession Start */}

                            {
                                profileDetails.user?.profession ?
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        justifyContent="stretch"
                                        borderBottom={`2px solid ${colors.background}`}
                                        colors={colors.grey[100]}
                                        p="15px"
                                    >
                                        <Typography
                                            color={colors.grey[100]}
                                            variant="h5"
                                            fontWeight="600"
                                        >
                                            Profession
                                        </Typography>

                                        <Typography color={colors.grey[200]}
                                            variant="subtitle1"
                                        >
                                            {profileDetails.user?.profession}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* Profession End */}

                            {/* Website Start */}

                            {
                                profileDetails.user?.website ?
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        justifyContent="stretch"
                                        borderBottom={`2px solid ${colors.background}`}
                                        colors={colors.grey[100]}
                                        p="15px"
                                    >
                                        <Typography
                                            color={colors.grey[100]}
                                            variant="h5"
                                            fontWeight="600"
                                        >
                                            Website
                                        </Typography>

                                        <Typography color={colors.grey[200]}
                                            variant="subtitle1"
                                        >
                                            {profileDetails.user?.website}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* Website End */}

                            {/* User Created At Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.background}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Created At
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {
                                        profileDetails.user?.createdAt ?
                                            toDateTimeString(profileDetails.user.createdAt, { showSeconds: true })
                                            : null
                                    }
                                </Typography>
                            </Box>

                            {/* User Created At End */}

                            {/* User Updated At Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.background}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Created At
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {
                                        profileDetails.user?.updatedAt ?
                                            toDateTimeString(profileDetails.user.updatedAt, { showSeconds: true })
                                            : null
                                    }
                                </Typography>
                            </Box>

                            {/* User Updated At End */}

                            {/* User Actions Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    width="100%"
                                >
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                    >
                                        {/* <Button
                                            variant="contained"
                                            onClick={() => {
                                                navigate(`/posts/${profileDetails.user?._id}/edit`)
                                            }}
                                        >
                                            Edit
                                        </Button> */}

                                        <Button
                                            variant="contained"
                                            sx={{ marginLeft: "10px" }}
                                            onClick={logoutUser}
                                        >
                                            Logout
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>

                            {/* User Actions End */}

                        </Box>
                    </Box>
                    :
                    null
            }

        </Box>
    )
}

export default PageHOC(Profile);