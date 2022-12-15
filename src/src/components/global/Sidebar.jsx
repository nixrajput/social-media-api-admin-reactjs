import { useState, useEffect } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import CircleAvatar from "./CircleAvatar";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        navigate(to);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation();

  // const auth = useSelector((state) => state.auth);
  const profileDetails = useSelector((state) => state.profileDetails);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    window.addEventListener('load', () => {
      if (window.innerWidth <= 980) {
        setIsCollapsed(true);
      }
      else {
        setIsCollapsed(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 980) {
        setIsCollapsed(true);
      }
      else {
        setIsCollapsed(false);
      }
    });

    return () => {
      window.removeEventListener("load", () => { });
      window.removeEventListener("resize", () => { });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/dashboard" || location.pathname === "/") {
      setSelected("Dashboard");
    }

    if (location.pathname === "/users" || location.pathname.includes("/users/")) {
      setSelected("Users");
    }

    if (location.pathname === "/posts" || location.pathname.includes("/posts/")) {
      setSelected("Posts");
    }

    if (location.pathname === "/comments" || location.pathname.includes("/comments/")) {
      setSelected("Comments");
    }

    if (location.pathname === "/notifications" || location.pathname.includes("/notifications/")) {
      setSelected("Notifications");
    }

    if (location.pathname === "/fcm-tokens" || location.pathname.includes("/fcm-tokens/")) {
      setSelected("FCM Tokens");
    }

    if (location.pathname === "/auth-tokens" || location.pathname.includes("/auth-tokens/")) {
      setSelected("Auth Tokens");
    }

    if (location.pathname === "/auth-tokens" || location.pathname.includes("/auth-tokens/")) {
      setSelected("Auth Tokens");
    }

    if (location.pathname === "/login-info" || location.pathname.includes("/login-info/")) {
      setSelected("Login Info");
    }

    if (location.pathname === "/requests/bluetick" || location.pathname.includes("/requests/bluetick")) {
      setSelected("Blue Tick Requests");
    }

    if (location.pathname === "/reports/users" || location.pathname.includes("/reports/users/")) {
      setSelected("User Reports");
    }

    if (location.pathname === "/reports/posts" || location.pathname.includes("/reports/posts/")) {
      setSelected("Post Reports");
    }

    if (location.pathname === "/reports/comments" || location.pathname.includes("/reports/comments/")) {
      setSelected("Comment Reports");
    }

    if (location.pathname === "/reports/feedbacks" || location.pathname.includes("/reports/feedbacks/")) {
      setSelected("Feedback Reports");
    }

    if (location.pathname === "/analytics/users" || location.pathname.includes("/analytics/users/")) {
      setSelected("User Analytics");
    }

    if (location.pathname === "/analytics/posts" || location.pathname.includes("/analytics/posts/")) {
      setSelected("Post Analytics");
    }

    if (location.pathname === "/analytics/comments" || location.pathname.includes("/analytics/comments/")) {
      setSelected("Comment Analytics");
    }

    if (location.pathname === "/analytics/feedbacks" || location.pathname.includes("/analytics/feedbacks/")) {
      setSelected("Feedback Analytics");
    }

    return () => { }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        "& .sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .menu-anchor": {
          background: `transparent !important`,
          color: `inherit !important`,
        },
        "& .menu-item:hover": {
          color: "#868dfb !important",
        },
        "& .menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          {
            !isCollapsed ?
              <Box m="20px 0"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <CircleAvatar
                  avatar={profileDetails.user?.avatar}
                  size="100px"
                />

                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {profileDetails.user?.fname + " " + profileDetails.user?.lname}
                  </Typography>

                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {'@' + profileDetails.user?.uname}
                  </Typography>
                </Box>
              </Box>
              : null
          }

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Data */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>

            <Item
              title="Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Posts"
              to="/posts"
              icon={<ListAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Comments"
              to="/comments"
              icon={<CommentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Notifications"
              to="/notifications"
              icon={<NotificationsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="FCM Tokens"
              to="/fcm-tokens"
              icon={<TokenOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Auth Tokens"
              to="/auth-tokens"
              icon={<VpnKeyOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Login Info"
              to="/login-info"
              icon={<DevicesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Requests */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Requests
            </Typography>

            <Item
              title="Blue Tick Requests"
              to="/blue-tick-requests"
              icon={<VerifiedOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Reports */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Reports
            </Typography>

            <Item
              title="User Reports"
              to="/reports/users"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Post Reports"
              to="/reports/posts"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Comment Reports"
              to="/reports/comments"
              icon={<CommentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Feedback Reports"
              to="/reports/feedbacks"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Analytics */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Analytics
            </Typography>

            <Item
              title="User Analytics"
              to="/analytics/users"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Post Analytics"
              to="/analytics/posts"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Comment Analytics"
              to="/analytics/comments"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Feedback Analytics"
              to="/analytics/feedbacks"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>

          {!isCollapsed ? (
            <div style={{
              margin: "10px 10px 20px 0",
              color: colors.grey[100],
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <ArrowBackIosNewIcon
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold"
                  }} />
              </IconButton>
            </div>
          ) :
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
              color: colors.grey[100],
            }}>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <ArrowForwardIosIcon
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold"
                  }} />
              </IconButton>
            </div>
          }

        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
