import { useEffect, useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ProSidebarProvider } from 'react-pro-sidebar';
import AdminRoute from "./helpers/adminRoute";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  loadAuthDetailsAction,
  getProfileAction,
} from './redux/actions';

const Login = lazy(() => import('./pages/auth/login'));
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'));
const ResetPassword = lazy(() => import('./pages/auth/reset-password'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Users = lazy(() => import('./pages/users'));

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loadUserDetails = async () => {
    const loadAuthDetailsPromise = loadAuthDetailsAction(dispatch);

    if (auth.status === 'idle') {
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
                  <Route path="/users" element={<AdminRoute> <Users /> </AdminRoute>} />
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
