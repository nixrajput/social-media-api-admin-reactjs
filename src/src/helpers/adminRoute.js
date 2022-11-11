import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const auth = useSelector((state) => state.auth);

    if (auth.status === 'userLoaded' && auth.token && auth.user &&
        auth.user.role === 'admin') {
        return children;
    }

    return <Navigate to="/auth/login" state={{ from: location }} />;

}

export default AdminRoute;