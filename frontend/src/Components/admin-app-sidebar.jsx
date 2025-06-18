import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import img from "../assets/logos/realLimati.png";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/Components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";

import {
    Atom,
    AtomIcon,
    BookText,
    Calendar1,
    CalendarCog,
    Columns3Cog,
    FolderCog,
    GaugeIcon,
    NotebookPen,
    Settings2,
    UserCog,
    Users,
} from "lucide-react";
import { SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Tableau de bord",
            url: "/admin/tableau-de-bord",
            icon: GaugeIcon,
        },
        {
            title: "Gestion des événements",
            url: "/admin/manage-events",
            icon: CalendarCog,
        },
        {
            title: "Gestion des chercheurs",
            url: "/admin/manage-chercheurs",
            icon: UserCog,
        },
        {
            title: "Gestion des equipes",
            url: "/admin/manage-equipes",
            icon: Users,
        },
        {
            title: "Gestion des projets",
            url: "/admin/manage-projets",
            icon: FolderCog,
        },
        {
            title: "Gestion des publications scientifiques",
            url: "/admin/manage-publications",
            icon: BookText,
        },
    ],
};

export function AdminAppSidebar({ ...props }) {
    return (
        <Sidebar
            collapsible="icon"
            className="fixed left-0 h-[100vh] border-r"
            {...props}
        >
            <SidebarHeader className="pt-8 flex justify-center items-center">
                <Link to="/">
                    <img src={img} alt="" className="w-40" />
                </Link>
            </SidebarHeader>
            <SidebarContent className="mt-4 space-y-4">
                <NavMain items={data.navMain} />
            </SidebarContent>

            <SidebarFooter className="mb-5">
                <div className="flex flex-col justify-center gap-2">
                    <ModeToggle className="w-full max-w-[200px]" />
                    <NavUser />
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
