import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Carousel from 'react-material-ui-carousel';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useSnackbar } from 'notistack';
import {
    getProjectDetailsAction,
    clearProjectsDetailsErrorAction,
} from '../../redux/actions/projectAction';
import PageHOC from "../../helpers/PageHOC";
import { toDateTimeString } from '../../utils/dateUtils';
import ListTile from "../../components/ListTile";
import numberUtils from "../../utils/numberUtils";

const ProjectDetailsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams();

    const auth = useSelector((state) => state.auth);
    const projectDetails = useSelector((state) => state.projectDetails);
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
        document.title = "Project Details | Dashboard";

        const getData = async () => {
            const getProjectDetailsPromise = getProjectDetailsAction(dispatch, auth.token, id);
            openBackdrop();
            await getProjectDetailsPromise;
            closeBackdrop();
        }

        if (projectDetails.status === 'loading') {
            openBackdrop();
        }
        else {
            closeBackdrop();
        }

        if (projectDetails.status === 'idle' ||
            (id && id !== projectDetails.post?._id)) {
            getData();
        }

        return () => { }

    }, [
        auth.token, projectDetails.status,
        projectDetails.post?._id, id, dispatch
    ]);

    useEffect(() => {
        if (projectDetails.error !== null) {
            enqueueSnackbar(projectDetails.error, { variant: 'error' });
            clearProjectsDetailsErrorAction(dispatch);
        }

        return () => { }

    }, [
        projectDetails.error, enqueueSnackbar, dispatch
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
                title="Project Details"
            />

            {
                projectDetails.project !== null ?
                    <Box
                        width="100%"
                        mt="1.5rem"
                        bgcolor={colors.dialog}
                        p="1rem"
                    >

                        {/* Carousel */}
                        <Carousel
                            autoPlay={false}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                maxWidth: '25rem',
                                maxHeight: '25rem',
                                position: 'relative',
                                margin: '0 auto',
                                marginBottom: '1.5rem',
                                aspectRatio: '9/16',
                                objectFit: 'contain'
                            }}
                            indicatorIconButtonProps={{
                                style: {
                                    width: "4px",
                                    height: "4px",
                                    margin: "0 4px",
                                    color: colors.primary[200],
                                }
                            }}
                            activeIndicatorIconButtonProps={{
                                style: {
                                    width: "4px",
                                    height: "4px",
                                    margin: "0 4px",
                                    color: colors.greenAccent[500],
                                }
                            }}
                            indicatorContainerProps={{
                                style: {
                                    position: "absolute",
                                    zIndex: 2,
                                    bottom: "4px",
                                    textAlign: 'center'
                                }

                            }}
                        >
                            {
                                projectDetails.project.screenshots.map((item, index) => {
                                    return (
                                        <img
                                            key={index}
                                            src={item.url}
                                            alt="Screenshot"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                aspectRatio: '9/16',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    )
                                })
                            }
                        </Carousel>

                        <h3
                            style={{
                                color: colors.primary[100],
                            }}
                        >
                            Details
                        </h3>

                        {/* ID*/}

                        <ListTile
                            title="ID"
                            value={projectDetails.project._id}
                            mt="1rem"
                        />

                        {/* Title */}
                        <ListTile
                            title="Title"
                            value={projectDetails.project.title}
                            mt="1rem"
                        />


                        {/* Owner */}

                        <ListTile
                            title="Owner"
                            value={projectDetails.project.owner.uname}
                            mt="1rem"
                        />

                        {/* Post Type */}

                        <ListTile
                            title="Project Type"
                            value={projectDetails.project.projectType}
                            mt="1rem"
                        />

                        {/* Likes */}

                        <ListTile
                            title="Likes"
                            value={numberUtils.toCountingNumber(projectDetails.project.likesCount || 0)}
                            mt="1rem"
                        />

                        {/* Reviews */}

                        <ListTile
                            title="Reviews"
                            value={numberUtils.toCountingNumber(projectDetails.project.reviewsCount || 0)}
                            mt="1rem"
                        />

                        {/* Views */}

                        <ListTile
                            title="Comments"
                            value={numberUtils.toCountingNumber(projectDetails.project.viewsCount || 0)}
                            mt="1rem"
                        />


                        {/* Downloads */}

                        <ListTile
                            title="Comments"
                            value={numberUtils.toCountingNumber(projectDetails.project.downloadsCount || 0)}
                            mt="1rem"
                        />

                        {/* Status */}

                        <ListTile
                            title="Status"
                            value={projectDetails.project?.projectStatus}
                            mt="1rem"
                        />

                        {/* Download Url */}

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
                                Download Url
                            </p>

                            <h5
                                style={{
                                    color: 'var(--linkColor)',
                                    textOverflow: 'ellipsis',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    window.open(projectDetails.project.downloadUrl, '_blank')
                                }}
                            >
                                Open
                            </h5>
                        </Box>


                        {/* Created At */}

                        <ListTile
                            title="Created At"
                            value={
                                projectDetails.project?.createdAt ?
                                    toDateTimeString(projectDetails.project.createdAt, { showSeconds: true })
                                    : null
                            }
                            mt="1rem"
                        />

                        {/* Updated At */}

                        <ListTile
                            title="Updated At"
                            value={
                                projectDetails.project?.updatedAt ?
                                    toDateTimeString(projectDetails.project.updatedAt, { showSeconds: true })
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

export default PageHOC(ProjectDetailsPage);