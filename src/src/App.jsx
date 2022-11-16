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
const PostListPage = lazy(() => import('./pages/posts/Index'));

function App() {
  const [theme, colorMode] = useMode();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loadUserDetails = async () => {
    const loadAuthDetailsPromise = loadAuthDetailsAction(dispatch);

    if (auth.status === 'idle' || auth.status === 'failed' || !auth.token) {
      await loadAuthDetailsPromise;
    }

    if (auth.status === 'authenticated' && auth.token) {
      const getProfilePromise = getProfileAction(dispatch, auth.token);
      await getProfilePromise;
    }
  }

  useEffect(() => {
    loadUserDetails();

    return () => { }

  }, [auth.token]);

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

                  <Route path="/posts" element={<AdminRoute> <PostListPage /> </AdminRoute>} />

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
