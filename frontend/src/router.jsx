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
import ManageEquipes from "./LayOuts/Admin/ManageEquipes.jsx";
import ManageProjets from "./LayOuts/Admin/ManageProjets.jsx";
import ManagePublications from "./LayOuts/Admin/ManagePublications.jsx";
import Acceuil from "./views/Acceuil.jsx";
import ChercheurManageProjets from "./Components/Chercheur/ChercheurManageProjets.jsx";
import ChercheurChefManageMembers from "./Components/Chercheur/Chef/ChercheurChefManageMembers.jsx";
import ChercheurChefManageProjects from "./Components/Chercheur/Chef/ChercheurChefManageProjects.jsx";
import ChercheurManagePublications from "./Components/Chercheur/ChercheurManagePublications.jsx";
import PresentationDuLabo from "./Components/Acceuil Componenets/PresentationDuLabo.jsx";
import NotFound from "./views/NotFound.jsx";
import ChercheurManageAccount from "./Components/Chercheur/ChercheurManageAccount.jsx";
import DirectionsInstancesMissions from "./Components/Acceuil Componenets/DirectionsInstancesMissions.jsx";
import Organigramme from "./Components/Acceuil Componenets/Organigramme.jsx";
import LimatiEnChiffre from "./Components/Acceuil Componenets/LimatiEnChiffre.jsx";
import LimatiSengage from "./Components/Acceuil Componenets/LimatiSengage.jsx";
import RapportDactiviteLimati from "./Components/Acceuil Componenets/RapportDactiviteLimati.jsx";
import SujetsScientifiques from "./Components/Acceuil Componenets/SujetsScientifiques.jsx";
import DomainesDapplications from "./Components/Acceuil Componenets/DomainesDapplications.jsx";
import DepartementsEtEquipes from "./Components/Acceuil Componenets/DepartementEtEquipes.jsx";
import Publications from "./Components/Acceuil Componenets/Publications.jsx";
import Logiciels from "./Components/Acceuil Componenets/Logiciels.jsx";
import FaireStageEnLimati from "./Components/Acceuil Componenets/FaireStageEnLimati.jsx";
import FaireDoctoratLimati from "./Components/Acceuil Componenets/FaireDoctoratLimati.jsx";
import Evenements from "./Components/Acceuil Componenets/Evenements.jsx";

const ADMIN_BASE_ROUTE = "/admin";
const CHERCHEUR_BASE_ROUTE = "/chercheur";
const EQUIPE_BASE_ROUTE = "/equipe";
export const LOGIN_PAGE = '/login'
export const CHERCHEUR_DASHBOARD_ROUTE = "/chercheur/tableau-de-bord";
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE + "/tableau-de-bord";
export const ADMIN_MANAGE_EVENTS_ROUTE = ADMIN_BASE_ROUTE + "/manage-events";
export const ADMIN_MANAGE_CHERCHEURS_ROUTE =
    ADMIN_BASE_ROUTE + "/manage-chercheurs";
export const ADMIN_MANAGE_EQUIPES_ROUTE = ADMIN_BASE_ROUTE + "/manage-equipes";
export const ADMIN_MANAGE_PROJETS_ROUTE = ADMIN_BASE_ROUTE + "/manage-projets";
export const ADMIN_MANAGE_PUBLICATIONS_ROUTE =
    ADMIN_BASE_ROUTE + "/manage-publications";
export const ADMIN_MANAGE_ACCOUNT_ROUTE = ADMIN_BASE_ROUTE + "/account";
export const ADMIN_MANAGE_NOTIFICATIONS_ROUTE =
    ADMIN_BASE_ROUTE + "/notifications";

export const CHERCHEUR_MANAGE_ACCOUNT_ROUTE = ADMIN_BASE_ROUTE + "/account";
export const CHERCHEUR_MANAGE_NOTIFICATIONS_ROUTE =
    ADMIN_BASE_ROUTE + "/notifications";

export const CHERCHEUR_MANAGE_PUBLICATIONS_ROUTE =
    CHERCHEUR_BASE_ROUTE + "/manage-publications";
export const CHERCHEUR_MANAGE_PROJETS_ROUTE =
    CHERCHEUR_BASE_ROUTE + "/manage-projets";
export const CHERCHEUR_MANAGE_ACOUNT_ROUTE =
    CHERCHEUR_BASE_ROUTE + "/account";


// equipe

export const CHERCHEUR_CHEF_MANAGE_MEMBERS_ROUTE =
    EQUIPE_BASE_ROUTE + "/manage-members";
export const CHERCHEUR_MANAGE_PROJECTS_ROUTE =
    EQUIPE_BASE_ROUTE + "/manage-projets";

export const LOGIN = "/login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Acceuil />, // Accessible à tous
    },

    // hna fin ghadiri les pages
    
    {
        path: "/presentation-du-laboratoire",
        element: <PresentationDuLabo />
    },
    {
        path: "/directions-instances-missions",
        element: <DirectionsInstancesMissions />
    },
    {
        path: "/organigramme",
        element: <Organigramme />
    },
    {
        path: "/limati-en-chiffre",
        element: <LimatiEnChiffre />
    },
    {
        path: "/limati-s-engage",
        element: <LimatiSengage />
    },
    {
        path: "/le-rapport-dactivite-de-limati",
        element: <RapportDactiviteLimati />
    },
    {
        path: "/sujets-scientifiques",
        element: <SujetsScientifiques />
    },
    {
        path: "/domaines-dapplication",
        element: <DomainesDapplications />
    },
    {
        path: "/departements-et-equipes",
        element: <DepartementsEtEquipes />
    },
    {
        path: "/publications",
        element: <Publications />
    },
    {
        path: "/logiciels",
        element: <Logiciels />
    },
    {
        path: "/faire-son-stage-a-limati",
        element: <FaireStageEnLimati />
    },
    {
        path: "/faire-un-doctorat-a-limati",
        element: <FaireDoctoratLimati />
    },
    {
        path: "/événemnents",
        element: <Evenements />
    },

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
                    {
                        path: CHERCHEUR_MANAGE_PROJETS_ROUTE,
                        element: <ChercheurManageProjets />,
                    },
                    {
                        path: CHERCHEUR_MANAGE_PUBLICATIONS_ROUTE,
                        element: <ChercheurManagePublications />,
                    },
                    {
                        path: CHERCHEUR_MANAGE_ACOUNT_ROUTE,
                        element: <ChercheurManageAccount />,
                    },

                    // equipe management

                    {
                        path: CHERCHEUR_CHEF_MANAGE_MEMBERS_ROUTE,
                        element: <ChercheurChefManageMembers />,
                    },

                    {
                        path: CHERCHEUR_MANAGE_PROJECTS_ROUTE,
                        element: <ChercheurChefManageProjects />,
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
                    {
                        path: ADMIN_MANAGE_EQUIPES_ROUTE,
                        element: <ManageEquipes />, // remplace peut-être par AdminDashboard ?
                    },
                    {
                        path: ADMIN_MANAGE_PROJETS_ROUTE,
                        element: <ManageProjets />, // remplace peut-être par AdminDashboard ?
                    },
                    {
                        path: ADMIN_MANAGE_PUBLICATIONS_ROUTE,
                        element: <ManagePublications />, // remplace peut-être par AdminDashboard ?
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
