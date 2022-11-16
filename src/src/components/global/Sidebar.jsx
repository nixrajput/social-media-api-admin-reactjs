import { useState, useEffect } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
import Avatar from "./Avatar";

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
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    window.addEventListener('load', () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      }
      else {
        setIsCollapsed(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
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
  }, []);

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
                <Avatar
                  avatar={auth.user?.avatar}
                  size="100px"
                />

                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {auth.user?.fname + " " + auth.user?.lname}
                  </Typography>

                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {'@' + auth.user?.uname}
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

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Posts"
              to="/posts"
              icon={<ListAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Comments"
              to="/comments"
              icon={<CommentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
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
