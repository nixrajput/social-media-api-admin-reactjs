import { useEffect, lazy, Suspense, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ProSidebarProvider } from 'react-pro-sidebar';
import AdminRoute from "./helpers/AdminRoute";
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

const LoginPage = lazy(() => import('./pages/auth/login/Index'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/forgot-password/Index'));
const ResetPasswordPage = lazy(() => import('./pages/auth/reset-password/Index'));
const NotFoundPage = lazy(() => import('./pages/not-found/Index'));
const DashboardPage = lazy(() => import('./pages/dashboard/Index'));
const UserListPage = lazy(() => import('./pages/users/Index'));
const UserDetailsPage = lazy(() => import('./pages/users/UserDetails'));
const PostListPage = lazy(() => import('./pages/posts/Index'));
const PostDetailsPage = lazy(() => import('./pages/posts/PostDetails'));
const ProfilePage = lazy(() => import('./pages/profile/Index'));
const BlueTickRequestsListPage = lazy(() => import('./pages/verification-requests/Index'));

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
                  <Routes>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

                    <Route path="/" element={<AdminRoute> <DashboardPage /> </AdminRoute>} />

                    <Route path="/profile" element={<AdminRoute> <ProfilePage /> </AdminRoute>} />

                    <Route path="/users" element={<AdminRoute> <UserListPage /> </AdminRoute>} />
                    <Route path="/users/:id" element={<AdminRoute> <UserDetailsPage /> </AdminRoute>} />

                    <Route path="/posts" element={<AdminRoute> <PostListPage /> </AdminRoute>} />
                    <Route path="/posts/:id" element={<AdminRoute> <PostDetailsPage /> </AdminRoute>} />

                    <Route path="/verification-requests" element={<AdminRoute> <BlueTickRequestsListPage /> </AdminRoute>} />

                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
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
