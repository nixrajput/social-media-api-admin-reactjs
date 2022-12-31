import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const auth = useSelector((state) => state.auth);

    if (auth.token && auth.status === 'authenticated') {
        return children;
    }

    return <Navigate to="/auth/login" state={{ from: location }} />;

}

export default AdminRoute;