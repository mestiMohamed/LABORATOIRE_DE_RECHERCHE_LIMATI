import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import ChercheurDashboardLayout from "./LayOuts/ChercheurDashboardLayout.jsx";
import ChercheurDashboard from "./Components/Chercheur/ChercheurDashboard.jsx";

export const CHERCHEUR_DASHBOARD_ROUTE = "/chercheur/dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        element: <ChercheurDashboardLayout />,
        children: [
            {
                path: CHERCHEUR_DASHBOARD_ROUTE,
                element: <ChercheurDashboard />,
            },
        ],
    },
    {
        path: "*",
        element: <p>Not found</p>,
    },
]);

export default router;