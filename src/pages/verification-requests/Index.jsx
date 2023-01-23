import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import Header from "../../components/Header";
import {
  getRequestsAction,
  loadMoreRequestsAction,
  clearRequestsErrorAction
} from '../../redux/actions/verificationRequestsAction';
import PageHOC from "../../helpers/PageHOC";
import VerificationRequestItem from "./VerificationRequestItem";

const BlueTickRequestsListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useSelector((state) => state.auth);
  const verificationRequests = useSelector((state) => state.verificationRequests);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const closeBackdrop = () => {
    setOpen(false);
  };

  const openBackdrop = () => {
    setOpen(true);
  };

  const loadMore = async () => {
    const nextPage = verificationRequests.currentPage + 1;
    const loadMoreRequestssPromise = loadMoreRequestsAction(dispatch, auth.token, nextPage);
    await loadMoreRequestssPromise;
  };

  useEffect(() => {
    document.title = "Dashboard - Verification Requests";

    const getData = async () => {
      const requestsPromise = getRequestsAction(dispatch, auth.token);
      openBackdrop();
      await requestsPromise;
      closeBackdrop();
    }

    if (verificationRequests.status === 'idle' &&
      verificationRequests.results === null) {
      getData();
    }

    return () => { }

  }, [
    auth.token, verificationRequests.status,
    dispatch, verificationRequests.results
  ]);

  useEffect(() => {
    if (verificationRequests.error !== null) {
      enqueueSnackbar(verificationRequests.error, { variant: 'error' });
      clearRequestsErrorAction(dispatch);
    }

    return () => { }

  }, [
    verificationRequests.error, enqueueSnackbar, dispatch
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
        title="Verification Requests"
      />

      <Box
        m="1rem 0 0 0"
      >
        <Box
        >
          {
            (verificationRequests.requestList !== null &&
              verificationRequests.requestList.length > 0) ?
              verificationRequests.requestList.map((req, index) => (
                <VerificationRequestItem
                  key={index}
                  request={req}
                  index={index}
                  totalLength={verificationRequests.requestList.length}
                />
              ))
              :
              <h4
                style={{
                  color: colors.primary[300],
                }}
              >
                No verification requests found
              </h4>
          }
        </Box>

        {
          verificationRequests.status === 'loadingMore' ?
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
          verificationRequests.hasNextPage ?
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

export default PageHOC(BlueTickRequestsListPage);
