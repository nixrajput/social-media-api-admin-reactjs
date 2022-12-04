import { useState, useEffect } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorModeContext, tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { logoutAction } from '../../redux/actions';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const auth = useSelector((state) => state.auth);
  // const profileDetails = useSelector((state) => state.profileDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    const logoutPromise = logoutAction(dispatch);
    await logoutPromise;
  }

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => { });
    }
  }, []);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      height={{ xs: "80px", sm: "80px", md: "80px", lg: "80px" }}
      bgcolor={colors.background}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      m="0"
      zIndex="100"
      boxShadow={
        scrolled ?
          "10px 0 10px 20px rgba(0,0,0,0.1)"
          :
          "none"
      }
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
      {
        auth.status === 'authenticated' ?
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
          :
          null
      }

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        {
          auth.status === 'authenticated' ?
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            :
            null
        }

        {
          auth.status === 'authenticated' ?
            <>
              <IconButton
                id="user-button"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMenu}
              >
                <PersonOutlinedIcon />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'user-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    navigate('/profile');
                  }}
                >
                  Profile
                </MenuItem>

                <MenuItem
                  onClick={handleCloseMenu}
                >
                  Settings
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    logoutUser();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
            :
            null
        }
      </Box>
    </Box>
  );
};

export default Topbar;
