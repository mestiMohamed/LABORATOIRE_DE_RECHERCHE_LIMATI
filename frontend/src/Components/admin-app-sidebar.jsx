import * as React from "react";

import { Button } from "./ui/button";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { GraduationCapIcon, UserIcon } from "lucide-react";
import { ADMIN_MANAGE_EVENTS_ROUTE } from "../router";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/Components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";

import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    PlusCircleIcon,
} from "lucide-react";
import { SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
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
            <SidebarHeader className="pt-4">
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent className="mt-4 space-y-4">
                <div className="px-4">
                    {" "}
                    {/* Ajout d'un conteneur avec padding */}
                    <Link to={ADMIN_MANAGE_EVENTS_ROUTE}>
                        <Button
                            className="w-full flex items-center justify-start"
                            variant="outline"
                            onClick={() => console.log("Créer un événement")}
                        >
                            <PlusCircleIcon className="mr-2" />
                            <span className="hidden md:inline">
                                Créer un événement
                            </span>
                        </Button>
                    </Link>
                </div>
            </SidebarContent>

            <SidebarFooter className="pb-4">
                <NavUser />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
