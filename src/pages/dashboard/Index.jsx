import { useState, useEffect } from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import {
  getStatsAction,
  getRecentPostsAction,
  getRecentUsersAction,
  getVerifiedUsersStatsAction,
  getMonthlyStatsAction,
  clearStatsErrorAction,
} from '../../redux/actions/statsAction';
import CircleAvatar from '../../components/CircleAvatar';
import PageHOC from '../../helpers/PageHOC';

const DashboardPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useSelector((state) => state.auth);
  const stats = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const closeBackdrop = () => {
    setOpen(false);
  };

  const openBackdrop = () => {
    setOpen(true);
  };

  useEffect(() => {
    document.title = "Home | Dashboard";

    const getData = async () => {
      if (stats.status === 'idle') {
        const statsPromise = getStatsAction(dispatch, auth.token);
        const recentUsersPromise = getRecentUsersAction(dispatch, auth.token);
        const recentPostsPromise = getRecentPostsAction(dispatch, auth.token);
        const verifiedUsersPromise = getVerifiedUsersStatsAction(dispatch, auth.token);
        const monthlyStatsPromise = getMonthlyStatsAction(dispatch, auth.token);

        openBackdrop();

        await Promise.all([
          statsPromise, recentUsersPromise, recentPostsPromise,
          verifiedUsersPromise, monthlyStatsPromise
        ]);
        closeBackdrop();
      }
    }

    getData();

    if (stats.status === 'loading') {
      openBackdrop();
    }
    else {
      closeBackdrop();
    }

    return () => { }

  }, [auth.token, dispatch, stats.status]);

  useEffect(() => {
    if (stats.error !== null) {
      enqueueSnackbar(stats.error, { variant: 'error' });
      clearStatsErrorAction(dispatch);
    }

    return () => { }

  }, [
    stats.error, enqueueSnackbar, dispatch
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

      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        flexDirection={{
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        mb="1.5rem"
      >
        <Header
          title="DASHBOARD"
          subtitle="Welcome to admin dashboard"
          mb={{
            xs: "1rem",
            sm: "1rem",
            md: "0",
            lg: "0",
            xl: "0",
          }}
        />

        <Button
          sx={{
            backgroundColor: colors.accent[700],
            color: colors.primary[100],
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{
            mr: "0.5rem",
            fontSize: "1rem"
          }} />
          Download Reports
        </Button>
      </Box>

      {/* Stat Box */}

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="wrap"
        p="0 1rem"
        backgroundColor={colors.dialog}
      >
        {
          (stats.status === 'success' && stats.stats) ?
            Object.keys(stats.stats).map((key) => {
              const stat = stats.stats[key];
              return (
                <StatBox
                  key={`stat-${key}`}
                  title={stat.total}
                  subtitle={key}
                // progress={stat.progress ? stat.progress / 100 : 0}
                // increase={
                //   stat.progress !== null && stat.progress >= 0 ?
                //     `+${stat.progress}%` :
                //     `${stat.progress}%`
                // }
                />
              );
            })
            :
            null
        }
      </Box>

      {/* Statistics */}

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {/* Recent Users */}

        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor={colors.dialog}
          p="1rem"
          mt="1.5rem"
          mb="0.5rem"
        >
          <h3
            style={{
              color: colors.primary[100],
            }}
          >
            Recent Users
          </h3>
        </Box>

        {
          stats.recentUsers !== null ?
            stats.recentUsers.map((user, i) => (
              <Box
                key={`${user._id}-${i}`}
                width="100%"
                bgcolor={colors.dialog}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p="0.5rem 1rem"
                mb="0.75rem"
                sx={{
                  ':last-child': {
                    marginBottom: '0'
                  }
                }}
              >
                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='flex-start'
                  alignItems="center"
                >
                  <CircleAvatar avatar={user.avatar} />

                  <Box ml='1rem'>
                    <h5
                      style={{
                        color: colors.primary[100],
                      }}
                    >
                      {user.fname} {user.lname}
                    </h5>

                    <p
                      style={{
                        color: colors.primary[300],
                      }}
                    >
                      {user.uname}
                    </p>
                  </Box>
                </Box>

                <div
                  style={{
                    backgroundColor: colors.accent[800],
                    padding: '5px 10px',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/users/${user._id}`)}
                >
                  <VisibilityIcon />
                </div>
              </Box>
            ))
            :
            null
        }

        {/* Recent Posts */}

        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor={colors.dialog}
          p="1rem"
          mt="1.5rem"
          mb="0.5rem"
        >
          <h3
            style={{
              color: colors.primary[100],
            }}
          >
            Recent Posts
          </h3>
        </Box>
        {
          stats.recentPosts !== null ?
            stats.recentPosts.map((post, i) => (
              <Box
                key={`${post._id}-${i}`}
                width="100%"
                bgcolor={colors.dialog}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p="0.5rem 1rem"
                mb="0.75rem"
                sx={{
                  ':last-child': {
                    marginBottom: '0'
                  }
                }}
              >
                <Box>

                  <h5
                    style={{
                      color: colors.grey[100],
                      textTransform: 'capitalize'
                    }}
                  >
                    {post.postType}
                  </h5>

                  <p
                    style={{
                      color: colors.primary[300],
                    }}
                  >
                    {post.owner.uname}
                  </p>
                </Box>

                <div
                  style={{
                    backgroundColor: colors.accent[800],
                    padding: '5px 10px',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/posts/${post._id}`)}
                >
                  <VisibilityIcon />
                </div>
              </Box>
            ))
            :
            null
        }

        {/* Verified Users */}

        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor={colors.dialog}
          p="1rem"
          mt="1.5rem"
          mb="0.5rem"
        >
          <h3
            style={{
              color: colors.grey[100],
            }}
          >
            Verified Users
          </h3>
        </Box>
        {
          stats.verifiedUsersStats !== null ?
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p="1rem"
              width="100%"
              bgcolor={colors.dialog}
            >
              <ProgressCircle
                size="144"
                progress={stats.verifiedUsersStats.roundedUnit}
              />

              <h5
                style={{
                  color: colors.primary[100],
                  fontWeight: 500,
                  marginTop: '1rem',
                  textTransform: 'capitalize'
                }}
              >
                {stats.verifiedUsersStats.roundedPercentage}% verified users
              </h5>

              <p
                style={{
                  color: colors.primary[300],
                }}
              >
                {`${stats.verifiedUsersStats.verifiedUsers} out of
                  ${stats.verifiedUsersStats.totalUsers} users are verified on the platform`}
              </p>
            </Box>
            :
            null
        }

        {/* Monthly Stats */}

        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          bgcolor={colors.dialog}
          p="1rem"
          mt="2rem"
          mb="0.5rem"
        >
          <h3
            style={{
              color: colors.grey[100],
            }}
          >
            Monthly Stats
          </h3>
        </Box>

        {
          (stats.monthlyStats !== null) ?
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p="1rem"
              width="100%"
              bgcolor={colors.dialog}
              height={{
                xs: '360px',
                sm: '360px',
                md: '360px',
                lg: '400px',
                xl: '400px'
              }}
            >
              <BarChart data={stats.monthlyStats} />
            </Box>
            :
            null
        }

      </Box>
    </Box>
  );
};

export default PageHOC(DashboardPage);
