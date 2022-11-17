import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Carousel from 'react-material-ui-carousel';
import Backdrop from '@mui/material/Backdrop';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Avatar from '../../components/global/Avatar';
import {
    getPostDetailsAction,
} from '../../redux/actions';
import PageHOC from "../../helpers/PageHOC";
import { toDateTimeString } from '../../utils/dateUtils';

const PostDetailsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams();

    const auth = useSelector((state) => state.auth);
    const postDetails = useSelector((state) => state.postDetails);
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
        const postDetailsPromise = getPostDetailsAction(dispatch, auth.token, id);
        openBackdrop();
        await postDetailsPromise;
        closeBackdrop();
    }

    useEffect(() => {
        document.title = "Post Details | Dashboard";

        if (
            auth.status === 'authenticating' || auth.status === 'loadingUser' ||
            postDetails.status === 'loading'
        ) {
            openBackdrop();
        }
        else {
            closeBackdrop();
        }

        return () => { }

    }, [
        auth.token, auth.user, auth.status, postDetails.status
    ]);

    useEffect(() => {
        if (postDetails.status === 'idle' || (id && id !== postDetails.post?._id)) {
            getData();
        }

        return () => { }

    }, [auth.token, postDetails.status, postDetails.post?._id, id]);

    return (
        <Box m="20px" mt="0" width="100%">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Header title="POST DETAILS" subtitle="Managing the Post Details" />

            {
                postDetails.status === 'success' ?
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gridAutoRows="140px"
                        gap="20px"
                        pb="20px"
                    >

                        {/* Post Media Start */}

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
                                p="10px"
                            >
                                <Carousel
                                    autoPlay={false}
                                    sx={{
                                        width: '400px',
                                        height: '100%',
                                        position: 'relative',
                                    }}
                                >
                                    {
                                        postDetails.post.mediaFiles.map((item, index) => {
                                            if (item.mediaType === "video") {
                                                return (
                                                    <video
                                                        key={index}
                                                        src={item.url}
                                                        autoPlay={false}
                                                        about="video"
                                                        controls
                                                        style={{
                                                            position: "relative",
                                                            width: "400px",
                                                            height: "400px",
                                                            aspectRatio: "1/1",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                )
                                            }

                                            return (
                                                <img
                                                    key={index}
                                                    src={item.url}
                                                    alt="Post Media"
                                                    style={{
                                                        position: "relative",
                                                        width: "400px",
                                                        height: "400px",
                                                        aspectRatio: "1/1",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </Carousel>
                            </Box>
                        </Box>

                        {/* Post Media End */}

                        {/* Post Details Start */}

                        <Box
                            gridColumn={{ xs: "span 12", lg: "span 8" }}
                            gridRow="span 8"
                            backgroundColor={colors.primary[400]}
                            overflow="auto"
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.primary[500]}`}
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

                            {/* Owner Details Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.primary[500]}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                                    Owner
                                </Typography>

                                <Box
                                    width="100%"
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    p="15px"
                                >
                                    <Box
                                        display='flex'
                                        flexDirection='row'
                                        justifyContent='center'
                                    >
                                        <Avatar
                                            avatar={postDetails.post.owner.avatar}
                                        />

                                        <Box ml='20px'>
                                            <Typography
                                                color={colors.greenAccent[500]}
                                                variant="h5"
                                                fontWeight="600"
                                            >
                                                {postDetails.post.owner.fname} {postDetails.post.owner.lname}
                                            </Typography>

                                            <Typography color={colors.grey[100]}>
                                                {postDetails.post.owner.uname}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box
                                        backgroundColor={colors.greenAccent[500]}
                                        p="5px 10px"
                                        borderRadius="4px"
                                        display='flex'
                                        flexDirection='row'
                                        justifyContent='center'
                                        alignItems='center'
                                        style={{ cursor: 'pointer' }}
                                        onClick={
                                            () => navigate(`/users/${postDetails.post.owner._id}`)
                                        }
                                    >
                                        <VisibilityIcon />
                                    </Box>
                                </Box>
                            </Box>

                            {/* Owner Details End */}

                            {/* Post Caption Start */}

                            {
                                postDetails.post.caption ?
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        justifyContent="stretch"
                                        borderBottom={`2px solid ${colors.primary[500]}`}
                                        colors={colors.grey[100]}
                                        p="15px"
                                    >
                                        <Typography
                                            color={colors.grey[100]}
                                            variant="h5"
                                            fontWeight="600"
                                        >
                                            Caption
                                        </Typography>

                                        <Typography color={colors.grey[200]}
                                            variant="subtitle1"
                                        >
                                            {postDetails.post.caption}
                                        </Typography>
                                    </Box>
                                    :
                                    null
                            }

                            {/* Post Caption End */}

                            {/* Post Type Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.primary[500]}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Post Type
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {postDetails.post.postType}
                                </Typography>
                            </Box>

                            {/* Post Type End */}

                            {/* Post Likes Count Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.primary[500]}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Likes
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {postDetails.post.likesCount}
                                </Typography>
                            </Box>

                            {/* Post Likes Count End */}

                            {/* Post Comments Count Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.primary[500]}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Comments
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {postDetails.post.commentsCount}
                                </Typography>
                            </Box>

                            {/* Post Comments Count End */}

                            {/* Post Visibility Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.primary[500]}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Post Visibility
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {postDetails.post.visibility}
                                </Typography>
                            </Box>

                            {/* Post Visibility End */}

                            {/* Post Status Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.primary[500]}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Post Status
                                </Typography>

                                <Typography color={colors.grey[200]}
                                    variant="subtitle1"
                                >
                                    {postDetails.post.postStatus}
                                </Typography>
                            </Box>

                            {/* Post Status End */}

                            {/* Post Created At Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.primary[500]}`}
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
                                        postDetails.post.createdAt ?
                                            toDateTimeString(postDetails.post.createdAt, { showSeconds: true })
                                            : null
                                    }
                                </Typography>
                            </Box>

                            {/* Post Created At End */}

                            {/* Post Updated At Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.primary[500]}`}
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
                                        postDetails.post.updatedAt ?
                                            toDateTimeString(postDetails.post.updatedAt, { showSeconds: true })
                                            : null
                                    }
                                </Typography>
                            </Box>

                            {/* Post Updated At End */}

                            {/* Post Actions Start */}

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="stretch"
                                borderBottom={`2px solid ${colors.primary[500]}`}
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
                                                navigate(`/posts/${postDetails.post.id}/edit`)
                                            }}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="contained"
                                            sx={{ marginLeft: "10px" }}
                                            onClick={() => {
                                                navigate(`/posts/${postDetails.post.id}/delete`)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Post Actions End */}

                        </Box>

                        {/* Post Details End */}

                    </Box>
                    : null
            }

        </Box>
    )
}

export default PageHOC(PostDetailsPage);