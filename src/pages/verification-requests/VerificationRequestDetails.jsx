import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useSnackbar } from 'notistack';
import {
    getVerificationRequestDetailsAction,
    approveVerificationRequestAction,
    rejectVerificationRequestAction,
    clearVerificationRequestDetailsErrorAction
} from '../../redux/actions/verificationRequestsAction';
import PageHOC from "../../helpers/PageHOC";
import { toDateTimeString } from '../../utils/dateUtils';
import CircleAvatar from "../../components/CircleAvatar";
import ListTile from "../../components/ListTile";

const VerificationRequestDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams();

    const auth = useSelector((state) => state.auth);
    const verificationRequestDetails = useSelector((state) => state.verificationRequestDetails);
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);

    const closeBackdrop = () => {
        setOpen(false);
    };

    const openBackdrop = () => {
        setOpen(true);
    };

    const approveRequest = async () => {
        const approveVerificationRequestPromise = approveVerificationRequestAction(dispatch, auth.token, id);
        openBackdrop();
        await approveVerificationRequestPromise;
        closeBackdrop();
    }

    const rejectRequest = async () => {
        const rejectVerificationRequestPromise = rejectVerificationRequestAction(dispatch, auth.token, id, '');
        openBackdrop();
        await rejectVerificationRequestPromise;
        closeBackdrop();
    }

    useEffect(() => {
        document.title = "Verification Request Details | Dashboard";

        const getData = async () => {
            const verificationRequestDetailsPromise = getVerificationRequestDetailsAction(dispatch, auth.token, id);
            openBackdrop();
            await verificationRequestDetailsPromise;
            closeBackdrop();
        }

        if (verificationRequestDetails.status === 'loading') {
            openBackdrop();
        }
        else {
            closeBackdrop();
        }

        if (verificationRequestDetails.status === 'idle' ||
            (id && id !== verificationRequestDetails.data?._id)) {
            getData();
        }

        return () => { }

    }, [
        auth.token, verificationRequestDetails.status,
        verificationRequestDetails.data?._id, id, dispatch
    ]);

    useEffect(() => {
        if (verificationRequestDetails.error !== null) {
            enqueueSnackbar(verificationRequestDetails.error, { variant: 'error' });
            clearVerificationRequestDetailsErrorAction(dispatch);
        }

        return () => { }

    }, [
        verificationRequestDetails.error, enqueueSnackbar, dispatch
    ]);

    return (
        <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
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
                title="Verification Request Details"
            />

            {
                verificationRequestDetails.data !== null ?
                    <Box
                        position="relative"
                        width="100%"
                        mt="1.5rem"
                        bgcolor={colors.dialog}
                        p="1rem"
                        overflow="hidden"
                    >
                        {/* Avatar  */}

                        <CircleAvatar
                            avatar={verificationRequestDetails.data.user?.avatar}
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

                        {/* First Name  */}

                        <ListTile
                            title="First Name"
                            value={verificationRequestDetails.data.user?.fname}
                            mt="1.5rem"
                        />

                        {/* Last Name  */}

                        <ListTile
                            title="Last Name"
                            value={verificationRequestDetails.data.user?.lname}
                            mt="1rem"
                        />

                        {/* Username */}

                        <ListTile
                            title="Username"
                            value={verificationRequestDetails.data.user?.uname}
                            mt="1rem"
                        />

                        {/* Email */}

                        <ListTile
                            title="Email"
                            value={verificationRequestDetails.data.user?.email}
                            mt="1rem"
                        />

                        {/* Legal Name */}

                        <ListTile
                            title="Legal Name"
                            value={verificationRequestDetails.data.legalName}
                            mt="1rem"
                        />

                        {/* Valid Email */}

                        <ListTile
                            title="Valid Email"
                            value={verificationRequestDetails.data.email}
                            mt="1rem"
                        />

                        {/* Valid Phone */}

                        <ListTile
                            title="Following"
                            value={verificationRequestDetails.data.phone}
                            mt="1rem"
                        />

                        {/* Category */}

                        <ListTile
                            title="Category"
                            value={verificationRequestDetails.data.category}
                            mt="1rem"
                        />

                        {/*  Document */}

                        <Box
                            position="relative"
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            justifyContent="flex-start"
                            mt="1rem"
                        >
                            <p
                                style={{
                                    color: colors.primary[300],
                                }}
                            >
                                Valid ID
                            </p>

                            <h5
                                style={{
                                    color: 'var(--linkColor)',
                                    textOverflow: 'ellipsis',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    window.open(verificationRequestDetails.data.document?.url, '_blank')
                                }}
                            >
                                View
                            </h5>
                        </Box>

                        {/* Status */}

                        <Box
                            position="relative"
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            justifyContent="flex-start"
                            mt="1rem"
                        >
                            <Box
                                position="relative"
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="flex-start"
                            >
                                <p
                                    style={{
                                        color: colors.primary[300],
                                    }}
                                >
                                    Status
                                </p>

                                <h5
                                    style={{
                                        color: verificationRequestDetails.data.status === 'rejected' ?
                                            colors.error :
                                            verificationRequestDetails.data.status === 'pending' ?
                                                colors.warning :
                                                colors.success,
                                    }}
                                >
                                    {verificationRequestDetails.data.status}
                                </h5>
                            </Box>

                            {
                                verificationRequestDetails.data.status === 'pending' ?
                                    <Box
                                        position="relative"
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="flex-start"
                                        mt="1rem"
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: colors.success,
                                                color: colors.primary[100],
                                            }}
                                            onClick={() => approveRequest()}
                                        >
                                            Approve
                                        </Button>

                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: colors.error,
                                                color: colors.primary[100],
                                                marginLeft: '1rem'
                                            }}
                                            onClick={() => rejectRequest()}
                                        >
                                            Reject
                                        </Button>

                                    </Box>
                                    :
                                    null

                            }

                        </Box>

                        {/* Is Verified On Other Platform */}

                        <ListTile
                            title="Is Verified On Other Platform"
                            value={verificationRequestDetails.data.isVerifiedOnOtherPlatform === "yes" ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Other Platform Links */}

                        {
                            verificationRequestDetails.data.isVerifiedOnOtherPlatform === "yes" ?
                                <ListTile
                                    title="Other Platform Links"
                                    value={verificationRequestDetails.data.otherPlatformLinks}
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* Has Wikipedia Page */}

                        <ListTile
                            title="Has Wikipedia Page"
                            value={verificationRequestDetails.data?.hasWikipediaPage === "yes" ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Wikipedia Link */}

                        {
                            verificationRequestDetails.data.hasWikipediaPage === "yes" ?
                                <ListTile
                                    title="Wikipedia Link"
                                    value={verificationRequestDetails.data.wikipediaPageLink}
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* Has Featured In Articles */}

                        <ListTile
                            title="Has Featured In Articles"
                            value={verificationRequestDetails.data.featuredInArticles === "yes" ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Article Links */}

                        {
                            verificationRequestDetails.data.featuredInArticles === "yes" ?
                                <ListTile
                                    title="Article Links"
                                    value={verificationRequestDetails.data.articleLinks}
                                    mt="1rem"
                                />
                                :
                                null
                        }

                        {/* If Approved */}

                        {
                            verificationRequestDetails.data.status === "approved" ?
                                <Box>
                                    {/* Approved At */}

                                    {
                                        verificationRequestDetails.data?.approvedAt ?
                                            <ListTile
                                                title="Approved At"
                                                value={
                                                    verificationRequestDetails.data?.approvedAt ?
                                                        toDateTimeString(verificationRequestDetails.data?.approvedAt, { showSeconds: true })
                                                        : null
                                                }
                                                mt="1rem"
                                            />
                                            :
                                            null
                                    }

                                    {/* Approved By */}

                                    {
                                        verificationRequestDetails.data?.approvedBy ?
                                            <ListTile
                                                title="Approved By"
                                                value={verificationRequestDetails.data.approvedBy.uname}
                                                mt="1rem"
                                            />
                                            :
                                            null
                                    }
                                </Box>
                                :
                                null
                        }

                        {/* If Rejected */}

                        {
                            verificationRequestDetails.data.status === "rejected" ?
                                <Box>
                                    {/* Rejected At */}

                                    {
                                        verificationRequestDetails.data?.rejectedAt ?
                                            <ListTile
                                                title="Rejected At"
                                                value={
                                                    verificationRequestDetails.data?.rejectedAt ?
                                                        toDateTimeString(verificationRequestDetails.data?.rejectedAt, { showSeconds: true })
                                                        : null
                                                }
                                                mt="1rem"
                                            />
                                            :
                                            null
                                    }

                                    {/* Rejected By */}

                                    {
                                        verificationRequestDetails.data?.rejectedBy ?
                                            <ListTile
                                                title="Rejected By"
                                                value={verificationRequestDetails.data.rejectedBy.uname}
                                                mt="1rem"
                                            />
                                            :
                                            null
                                    }

                                    {/* Rejection Reason */}

                                    {
                                        verificationRequestDetails.data?.reason ?
                                            <ListTile
                                                title="Rejected By"
                                                value={verificationRequestDetails.data.reason}
                                                mt="1rem"
                                            />
                                            :
                                            null
                                    }
                                </Box>
                                :
                                null
                        }

                        {/* Created At */}

                        <ListTile
                            title="Created At"
                            value={
                                verificationRequestDetails.data.user?.createdAt ?
                                    toDateTimeString(verificationRequestDetails.data.user.createdAt, { showSeconds: true })
                                    : null
                            }
                            mt="1rem"
                        />

                        {/* Updated At */}

                        <ListTile
                            title="Updated At"
                            value={
                                verificationRequestDetails.data.user?.updatedAt ?
                                    toDateTimeString(verificationRequestDetails.data.user.updatedAt, { showSeconds: true })
                                    : null
                            }
                            mt="1rem"
                        />
                    </Box>
                    : null
            }

        </Box >
    )
}

export default PageHOC(VerificationRequestDetails);