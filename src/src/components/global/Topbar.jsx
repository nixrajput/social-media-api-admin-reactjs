import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from '../../redux/slices/authSlice';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();

  // window.addEventListener("scroll", function () {
  //   if (window.scrollY > 40) {
  //     setScolled(true);
  //   } else {
  //     setScolled(false);
  //   }
  // });

  const logoutUser = () => {
    dispatch(logout());
  }

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      height={{ xs: "80px", sm: "80px", md: "80px", lg: "80px" }}
      bgcolor={colors.primary[500]}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      zIndex="1000"
    >

      {/* LOGO */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img
          alt="logo"
          width="auto"
          height='48px'
          src={`../../logo.png`}
        />
      </Box>

      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="4px"
        height={{ xs: "40px", sm: "40px", md: "40px", lg: "40px" }}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={logoutUser}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
