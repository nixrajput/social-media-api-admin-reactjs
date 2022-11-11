import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ProSidebarProvider } from 'react-pro-sidebar';
import Login from "./pages/auth/login";
import AdminRoute from "./helpers/adminRoute";
import storage from "./utils/storage";
import {
  authenticating, authenticated,
  unauthenticated,
} from './redux/slices/authSlice';
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import NotFound from "./pages/not-found";
import Team from "./scenes/team";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar";
import {
  fetchProfileDetails,
  fetchUsers,
  fetchStatsProgress,
} from './redux/actions';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    const loadUserDetails = async () => {
      dispatch(authenticating());
      const data = storage.get('auth');
      if (!data || !data.token) {
        dispatch(unauthenticated());
      }
      else {
        dispatch(authenticated(data));
        if (auth.token) {
          await fetchProfileDetails(dispatch, auth.token);
          await fetchStatsProgress(dispatch, auth.token);
          await fetchUsers(dispatch, auth.token);
        }
      }
    }

    loadUserDetails();

    return () => { }

  }, [auth.token, dispatch]);

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
              <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/" element={<AdminRoute> <Dashboard /> </AdminRoute>} />
                <Route path="/users" element={<AdminRoute> <Team /> </AdminRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </ProSidebarProvider>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
