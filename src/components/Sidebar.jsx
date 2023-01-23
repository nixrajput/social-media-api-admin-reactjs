import {
  Sidebar as ProSidebar,
  Menu, MenuItem,
  useProSidebar
} from "react-pro-sidebar";
import { Box, IconButton, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { tokens } from "../theme";
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
import SourceIcon from '@mui/icons-material/Source';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

const Item = ({ title, to, icon, active }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      onClick={() => {
        navigate(to);
      }}
      icon={icon}
      active={active}
      component="div"
    >
      <span
        style={{
          color: colors.primary[100],
        }}
      >
        {title}
      </span>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation();

  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <ProSidebar
      backgroundColor={colors.dialog}
      defaultCollapsed={true}
      width="240px"
      collapsedWidth="80px"
      rootStyles={{
        border: "none",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            return {
              color: colors.primary[100],
              backgroundColor: active ? colors.accent[500] : "transparent",
              '&:hover': {
                backgroundColor: colors.background,
              },
            }
          },
          icon: ({ level, active, disabled }) => ({
            color: colors.primary[100],
          }),
        }}
      >
        {/* Toggle Button */}
        {
          !collapsed ?
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              m="0.5rem 0.5rem 0 0"
            >
              <IconButton onClick={() => collapseSidebar()}>
                <ArrowBackIosNewIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            </Box>
            :
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              m="0.5rem 0 0.5rem 0"
            >
              <IconButton onClick={() => collapseSidebar()}>
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            </Box>
        }

        {/* Menu Items */}

        <Item
          title="Dashboard"
          to="/"
          icon={<HomeOutlinedIcon />}
          active={location.pathname === "/" || location.pathname === "/dashboard"}
        />

        <Item
          title="Users"
          to="/users"
          icon={<PeopleOutlinedIcon />}
          active={location.pathname === "/users" || location.pathname.includes("/users/")}
        />

        <Item
          title="Posts"
          to="/posts"
          icon={<ListAltOutlinedIcon />}
          active={location.pathname === "/posts" || location.pathname.includes("/posts/")}
        />

        <Item
          title="projects"
          to="/projects"
          icon={<SourceIcon />}
          active={location.pathname === "/projects" || location.pathname.includes("/projects/")}
        />

        <Item
          title="Verification Requests"
          to="/verification-requests"
          icon={<VerifiedOutlinedIcon />}
          active={location.pathname === "/verification-requests" || location.pathname.includes("/verification-requests/")}
        />

        <Item
          title="Auth Tokens"
          to="/auth-tokens"
          icon={<VpnKeyOutlinedIcon />}
          active={location.pathname === "/auth-tokens" || location.pathname.includes("/auth-tokens/")}
        />

        <Item
          title="FCM Tokens"
          to="/fcm-tokens"
          icon={<TokenOutlinedIcon />}
          active={location.pathname === "/fcm-tokens" || location.pathname.includes("/fcm-tokens/")}
        />

        {/* <Item
          title="Comments"
          to="/comments"
          icon={<CommentIcon />}
          active={location.pathname === "/comments" || location.pathname.includes("/comments/")}
        />

        <Item
          title="Notifications"
          to="/notifications"
          icon={<NotificationsOutlinedIcon />}
          active={location.pathname === "/notifications" || location.pathname.includes("/notifications/")}
        />

        <Item
          title="Login Info"
          to="/login-info"
          icon={<DevicesOutlinedIcon />}
          active={location.pathname === "/login-info" || location.pathname.includes("/login-info/")}
        /> */}

        {/* <Item
          title="User Reports"
          to="/reports/users"
          icon={<PersonOutlinedIcon />}
          active={location.pathname === "/reports/users" || location.pathname.includes("/reports/users/")}
        />

        <Item
          title="Post Reports"
          to="/reports/posts"
          icon={<CalendarTodayOutlinedIcon />}
          active={location.pathname === "/reports/posts" || location.pathname.includes("/reports/posts/")}
        />

        <Item
          title="Comment Reports"
          to="/reports/comments"
          icon={<CommentOutlinedIcon />}
          active={location.pathname === "/reports/comments" || location.pathname.includes("/reports/comments/")}
        />

        <Item
          title="Feedback Reports"
          to="/reports/feedbacks"
          icon={<HelpOutlineOutlinedIcon />}
          active={location.pathname === "/reports/feedbacks" || location.pathname.includes("/reports/feedbacks/")}
        />

        <Item
          title="User Analytics"
          to="/analytics/users"
          icon={<BarChartOutlinedIcon />}
          active={location.pathname === "/analytics/users" || location.pathname.includes("/analytics/users/")}
        />

        <Item
          title="Post Analytics"
          to="/analytics/posts"
          icon={<PieChartOutlineOutlinedIcon />}
          active={location.pathname === "/analytics/posts" || location.pathname.includes("/analytics/posts/")}
        />

        <Item
          title="Comment Analytics"
          to="/analytics/comments"
          icon={<TimelineOutlinedIcon />}
          active={location.pathname === "/analytics/comments" || location.pathname.includes("/analytics/comments/")}
        />

        <Item
          title="Feedback Analytics"
          to="/analytics/feedbacks"
          icon={<MapOutlinedIcon />}
          active={location.pathname === "/analytics/feedbacks" || location.pathname.includes("/analytics/feedbacks/")}
        /> */}
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
