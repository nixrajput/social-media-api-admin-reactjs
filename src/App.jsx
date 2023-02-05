import { useEffect, Suspense, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ProSidebarProvider } from 'react-pro-sidebar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import {
  loadAuthDetailsAction,
  loadProfileDetailsAction,
  getProfileDetailsAction,
} from './redux/actions';
import storage from "./utils/storage";
import { SnackbarProvider } from "notistack";
import AppRoutes from "./AppRoutes";

function App() {
  const [theme, colorMode] = useMode();

  const auth = useSelector((state) => state.auth);
  const profileDetails = useSelector((state) => state.profileDetails);
  const dispatch = useDispatch();

  const snackbarRef = useRef(null);

  useEffect(() => {
    document.documentElement.lang = "en";

    const loadUserDetails = async () => {
      if (auth.status === 'idle') {
        const loadAuthDetailsPromise = loadAuthDetailsAction(dispatch);
        await loadAuthDetailsPromise;
      }

      if (auth.status === 'authenticated' && auth.token) {
        if (profileDetails.status === 'idle') {
          const data = storage.get('user');

          if (data) {
            const loadProfileDetailsPromise = loadProfileDetailsAction(dispatch);
            await loadProfileDetailsPromise;
          }
          else {
            const getProfileDetailsPromise = getProfileDetailsAction(dispatch, auth.token);
            await getProfileDetailsPromise;
          }
        }
      }
    }

    loadUserDetails();

    return () => { }

  }, [auth.token, auth.status, dispatch, profileDetails.status]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          autoHideDuration={3000}
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          ref={snackbarRef}
          action={(key) => (
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => snackbarRef.current.closeSnackbar(key)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        >
          <div className="app">
            <ProSidebarProvider >
              <main className="content">
                <Suspense fallback={
                  <Backdrop
                    sx={{
                      color: '#fff',
                      zIndex: (theme) => theme.zIndex.drawer + 1
                    }}
                    open={true}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                }>
                  <AppRoutes />
                </Suspense>
              </main>
            </ProSidebarProvider>
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
