import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useSnackbar } from 'notistack';
import {
    getUserDetailsAction,
    clearUserDetailsErrorAction
} from '../../redux/actions/usersAction';
import PageHOC from "../../helpers/PageHOC";
import { toDateTimeString } from '../../utils/dateUtils';
import CircleAvatar from "../../components/CircleAvatar";
import ListTile from "../../components/ListTile";

const UserDetailsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams();

    const auth = useSelector((state) => state.auth);
    const userDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);

    const closeBackdrop = () => {
        setOpen(false);
    };

    const openBackdrop = () => {
        setOpen(true);
    };

    useEffect(() => {
        document.title = "User Details | Dashboard";

        const getData = async () => {
            const userDetailsPromise = getUserDetailsAction(dispatch, auth.token, id);
            openBackdrop();
            await userDetailsPromise;
            closeBackdrop();
        }

        if (userDetails.status === 'loading') {
            openBackdrop();
        }
        else {
            closeBackdrop();
        }

        if (userDetails.status === 'idle' ||
            (id && id !== userDetails.user?._id)) {
            getData();
        }

        return () => { }

    }, [
        auth.token, userDetails.status,
        userDetails.user?._id, id, dispatch
    ]);

    useEffect(() => {
        if (userDetails.error !== null) {
            enqueueSnackbar(userDetails.error, { variant: 'error' });
            clearUserDetailsErrorAction(dispatch);
        }

        return () => { }

    }, [
        userDetails.error, enqueueSnackbar, dispatch
    ]);

    return (
        <Box width="100%">
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Header
                title="User Details"
            />

            {
                userDetails.user !== null ?
                    <Box
                        width="100%"
                        mt="1.5rem"
                        bgcolor={colors.dialog}
                        p="1rem"
                    >
                        {/* User Avatar Start */}

                        <CircleAvatar
                            avatar={userDetails.user?.avatar}
                            size="240px"
                        />

                        <h3
                            style={{
                                color: colors.primary[100],
                                marginTop: '1.5rem'
                            }}
                        >
                            Details
                        </h3>

                        {/* ID*/}

                        <ListTile
                            title="ID"
                            value={userDetails.user._id}
                            mt="1.5rem"
                        />

                        {/* First Name */}

                        <ListTile
                            title="First Name"
                            value={userDetails.user?.fname}
                            mt="1.5rem"
                        />

                        {/* Last Name */}

                        <ListTile
                            title="Last Name"
                            value={userDetails.user?.lname}
                            mt="1rem"
                        />

                        {/* Username */}

                        <ListTile
                            title="Username"
                            value={userDetails.user?.uname}
                            mt="1rem"
                        />

                        {/* Email */}

                        <ListTile
                            title="Email"
                            value={userDetails.user?.email}
                            mt="1rem"
                        />

                        {/* Phone */}

                        {
                            userDetails.user?.phone ?
                                <ListTile
                                    title="Phone"
                                    value={userDetails.user?.countryCode + " " + userDetails.user?.phone}
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* Gender */}

                        {
                            userDetails.user?.gender ?
                                <ListTile
                                    title="Gender"
                                    value={userDetails.user?.gender}
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* About */}

                        {
                            userDetails.user?.about ?
                                <ListTile
                                    title="About"
                                    value={userDetails.user?.about}
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* DOB */}

                        {
                            userDetails.user?.dob ?
                                <ListTile
                                    title="Date of Birth"
                                    value={userDetails.user?.dob}
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* Profession */}

                        {
                            userDetails.user?.profession ?
                                <ListTile
                                    title="Profession"
                                    value={userDetails.user?.profession}
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* Locaton */}

                        {
                            userDetails.user?.location ?
                                <ListTile
                                    title="Location"
                                    value={userDetails.user?.location}
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* Website */}

                        {
                            userDetails.user?.website ?
                                <ListTile
                                    title="Website"
                                    value={userDetails.user?.website}
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* Posts Count */}

                        <ListTile
                            title="Posts"
                            value={userDetails.user?.postsCount}
                            mt="1rem"
                        />

                        {/* Followers Count */}

                        <ListTile
                            title="Followers"
                            value={userDetails.user?.followersCount}
                            mt="1rem"
                        />

                        {/* Following Count */}

                        <ListTile
                            title="Following"
                            value={userDetails.user?.followingCount}
                            mt="1rem"
                        />

                        {/* Status */}

                        <ListTile
                            title="Status"
                            value={userDetails.user?.accountStatus}
                            mt="1rem"
                        />

                        {/*  Role */}

                        <ListTile
                            title="Role"
                            value={userDetails.user?.role}
                            mt="1rem"
                        />

                        {/* Private Account */}

                        <ListTile
                            title="Is Private"
                            value={userDetails.user?.isPrivate ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Valid Status */}

                        <ListTile
                            title="Is Valid"
                            value={userDetails.user?.isValid ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Verified Status */}

                        <ListTile
                            title="Is Verified"
                            value={userDetails.user?.isVerified ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* User Verified At */}

                        {
                            userDetails.user?.isVerified ?
                                <ListTile
                                    title="Created At"
                                    value={
                                        userDetails.user?.verifiedAt ?
                                            toDateTimeString(userDetails.user?.verifiedAt, { showSeconds: true })
                                            : null
                                    }
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* verification Requested At */}

                        {
                            userDetails.user?.verificationRequestedAt ?
                                <ListTile
                                    title="Deletion Requested At"
                                    value={
                                        userDetails.user?.verificationRequestedAt ?
                                            toDateTimeString(userDetails.user?.verificationRequestedAt, { showSeconds: true })
                                            : null
                                    }
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* Deletion Request */}

                        <ListTile
                            title="Deletion Request"
                            value={userDetails.user?.deletionRequest ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Deletion Requested At */}

                        {
                            userDetails.user?.deletionRequest ?
                                <ListTile
                                    title="Deletion Requested At"
                                    value={
                                        userDetails.user?.deletionRequestAt ?
                                            toDateTimeString(userDetails.user.deletionRequest, { showSeconds: true })
                                            : null
                                    }
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* User Created At */}

                        <ListTile
                            title="Created At"
                            value={
                                userDetails.user?.createdAt ?
                                    toDateTimeString(userDetails.user.createdAt, { showSeconds: true })
                                    : null
                            }
                            mt="1rem"
                        />

                        {/* User Updated At */}

                        <ListTile
                            title="Updated At"
                            value={
                                userDetails.user?.updatedAt ?
                                    toDateTimeString(userDetails.user.updatedAt, { showSeconds: true })
                                    : null
                            }
                            mt="1rem"
                        />
                    </Box>
                    : null
            }

        </Box>
    )
}

export default PageHOC(UserDetailsPage);