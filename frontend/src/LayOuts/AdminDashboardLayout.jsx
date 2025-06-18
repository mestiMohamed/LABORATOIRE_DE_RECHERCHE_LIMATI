import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ChercheurDropdownMenuDemo } from "../LayOuts/drop-down-menu/ChercheurDropDownManu";
import { useStateContext } from "../Contexts/ContextProvider";
import { ADMIN_DASHBOARD_ROUTE, CHERCHEUR_DASHBOARD_ROUTE } from "../router";
import { Navigate } from "react-router-dom";
import { GaugeIcon } from "lucide-react";
import { ModeToggle } from "../Components/mode-toggle";
import { AppSidebar } from "../Components/app-sidebar";
import {AdminAppSidebar} from "../Components/admin-app-sidebar"
import logo from "../assets/logos/realLimati.png"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

function AdminDashboardLayout(props) {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex flex-col h-screen">
            {/* Contenu principal avec sidebar */}
            <div className="flex flex-1 overflow-hidden ">
                <SidebarProvider className="rounded-2xl">
                    {/* Sidebar fixe */}
                    <AdminAppSidebar />

                    {/* Zone de contenu scrollable */}
                    <div className="flex-1 overflow-auto">
                        <SidebarInset>
                            <header className="sticky top-0 z-40 bg-background flex h-16 items-center gap-2 px-4">
                                <div className="flex items-center gap-2">
                                    <SidebarTrigger className="-ml-1" />
                                    <Separator
                                        orientation="vertical"
                                        className="mr-2 h-4"
                                    />
                                </div>
                            </header>
                            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-10 px-15">
                                <Outlet />
                            </div>
                        </SidebarInset>
                    </div>
                </SidebarProvider>
            </div>
        </div>
    );
}

export default AdminDashboardLayout;
