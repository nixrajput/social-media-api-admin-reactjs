import { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ProSidebarProvider } from 'react-pro-sidebar';
import AdminRoute from "./helpers/AdminRoute";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  loadAuthDetailsAction,
  getProfileAction,
} from './redux/actions';

const LoginPage = lazy(() => import('./pages/auth/login/Index'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/forgot-password/Index'));
const ResetPasswordPage = lazy(() => import('./pages/auth/reset-password/Index'));
const NotFoundPage = lazy(() => import('./pages/not-found/Index'));
const DashboardPage = lazy(() => import('./pages/dashboard/Index'));
const UserListPage = lazy(() => import('./pages/users/Index'));
const UserDetailsPage = lazy(() => import('./pages/users/UserDetails'));
const PostListPage = lazy(() => import('./pages/posts/Index'));
const PostDetailsPage = lazy(() => import('./pages/posts/PostDetails'));

function App() {
  const [theme, colorMode] = useMode();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserDetails = async () => {
      if (auth.status === 'idle' || auth.status === 'failed') {
        const loadAuthDetailsPromise = loadAuthDetailsAction(dispatch);
        await loadAuthDetailsPromise;
      }

      if (auth.token && auth.status === 'authenticated') {
        const getProfilePromise = getProfileAction(dispatch, auth.token);
        await getProfilePromise;
      }
    }

    loadUserDetails();

    return () => { }

  }, [auth.token, auth.status, dispatch]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <ProSidebarProvider>
            <main className="content">
              <Suspense fallback={
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
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

                  <Route path="/users" element={<AdminRoute> <UserListPage /> </AdminRoute>} />
                  <Route path="/users/:id" element={<AdminRoute> <UserDetailsPage /> </AdminRoute>} />

                  <Route path="/posts" element={<AdminRoute> <PostListPage /> </AdminRoute>} />
                  <Route path="/posts/:id" element={<AdminRoute> <PostDetailsPage /> </AdminRoute>} />

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
          </ProSidebarProvider>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
