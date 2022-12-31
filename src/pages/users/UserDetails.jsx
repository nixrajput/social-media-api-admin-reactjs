import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Backdrop from '@mui/material/Backdrop';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Switch from "@mui/material/Switch";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
    getUserDetailsAction,
} from '../../redux/actions';
import PageHOC from "../../helpers/PageHOC";
import { toDateTimeString } from '../../utils/dateUtils';
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
                                    Username
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
                                    Email
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {userDetails.user?.email}
                                </Typography>
                            </Box>

                            {/* Email End */}

                            {/* Phone Start */}

                            {
                                userDetails.user?.phone ?
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
                                            {userDetails.user?.countryCode} {userDetails.user?.phone}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* Phone End */}

                            {/* Gender Start */}

                            {
                                userDetails.user?.gender ?
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
                                            {userDetails.user?.gender}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* Gender End */}

                            {/* About Start */}

                            {
                                userDetails.user?.about ?
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
                                            {userDetails.user?.about}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* About End */}

                            {/* DOB Start */}

                            {
                                userDetails.user?.dob ?
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
                                            {userDetails.user?.dob}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* DOB End */}

                            {/* Profession Start */}

                            {
                                userDetails.user?.profession ?
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
                                            {userDetails.user?.profession}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* Profession End */}

                            {/* Website Start */}

                            {
                                userDetails.user?.website ?
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
                                            {userDetails.user?.website}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* Website End */}

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

                            {/* Followers Count Start */}

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
                                    Followers
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {userDetails.user?.followersCount}
                                </Typography>
                            </Box>

                            {/* Followers Count End */}

                            {/* Following Count Start */}

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
                                    Following
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {userDetails.user?.followingCount}
                                </Typography>
                            </Box>

                            {/* Following Count End */}

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

                            {/* User Role Start */}

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
                                    Role
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {userDetails.user?.role}
                                </Typography>
                            </Box>

                            {/* User Role End */}

                            {/* Privacy Status Start */}

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
                                    Private Account
                                </Typography>

                                <Switch
                                    color="secondary"
                                    checked={userDetails.user?.isPrivate}
                                //onChange={handleValidChange}
                                />
                            </Box>

                            {/* Privacy Status End */}

                            {/* Valid Status Start */}

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
                                    Valid
                                </Typography>

                                <Switch
                                    color="secondary"
                                    checked={userDetails.user?.isValid}
                                //onChange={handleValidChange}
                                />
                            </Box>

                            {/* Valid Status End */}

                            {/* Verified Status Start */}

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
                                    Verified
                                </Typography>

                                <Switch
                                    color="secondary"
                                    checked={userDetails.user?.isVerified}
                                //onChange={handleValidChange}
                                />
                            </Box>

                            {/* Verified Status End */}

                            {/* Delete Status Start */}

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
                                    Account Deleted
                                </Typography>

                                <Switch
                                    color="secondary"
                                    checked={userDetails.user?.isDeleted}
                                //onChange={handleValidChange}
                                />
                            </Box>

                            {/* Delete Status End */}

                            {/* Deleted At Start */}

                            {
                                userDetails.user?.isDeleted ? (
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
                                            Deleted At
                                        </Typography>

                                        <Typography color={colors.grey[200]}
                                            variant="subtitle1"
                                        >
                                            {
                                                userDetails.user?.deletedAt ?
                                                    toDateTimeString(userDetails.user.deletedAt, { showSeconds: true })
                                                    : null
                                            }
                                        </Typography>
                                    </Box>
                                )
                                    :
                                    null
                            }

                            {/* Deleted At End */}

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
                                                navigate(`/posts/${userDetails.user?._id}/edit`)
                                            }}
                                        >
                                            Edit
                                        </Button> */}

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