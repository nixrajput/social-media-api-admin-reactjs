import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VerifiedIcon from '@mui/icons-material/Verified';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import Header from "../../components/Header";
import {
  getAllBlueTickRequestsAction,
  clearBlueTickRequestsErrorAction
} from '../../redux/actions';
import PageHOC from "../../helpers/PageHOC";
import CircleAvatar from "../../components/global/CircleAvatar";
import { toDateString } from '../../utils/dateUtils';

const BlueTickRequestsListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useSelector((state) => state.auth);
  const profileDetails = useSelector((state) => state.profileDetails);
  const blueTickRequests = useSelector((state) => state.blueTickRequests);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  const closeBackdrop = () => {
    setOpen(false);
  };

  const openBackdrop = () => {
    setOpen(true);
  };

  const getData = async () => {
    const blueTickRequestsPromise = getAllBlueTickRequestsAction(dispatch, auth.token);
    openBackdrop();
    await blueTickRequestsPromise;
    closeBackdrop();
  }

  const handlePageChange = async (newPage) => {
    setPage(newPage);
    const currentPage = newPage <= 0 ? 1 : newPage + 1;
    const blueTickRequestsPromise = getAllBlueTickRequestsAction(dispatch, auth.token, currentPage);
    if (blueTickRequests.status !== 'loading' && blueTickRequests.hasNextPage) {
      await blueTickRequestsPromise;
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "user",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1.5,
      renderCell: ({ row: { status } }) => {
        return (
          <div
            style={{
              backgroundColor: status === 'approved' ?
                colors.greenAccent[500] :
                colors.redAccent[500],
              padding: '4px 8px',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              style={{
                color: colors.white,
                fontWeight: 'bold',
                fontSize: '12px',
              }}
            >
              {status}
            </Typography>
          </div>
        );
      }
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
            onClick={() => navigate(`/blue-tick-requests/${_id}`)}
          >
            <VisibilityIcon />
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    document.title = "Dashboard - Blue Tick Requests";

    if (
      auth.status === 'authenticating' || profileDetails.status === 'loading' ||
      blueTickRequests.status === 'loading'
    ) {
      openBackdrop();
    }
    else {
      closeBackdrop();
    }

    if (blueTickRequests.status === 'error') {
      enqueueSnackbar(blueTickRequests.error, { variant: 'error' });
      clearBlueTickRequestsErrorAction(dispatch);
    }

    return () => { }

  }, [
    auth.token, profileDetails.status, auth.status, blueTickRequests.status,
    blueTickRequests.error, enqueueSnackbar, dispatch
  ]);

  useEffect(() => {
    if (blueTickRequests.status === 'idle') {
      getData();
    }

    return () => { }

  }, [auth.token, blueTickRequests.status]);

  return (
    <Box m="20px" mt="0" width="100%">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header title="BLUE TICK REQUESTS" subtitle="Managing the requests for blue tick verification" />
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
          blueTickRequests.status === 'success' && (
            <DataGrid
              rows={blueTickRequests.results}
              columns={columns}
              rowCount={blueTickRequests.totalPages * blueTickRequests.limit}
              pagination
              paginationMode="server"
              pageSize={blueTickRequests.limit}
              rowsPerPageOptions={[blueTickRequests.limit]}
              page={page}
              onPageChange={handlePageChange}
              disableSelectionOnClick
              getRowId={(row) => row._id}
              loading={blueTickRequests.status === 'loading'}
            />
          )
        }
      </Box>
    </Box>
  );
};

export default PageHOC(BlueTickRequestsListPage);
