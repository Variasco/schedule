import { Navigate } from "react-router-dom";

export const PublicRoute = ({ isAuth, to = "/", children }) => {
    return !isAuth ? children : <Navigate to={to} replace />;
};

export const PrivateRoute = ({ isAuth, to = "/sign-in", children }) => {
    return !!isAuth ? children : <Navigate to={to} replace />;
};

export const AuthProvider = () => {};
