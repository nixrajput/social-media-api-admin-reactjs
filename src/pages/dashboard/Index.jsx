import { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import ListIcon from "@mui/icons-material/List";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CommentIcon from "@mui/icons-material/Comment";
import Header from "../../components/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import {
  getStatsAction,
  getRecentPostsAction,
  getRecentUsersAction,
  getVerifiedUsersStatsAction,
  getMonthlyStatsAction,
} from '../../redux/actions';
import { toDateString } from '../../utils/dateUtils';
import CircleAvatar from '../../components/global/CircleAvatar';
import PageHOC from '../../helpers/PageHOC';

const DashboardPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useSelector((state) => state.auth);
  const profileDetails = useSelector((state) => state.profileDetails);
  const stats = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const closeBackdrop = () => {
    setOpen(false);
  };

  const openBackdrop = () => {
    setOpen(true);
  };

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

  const renderIcon = (key) => {
    switch (key) {
      case 'users':
        return <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "32px" }} />;
      case 'posts':
        return <ListIcon sx={{ color: colors.greenAccent[600], fontSize: "32px" }} />;
      case 'comments':
        return <CommentIcon sx={{ color: colors.greenAccent[600], fontSize: "32px" }} />;
      case 'messages':
        return <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "32px" }} />;
      default:
        return <ListIcon sx={{ color: colors.greenAccent[600], fontSize: "32px" }} />;
    }
  }

  useEffect(() => {
    document.title = "Home | Dashboard";

    if (profileDetails.status === 'loading' || stats.status === 'loading') {
      openBackdrop();
    }
    else {
      closeBackdrop();
    }

    return () => { }

  }, [
    profileDetails.status, stats.status
  ]);

  useEffect(() => {
    getData();

    return () => { }

  }, [auth.token]);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box m="20px" mt="0" width="100%">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to admin dashboard" />

          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>

        {/* GRID & CHARTS */}

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          pb="20px"
        >
          {/* Row 1 Start */}

          {
            (stats.status === 'success' && stats.stats) ?
              Object.keys(stats.stats).map((key) => {
                const stat = stats.stats[key];
                return (
                  <StatBox
                    key={key}
                    title={stat.total}
                    subtitle={key.toLocaleUpperCase()}
                    icon={renderIcon(key)}
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

          {/* Row 1 End */}

          {/* Row 2 Start */}

          <Box
            gridColumn={{ xs: "span 12", lg: "span 6" }}
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.background}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]}
                variant="h3"
                fontWeight="600"
              >
                Recent Users
              </Typography>
            </Box>
            {
              (stats.status === 'success' && stats.recentUsers) ?
                stats.recentUsers.map((user, i) => (
                  <Box
                    key={`${user._id}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.background}`}
                    p="15px"
                  >
                    <Box display='flex' flexDirection='row' justifyContent='center'>
                      <CircleAvatar avatar={user.avatar} />
                      <Box ml='20px'>
                        <Typography
                          color={colors.greenAccent[500]}
                          variant="h5"
                          fontWeight="600"
                        >
                          {user._id}
                        </Typography>
                        <Typography color={colors.grey[100]}>
                          {user.uname}
                        </Typography>
                      </Box>
                    </Box>

                    <Box color={colors.grey[100]}>
                      {user.createdAt && toDateString(user.createdAt)}
                    </Box>

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
                      onClick={() => navigate(`/users/${user._id}`)}
                    >
                      <VisibilityIcon />
                    </div>
                  </Box>
                ))
                :
                null
            }
          </Box>

          {/* <Box
            gridColumn="span 8"
            gridRow="span 2"
            sx={{ gridColumn: "span 12", gridRow: "span 2" }}
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Recent Users
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  $59,342.32
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box> */}

          <Box
            gridColumn={{ xs: "span 12", lg: "span 6" }}
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.background}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]}
                variant="h3"
                fontWeight="600">
                Recent Posts
              </Typography>
            </Box>
            {
              (stats.status === 'success' && stats.recentPosts) ?
                stats.recentPosts.map((post, i) => (
                  <Box
                    key={`${post._id}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.background}`}
                    p="15px"
                  >
                    <Box>
                      <Typography
                        color={colors.greenAccent[500]}
                        variant="h5"
                        fontWeight="600"
                      >
                        {post._id}
                      </Typography>
                      <Typography color={colors.grey[100]}>
                        {post.owner.uname}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography color={colors.grey[100]}>
                        {post.mediaFiles.length} Media
                      </Typography>
                    </Box>

                    <Box color={colors.grey[100]}>
                      {post.createdAt && toDateString(post.createdAt)}
                    </Box>

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
                      onClick={() => navigate(`/posts/${post._id}`)}
                    >
                      <VisibilityIcon />
                    </div>
                  </Box>
                ))
                :
                null
            }
          </Box>

          {/* Row 2 End */}

          {/* Row 3 Start */}

          <Box
            gridColumn={{ xs: "span 12", lg: "span 4" }}
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.background}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography variant="h3" fontWeight="600">
                Blue Tick Verified Users
              </Typography>
            </Box>

            {
              (stats.status === 'success' && stats.verifiedUsersStats) ?
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt="25px"
                >
                  <ProgressCircle
                    size="144"
                    progress={stats.verifiedUsersStats.roundedUnit}
                  />
                  <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    sx={{ mt: "15px" }}
                  >
                    {stats.verifiedUsersStats.roundedPercentage}% verified users
                  </Typography>
                  <Typography>
                    {`${stats.verifiedUsersStats.verifiedUsers} out of
                  ${stats.verifiedUsersStats.totalUsers} users are blue tick verified`}
                  </Typography>
                </Box>
                :
                null
            }
          </Box>

          <Box
            gridColumn={{ xs: "span 12", lg: "span 8" }}
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.background}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                variant="h3"
                fontWeight="600"
              >
                Monthly Stats
              </Typography>
            </Box>

            {
              (stats.status === 'success' && stats.monthlyStats) ?
                <Box height="250px" mt="-20px">
                  <BarChart data={stats.monthlyStats} />
                </Box>
                :
                null
            }
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default PageHOC(DashboardPage);
