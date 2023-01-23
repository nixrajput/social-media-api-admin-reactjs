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
    getProjectsAction,
    loadMoreProjectsAction,
    searcProjectsAction,
    clearProjectsErrorAction,
} from '../../redux/actions/projectAction';
import PageHOC from "../../helpers/PageHOC";
import InputBox from "../../components/InputBox";
import ProjectItem from "./ProjectItem";

const ProjectListPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const auth = useSelector((state) => state.auth);
    const projects = useSelector((state) => state.projects);
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
        const nextPage = projects.currentPage + 1;
        const loadMoreProjectsPromise = loadMoreProjectsAction(dispatch, auth.token, nextPage);
        await loadMoreProjectsPromise;
    };

    const searchposts = async (searchText) => {
        const searchProjectsPromise = searcProjectsAction(dispatch, auth.token, searchText);
        await searchProjectsPromise;
    };

    useEffect(() => {
        document.title = "Posts - Dashboard";

        const getData = async () => {
            const getProjectsPromise = getProjectsAction(dispatch, auth.token);
            openBackdrop();
            await getProjectsPromise;
            closeBackdrop();
        }

        if (projects.status === 'idle' && projects.results === null) {
            getData();
        }

        return () => { }

    }, [auth.token, projects.status, dispatch, projects.results]);

    useEffect(() => {
        if (projects.error !== null) {
            enqueueSnackbar(projects.error, { variant: 'error' });
            clearProjectsErrorAction(dispatch);
        }

        return () => { }

    }, [
        projects.error, enqueueSnackbar, dispatch
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
                        projects.status === 'loading'
                        ||
                        projects.status === 'searching'
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
                    projects.status === 'searching' ?
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
                        (projects.projectList !== null && projects.projectList.length > 0) ?
                            projects.projectList.map((item, index) => (
                                <ProjectItem
                                    key={index}
                                    project={item}
                                    index={index}
                                    totalLength={projects.projectList.length}
                                />
                            ))
                            :
                            <h4
                                style={{
                                    color: colors.primary[300],
                                }}
                            >
                                No Projects Found
                            </h4>
                    }
                </Box>

                {
                    projects.status === 'loadingMore' ?
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
                    projects.hasNextPage ?
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

export default PageHOC(ProjectListPage);