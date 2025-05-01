import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ChercheurDropdownMenuDemo } from "../LayOuts/drop-down-menu/ChercheurDropDownManu";
import { useStateContext } from "../Contexts/ContextProvider";
import { CHERCHEUR_DASHBOARD_ROUTE } from "../router";
import { Navigate } from "react-router-dom";
import { GaugeIcon } from "lucide-react";
import { ChercheurAdministrationSideBar } from "./Chercheur/Administration/ChercheurAdministrationSideBar";
import { ModeToggle } from "../Components/mode-toggle";
function ChercheurDashboardLayout(props) {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <header>
                <div className="items-center justify-between flex bg-opacity-90 px-12 py-4 mb-4 mx-auto">
                    <div className="text-2xl font-semibold inline-flex items-center">
                        LIMATI
                    </div>
                    <div>
                        <ul className="flex place-items-center">
                            <li className="ml-5 px-2 py-1">
                                <Link
                                    className={"flex"}
                                    to={CHERCHEUR_DASHBOARD_ROUTE}
                                >
                                    <GaugeIcon className={"mx-1"} />
                                    Dashboard
                                </Link>
                            </li>
                            <li className="ml-5 px-2 py-1">
                                <ChercheurDropdownMenuDemo />
                            </li>
                            <li className="ml-5 px-2 py-1">
                                <ModeToggle />
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <hr />
            <main className={"mx-auto px-10 space-y-4 py-4"}>
                <div className="flex">
                    <div className={"w-full md:w-1/4"}>
                        <ChercheurAdministrationSideBar />
                    </div>
                    <div className={"w-full md:w-3/4"}>
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
}

export default ChercheurDashboardLayout;
