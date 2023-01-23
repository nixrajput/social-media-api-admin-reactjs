import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { useSnackbar } from 'notistack';
import {
  getUsersAction,
  loadMoreUsersAction,
  searchUsersAction,
  clearUsersErrorAction
} from '../../redux/actions/usersAction';
import PageHOC from "../../helpers/PageHOC";
import UserItem from "./UserItem";
import InputBox from "../../components/InputBox";

const UserListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
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
    const nextPage = users.currentPage + 1;
    const loadMoreUsersPromise = loadMoreUsersAction(dispatch, auth.token, nextPage);
    await loadMoreUsersPromise;
  };

  const searchUsers = async (searchText) => {
    const searchUsersPromise = searchUsersAction(dispatch, auth.token, searchText);
    await searchUsersPromise;
  };

  useEffect(() => {
    document.title = "Dashboard - All Users";

    const getData = async () => {
      const usersPromise = getUsersAction(dispatch, auth.token);
      openBackdrop();
      await usersPromise;
      closeBackdrop();
    }

    if (users.status === 'idle' && users.results === null) {
      getData();
    }

    return () => { }

  }, [auth.token, users.status, dispatch, users.results]);

  useEffect(() => {
    if (users.error !== null) {
      enqueueSnackbar(users.error, { variant: 'error' });
      clearUsersErrorAction(dispatch);
    }

    return () => { }

  }, [
    users.error, enqueueSnackbar, dispatch
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
        title="Users"
      />

      <InputBox>
        <input
          type="text"
          placeholder="Search"
          name="searchText"
          disabled={
            users.status === 'loading'
            ||
            users.status === 'searching'
          }
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              searchUsers(searchText);
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
          onClick={() => searchUsers(searchText)}
        >
          <SearchIcon />
        </div>
      </InputBox>

      <Box
        m="1rem 0 0 0"
      >
        {
          users.status === 'searching' ?
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
            (users.userList !== null && users.userList.length > 0) ?
              users.userList.map((user, index) => (
                <UserItem
                  key={index}
                  user={user}
                  index={index}
                  totalLength={users.userList.length}
                />
              ))
              :
              <h4
                style={{
                  color: colors.primary[300],
                }}
              >
                No Users Found
              </h4>
          }
        </Box>

        {
          users.status === 'loadingMore' ?
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
          users.hasNextPage ?
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
};

export default PageHOC(UserListPage);
