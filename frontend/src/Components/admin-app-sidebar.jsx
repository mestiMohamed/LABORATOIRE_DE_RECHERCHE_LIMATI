import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";


import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/Components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";

import {
    Atom,
    AtomIcon,
    Calendar1,
    Columns3Cog,
    NotebookPen,
    Settings2,
    Users,
} from "lucide-react";
import { SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Gestion des événements",
            url: "/admin/manage-events",
            icon: Calendar1,
        },
        {
            title: "Gestion des chercheurs",
            url: "/admin/manage-chercheurs",
            icon: Atom,
        },
        {
            title: "Gestion des equipes",
            url: "/admin/manage-equipes",
            icon: Users,
        },
        {
            title: "Gestion des projets",
            url: "/admin/manage-projets",
            icon: Columns3Cog
        },
        {
            title: "Gestion des publications scientifiques",
            url: "/admin/manage-publications",
            icon: NotebookPen
        },
    ],
};

export function AdminAppSidebar({ ...props }) {
    return (
        <Sidebar
            collapsible="icon"
            className="fixed left-0 top-[64px] h-[calc(100vh-64px)] border-r"
            {...props}
        >
            <SidebarContent className="mt-4 space-y-4">
                <NavMain items={data.navMain} />
            </SidebarContent>

            <SidebarFooter className="pb-4">
                <NavUser />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
