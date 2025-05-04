import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import ChercheurDashboardLayout from "./LayOuts/ChercheurDashboardLayout.jsx";
import ChercheurDashboard from "./Components/Chercheur/ChercheurDashboard.jsx";
import AdminDashboardLayout from "./LayOuts/AdminDashboardLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminDashboard from "./LayOuts/Admin/AdminDashboard.jsx";
import ManageEvents from "./LayOuts/Admin/ManageEvents.jsx";
import ManageChercheurs from "./LayOuts/Admin/ManageChercheurs.jsx";

const ADMIN_BASE_ROUTE = '/admin';
export const CHERCHEUR_DASHBOARD_ROUTE = "/chercheur/dashboard";
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE+"/dashboard";
export const ADMIN_MANAGE_EVENTS_ROUTE = ADMIN_BASE_ROUTE+"/manage-events";
export const ADMIN_MANAGE_CHERCHEURS_ROUTE = ADMIN_BASE_ROUTE+"/manage-chercheurs";


const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    },
    {
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [
            {
                element: <ChercheurDashboardLayout />,
                children: [
                    {
                        path: CHERCHEUR_DASHBOARD_ROUTE,
                        element: <ChercheurDashboard />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
            {
                element: <AdminDashboardLayout />,
                children: [
                    {
                        path: ADMIN_DASHBOARD_ROUTE,
                        element: <AdminDashboard />, // remplace peut-être par AdminDashboard ?
                    },
                    {
                        path: ADMIN_MANAGE_EVENTS_ROUTE,
                        element: <ManageEvents />, // remplace peut-être par AdminDashboard ?
                    },
                    {
                        path: ADMIN_MANAGE_CHERCHEURS_ROUTE,
                        element: <ManageChercheurs />, // remplace peut-être par AdminDashboard ?
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <p>Not found</p>,
    },
]);

export default router;
