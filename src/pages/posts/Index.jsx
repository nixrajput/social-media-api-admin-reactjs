import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import {
    getPostsAction,
    loadMorePostsAction,
    clearPostsErrorAction,
    searchPostsAction
} from '../../redux/actions/postsAction';
import PageHOC from "../../helpers/PageHOC";
import InputBox from "../../components/InputBox";
import PostItem from "./PostItem";

const PostListPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const auth = useSelector((state) => state.auth);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    const closeBackdrop = () => {
        setOpen(false);
    };

    const openBackdrop = () => {
        setOpen(true);
    };

    const loadMore = async () => {
        const nextPage = posts.currentPage + 1;
        const loadMorePostsPromise = loadMorePostsAction(dispatch, auth.token, nextPage);
        await loadMorePostsPromise;
    };

    const searchposts = async (searchText) => {
        const searchPostsPromise = searchPostsAction(dispatch, auth.token, searchText);
        await searchPostsPromise;
    };

    useEffect(() => {
        document.title = "Posts - Dashboard";

        const getData = async () => {
            const postsPromise = getPostsAction(dispatch, auth.token);
            openBackdrop();
            await postsPromise;
            closeBackdrop();
        }

        if (posts.status === 'idle' && posts.results === null) {
            getData();
        }

        return () => { }

    }, [auth.token, posts.status, dispatch, posts.results]);

    useEffect(() => {
        if (posts.error !== null) {
            enqueueSnackbar(posts.error, { variant: 'error' });
            clearPostsErrorAction(dispatch);
        }

        return () => { }

    }, [
        posts.error, enqueueSnackbar, dispatch
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
                title="Posts"
            />

            <InputBox>
                <input
                    type="text"
                    placeholder="Search"
                    name="searchText"
                    disabled={
                        posts.status === 'loading'
                        ||
                        posts.status === 'searching'
                    }
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter')
                            searchposts(searchText);
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        marginLeft: '1rem',
                    }}
                    onClick={() => searchposts(searchText)}
                >
                    <SearchIcon />
                </div>
            </InputBox>

            <Box
                m="1rem 0 0 0"
            >
                {
                    posts.status === 'searching' ?
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            m="1rem"
                        >
                            <CircularProgress sx={{ color: colors.accent }} />
                        </Box>
                        :
                        null
                }

                <Box>
                    {
                        (posts.postList !== null && posts.postList.length > 0) ?
                            posts.postList.map((post, index) => (
                                <PostItem
                                    key={index}
                                    post={post}
                                    index={index}
                                    totalLength={posts.postList.length}
                                />
                            ))
                            :
                            <h4
                                style={{
                                    color: colors.primary[300],
                                }}
                            >
                                No posts Found
                            </h4>
                    }
                </Box>

                {
                    posts.status === 'loadingMore' ?
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            m="1rem"
                        >
                            <CircularProgress sx={{ color: colors.accent }} />
                        </Box>
                        :
                        null
                }
                {
                    posts.hasNextPage ?
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            m="1rem"
                        >
                            <Button
                                variant="text"
                                sx={{
                                    color: colors.accent,
                                }}
                                onClick={() => loadMore()}
                            >
                                Load More
                            </Button>
                        </Box>
                        :
                        null
                }
            </Box>
        </Box>
    );
}

export default PageHOC(PostListPage);