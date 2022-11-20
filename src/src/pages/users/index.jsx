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
import Header from "../../components/Header";
import {
  getAllUsersAction,
} from '../../redux/actions';
import PageHOC from "../../helpers/PageHOC";
import CircleAvatar from "../../components/global/CircleAvatar";
import { toDateString } from '../../utils/dateUtils';

const UserListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useSelector((state) => state.auth);
  const profileDetails = useSelector((state) => state.profileDetails);
  const users = useSelector((state) => state.users);
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
    const usersPromise = getAllUsersAction(dispatch, auth.token);
    openBackdrop();
    await usersPromise;
    closeBackdrop();
  }

  const handlePageChange = async (newPage) => {
    setPage(newPage);
    const currentPage = newPage <= 0 ? 1 : newPage + 1;
    const usersPromise = getAllUsersAction(dispatch, auth.token, currentPage);
    if (users.status !== 'loading' && users.hasNextPage) {
      await usersPromise;
    }
  };

  const columns = [
    {
      field: "avatar",
      headerName: "",
      width: 64,
      renderCell: (params) => (
        <CircleAvatar
          avatar={params.row.avatar}
        />
      ),
    },
    {
      field: "_id",
      headerName: "ID",
      flex: 1.5,
    },
    {
      field: "fname",
      headerName: "First name",
      flex: 1,
    },
    {
      field: "lname",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "uname",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            m="0"
            p="2px 6px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={
              role === "admin"
                ? colors.redAccent[600]
                : colors.greenAccent[600]
            }
            borderRadius="4px"
          >
            <Typography fontSize="12px"
            >
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "accountStatus",
      headerName: "Account Status",
      flex: 1,
      renderCell: ({ row: { accountStatus } }) => {
        return (
          <Box
            m="0"
            p="2px 6px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={
              accountStatus === "active"
                ? colors.greenAccent[600]
                : colors.redAccent[600]
            }
            borderRadius="4px"
          >
            <Typography fontSize="12px"
            >
              {accountStatus}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "isValid",
      headerName: "Valid Status",
      flex: 1,
      renderCell: ({ row: { isValid } }) => {
        return (
          <VerifiedUserIcon
            sx={{
              color: isValid ?
                colors.greenAccent[600]
                :
                colors.redAccent[600],
            }}
          />
        );
      }
    },
    {
      field: "isVerified",
      headerName: "Verified Status",
      flex: 1,
      renderCell: ({ row: { isVerified } }) => {
        return (
          <VerifiedIcon
            sx={{
              color: isVerified ?
                colors.greenAccent[600]
                :
                colors.grey[400],
            }}
          />
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
            onClick={() => navigate(`/users/${_id}`)}
          >
            <VisibilityIcon />
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    document.title = "Dashboard - All Users";

    if (
      auth.status === 'authenticating' || profileDetails.status === 'loading' ||
      users.status === 'loading'
    ) {
      openBackdrop();
    }
    else {
      closeBackdrop();
    }

    return () => { }

  }, [
    auth.token, profileDetails.status, auth.status, users.status
  ]);

  useEffect(() => {
    if (users.status === 'idle') {
      getData();
    }

    return () => { }

  }, [auth.token, users.status]);

  return (
    <Box m="20px" mt="0" width="100%">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header title="USERS" subtitle="Managing the Users" />
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
          users.status === 'success' && (
            <DataGrid
              rows={users.results}
              columns={columns}
              rowCount={users.totalPages * users.limit}
              pagination
              paginationMode="server"
              pageSize={users.limit}
              rowsPerPageOptions={[users.limit]}
              page={page}
              onPageChange={handlePageChange}
              disableSelectionOnClick
              getRowId={(row) => row._id}
              loading={users.status === 'loading'}
            />
          )
        }
      </Box>
    </Box>
  );
};

export default PageHOC(UserListPage);
