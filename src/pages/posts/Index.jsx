import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
    getAllPostsAction,
} from '../../redux/actions';
import PageHOC from "../../helpers/PageHOC";
import { toDateString } from '../../utils/dateUtils';

const PostListPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const auth = useSelector((state) => state.auth);
    const profileDetails = useSelector((state) => state.profileDetails);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);

    const closeBackdrop = () => {
        setOpen(false);
    };

    const openBackdrop = () => {
        setOpen(true);
    };

    const getData = async () => {
        const postsPromise = getAllPostsAction(dispatch, auth.token);
        openBackdrop();
        await postsPromise;
        closeBackdrop();
    }

    const handlePageChange = async (newPage) => {
        setPage(newPage);
        const currentPage = newPage <= 0 ? 1 : newPage + 1;
        const postsPromise = getAllPostsAction(dispatch, auth.token, currentPage);
        if (posts.status !== 'loading' && posts.hasNextPage) {
            await postsPromise;
        }
    };

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1.5,
        },
        {
            field: "owner",
            headerName: "User",
            flex: 1.5,
        },
        {
            field: "postType",
            headerName: "Post Type",
            flex: 1,
            renderCell: ({ row: { postType } }) => {
                return (
                    <Typography>
                        {postType}
                    </Typography>
                );
            },
        },
        {
            field: "mediaCount",
            headerName: "Media Files",
            flex: 1,
            renderCell: ({ row: { mediaFiles } }) => {
                return (
                    <Typography>
                        {mediaFiles.length}
                    </Typography>
                );
            }
        },
        {
            field: "visibility",
            headerName: "Visibility",
            flex: 1,
            renderCell: ({ row: { visibility } }) => {
                return (
                    <Typography>
                        {visibility}
                    </Typography>
                );
            },
        },
        {
            field: "postStatus",
            headerName: "Status",
            flex: 1,
            renderCell: ({ row: { postStatus } }) => {
                return (
                    <Box
                        m="0"
                        p="2px 6px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={
                            postStatus === "active"
                                ? colors.greenAccent[600]
                                : colors.redAccent[600]
                        }
                        borderRadius="4px"
                    >
                        <Typography fontSize="12px"
                        >
                            {postStatus}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
            renderCell: ({ row: { createdAt } }) => {
                return (
                    <Typography>
                        {createdAt ? toDateString(createdAt) : ""}
                    </Typography>
                );
            },
        },
        {
            field: "edit",
            headerName: "",
            flex: 1,
            renderCell: ({ row: { _id } }) => {
                return (
                    <div
                        style={{
                            backgroundColor: colors.greenAccent[500],
                            padding: '5px 10px',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/posts/${_id}`)}
                    >
                        <VisibilityIcon />
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        document.title = "All Posts | Dashboard";

        if (
            auth.status === 'authenticating' || profileDetails.status === 'loading' ||
            posts.status === 'loading'
        ) {
            openBackdrop();
        }
        else {
            closeBackdrop();
        }

        return () => { }

    }, [
        auth.token, profileDetails.status, auth.status, posts.status
    ]);

    useEffect(() => {
        if (posts.status === 'idle') {
            getData();
        }

        return () => { }

    }, [auth.token, posts.status]);

    return (
        <Box m="20px" mt="0" width="100%">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Header title="POSTS" subtitle="Managing the Posts" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                {
                    posts.status === 'success' && (
                        <DataGrid
                            rows={posts.results}
                            columns={columns}
                            rowCount={posts.totalPages * posts.limit}
                            pagination
                            paginationMode="server"
                            pageSize={posts.limit}
                            rowsPerPageOptions={[posts.limit]}
                            page={page}
                            onPageChange={handlePageChange}
                            disableSelectionOnClick
                            getRowId={(row) => row._id}
                            loading={posts.status === 'loading'}
                        />
                    )
                }
            </Box>
        </Box>
    );
}

export default PageHOC(PostListPage);