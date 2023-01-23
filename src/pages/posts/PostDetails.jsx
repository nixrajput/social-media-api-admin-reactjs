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
    getPostDetailsAction,
    clearPostDetailsErrorAction,
} from '../../redux/actions/postsAction';
import PageHOC from "../../helpers/PageHOC";
import { toDateTimeString } from '../../utils/dateUtils';
import ListTile from "../../components/ListTile";
import numberUtils from "../../utils/numberUtils";

const PostDetailsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams();

    const auth = useSelector((state) => state.auth);
    const postDetails = useSelector((state) => state.postDetails);
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
        document.title = "Post Details | Dashboard";

        const getData = async () => {
            const postDetailsPromise = getPostDetailsAction(dispatch, auth.token, id);
            openBackdrop();
            await postDetailsPromise;
            closeBackdrop();
        }

        if (postDetails.status === 'loading') {
            openBackdrop();
        }
        else {
            closeBackdrop();
        }

        if (postDetails.status === 'idle' ||
            (id && id !== postDetails.post?._id)) {
            getData();
        }

        return () => { }

    }, [
        auth.token, postDetails.status,
        postDetails.post?._id, id, dispatch
    ]);

    useEffect(() => {
        if (postDetails.error !== null) {
            enqueueSnackbar(postDetails.error, { variant: 'error' });
            clearPostDetailsErrorAction(dispatch);
        }

        return () => { }

    }, [
        postDetails.error, enqueueSnackbar, dispatch
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
                title="Post Details"
            />

            {
                postDetails.post !== null ?
                    <Box
                        width="100%"
                        mt="1.5rem"
                        bgcolor={colors.dialog}
                        p="1rem"
                    >

                        {/* Carousel */}

                        {
                            postDetails.post.postType === "media" ?
                                <Carousel
                                    autoPlay={false}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        maxWidth: '25rem',
                                        maxHeight: '25rem',
                                        position: 'relative',
                                        margin: '0 auto',
                                        marginBottom: '1.5rem',
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
                                        postDetails.post.mediaFiles.map((item, index) => {
                                            if (item.mediaType === "video") {
                                                return (
                                                    <video
                                                        key={index}
                                                        src={item.url}
                                                        autoPlay={false}
                                                        controls
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            aspectRatio: '1/1',
                                                            objectFit: 'contain',
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
                                                        width: '100%',
                                                        height: 'auto',
                                                        aspectRatio: '1/1',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </Carousel>
                                :
                                null
                        }

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
                            value={postDetails.post._id}
                            mt="1.5rem"
                        />

                        {/* Caption */}

                        {
                            postDetails.post.postType === "poll" ?
                                <ListTile
                                    title="Poll Question"
                                    value={postDetails.post.pollQuestion}
                                    mt="1rem"
                                />
                                :
                                <ListTile
                                    title="Caption"
                                    value={postDetails.post.caption}
                                    mt="1rem"
                                />
                        }

                        {
                            postDetails.post.postType === "poll" ?
                                <Box>
                                    {/* Poll Options */}

                                    <ListTile
                                        title="Poll Options"
                                        value={postDetails.post.pollOptions.map((item, index) => {
                                            return item.option
                                        }).join(", ")}
                                        mt="1rem"
                                    />

                                    {/* Total Votes */}

                                    <ListTile
                                        title="Total Votes"
                                        value={postDetails.post.totalVotes}
                                        mt="1rem"
                                    />

                                    {/* Poll Ends At */}

                                    <ListTile
                                        title="Poll Ends At"
                                        value={
                                            postDetails.post?.pollEndsAt ?
                                                toDateTimeString(postDetails.post?.pollEndsAt, { showSeconds: true })
                                                : null
                                        }
                                        mt="1rem"
                                    />
                                </Box>
                                :
                                null
                        }

                        {/* Owner */}

                        <ListTile
                            title="Owner"
                            value={postDetails.post.owner.uname}
                            mt="1rem"
                        />

                        {/* Post Type */}

                        <ListTile
                            title="Post Type"
                            value={postDetails.post.postType}
                            mt="1rem"
                        />

                        {/* Likes */}

                        <ListTile
                            title="Likes"
                            value={numberUtils.toCountingNumber(postDetails.post.likesCount || 0)}
                            mt="1rem"
                        />

                        {/* Comments */}

                        <ListTile
                            title="Comments"
                            value={numberUtils.toCountingNumber(postDetails.post.commentsCount || 0)}
                            mt="1rem"
                        />

                        {/* Reposts */}

                        <ListTile
                            title="Reposts"
                            value={numberUtils.toCountingNumber(postDetails.post.repostsCount || 0)}
                            mt="1rem"
                        />

                        {/* Shares */}

                        <ListTile
                            title="Shares"
                            value={numberUtils.toCountingNumber(postDetails.post.sharesCount || 0)}
                            mt="1rem"
                        />

                        {/* Saves */}

                        <ListTile
                            title="Saves"
                            value={numberUtils.toCountingNumber(postDetails.post.savesCount || 0)}
                            mt="1rem"
                        />

                        {/* Views */}

                        <ListTile
                            title="Comments"
                            value={numberUtils.toCountingNumber(postDetails.post.viewsCount || 0)}
                            mt="1rem"
                        />

                        {/* Status */}

                        <ListTile
                            title="Status"
                            value={postDetails.post?.postStatus}
                            mt="1rem"
                        />

                        {/*  Visibility */}

                        <ListTile
                            title="Visibility"
                            value={postDetails.post?.visibility}
                            mt="1rem"
                        />

                        {/* Is Comments Allowed */}

                        <ListTile
                            title="Is Comments Allowed"
                            value={postDetails.post?.allowComments ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Is Likes Allowed */}

                        <ListTile
                            title="Is Likes Allowed"
                            value={postDetails.post?.allowLikes ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Is Repost Allowed */}

                        <ListTile
                            title="Is Repost Allowed"
                            value={postDetails.post?.allowReposts ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Is Sharing Allowed */}

                        <ListTile
                            title="Is Sharing Allowed"
                            value={postDetails.post?.allowShare ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Is Saving Allowed */}

                        <ListTile

                            title="Is Saving Allowed"
                            value={postDetails.post?.allowSave ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Is Download Allowed */}

                        <ListTile
                            title="Is Download Allowed"
                            value={postDetails.post?.allowDownload ? "Yes" : "No"}
                            mt="1rem"
                        />

                        {/* Created At */}

                        <ListTile
                            title="Created At"
                            value={
                                postDetails.post?.createdAt ?
                                    toDateTimeString(postDetails.post.createdAt, { showSeconds: true })
                                    : null
                            }
                            mt="1rem"
                        />

                        {/* Updated At */}

                        <ListTile
                            title="Updated At"
                            value={
                                postDetails.post?.updatedAt ?
                                    toDateTimeString(postDetails.post.updatedAt, { showSeconds: true })
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

export default PageHOC(PostDetailsPage);