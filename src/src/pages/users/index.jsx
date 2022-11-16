import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Header from "../../components/Header";
import {
  getAllUsersAction,
} from '../../redux/actions';
import PageHOC from "../../helpers/PageHOC";

const UserListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

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
      field: "_id",
      headerName: "ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fname",
      headerName: "First name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lname",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
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
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            m="0 auto"
            p="5px 10px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    document.title = "Dashboard - All Users";

    if (
      auth.status === 'authenticating' || auth.status === 'loadingUser' ||
      users.status === 'loading'
    ) {
      openBackdrop();
    }
    else {
      closeBackdrop();
    }

    return () => { }

  }, [
    auth.token, auth.user, auth.status, users.status
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
