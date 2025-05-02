import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../src/Contexts/ContextProvider";

function ProtectedRoute({ allowedRoles }) {
    const { token, role } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        // Rediriger vers une page d'erreur ou dashboard par défaut
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
