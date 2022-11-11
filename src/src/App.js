import { useEffect, useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ProSidebarProvider } from 'react-pro-sidebar';
import AdminRoute from "./helpers/adminRoute";
import Team from "./scenes/team";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  loadAuthDetailsAction,
  getProfileAction,
  fetchUsers,
  getStatsAction,
} from './redux/actions';

const Login = lazy(() => import('./pages/auth/login'));
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'));
const ResetPassword = lazy(() => import('./pages/auth/reset-password'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    const loadUserDetails = async () => {
      if (auth.status === 'idle' || auth.status === 'unauthenticated') {
        await loadAuthDetailsAction(dispatch);
      }

      if (auth.status === 'authenticated' && auth.token) {
        await getProfileAction(dispatch, auth.token);
      }

      if (auth.token && auth.user && auth.status === 'userLoaded') {
        await getStatsAction(dispatch, auth.token);
        await fetchUsers(dispatch, auth.token);
      }
    }

    loadUserDetails();

    return () => { }

  }, [auth.token, dispatch, auth.status, auth.user]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {
          (auth.status === 'userLoaded' && auth.user && auth.user.role === 'admin') &&
          <Topbar setIsSidebar={setIsSidebar} />
        }
        <div className="app">
          <ProSidebarProvider>
            {
              (auth.status === 'userLoaded' && auth.user && auth.user.role === 'admin') &&
              <Sidebar isSidebar={isSidebar} />
            }
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
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                  <Route path="/auth/reset-password" element={<ResetPassword />} />
                  <Route path="/" element={<AdminRoute> <Dashboard /> </AdminRoute>} />
                  <Route path="/users" element={<AdminRoute> <Team /> </AdminRoute>} />
                  <Route path="*" element={<NotFound />} />
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
