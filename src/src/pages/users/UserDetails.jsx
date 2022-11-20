import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Backdrop from '@mui/material/Backdrop';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import {
    getUserDetailsAction,
} from '../../redux/actions';
import PageHOC from "../../helpers/PageHOC";
import { toDateTimeString } from '../../utils/dateUtils';
import Avatar from "../../components/global/Avatar";
import CircleAvatar from "../../components/global/CircleAvatar";

const UserDetailsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams();

    const auth = useSelector((state) => state.auth);
    const userDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const closeBackdrop = () => {
        setOpen(false);
    };

    const openBackdrop = () => {
        setOpen(true);
    };

    const getData = async () => {
        const userDetailsPromise = getUserDetailsAction(dispatch, auth.token, id);
        openBackdrop();
        await userDetailsPromise;
        closeBackdrop();
    }

    useEffect(() => {
        document.title = "User Details | Dashboard";

        if (
            auth.status === 'authenticating' || auth.status === 'loadingUser' ||
            userDetails.status === 'loading'
        ) {
            openBackdrop();
        }
        else {
            closeBackdrop();
        }

        return () => { }

    }, [
        auth.token, auth.user, auth.status, userDetails.status
    ]);

    useEffect(() => {
        if (userDetails.status === 'idle' || (id && id !== userDetails.user?._id)) {
            getData();
        }

        return () => { }

    }, [auth.token, userDetails.status, userDetails.user?._id, id]);

    return (
        <Box m="20px" mt="0" width="100%">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Header title="USER DETAILS" subtitle="Managing the User Details" />

            {
                userDetails.status === 'success' ?
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
                                    avatar={userDetails.user?.avatar}
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
                                    {userDetails.user?.fname}
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
                                    {userDetails.user?.lname}
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
                                    Last Name
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {userDetails.user?.uname}
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
                                    Last Name
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {userDetails.user?.email}
                                </Typography>
                            </Box>

                            {/* Email End */}

                            {/* Posts Count Start */}

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
                                    Posts
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {userDetails.user?.postsCount}
                                </Typography>
                            </Box>

                            {/* Posts Count End */}

                            {/* User Status Start */}

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
                                    Account Status
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {userDetails.user?.accountStatus}
                                </Typography>
                            </Box>

                            {/* User Status End */}

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
                                        userDetails.user?.createdAt ?
                                            toDateTimeString(userDetails.user.createdAt, { showSeconds: true })
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
                                        userDetails.user?.updatedAt ?
                                            toDateTimeString(userDetails.user.updatedAt, { showSeconds: true })
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
                                borderBottom={`2px solid ${colors.background}`}
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
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                navigate(`/posts/${userDetails.user?._id}/edit`)
                                            }}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="contained"
                                            sx={{ marginLeft: "10px" }}
                                            onClick={() => {
                                                navigate(`/posts/${userDetails.user?._id}/delete`)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>

                            {/* User Actions End */}

                        </Box>

                        {/* User Details End */}

                    </Box>
                    : null
            }

        </Box>
    )
}

export default PageHOC(UserDetailsPage);