import * as React from "react";

import { Button } from "./ui/button";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { GraduationCapIcon, UserIcon } from "lucide-react";
import { ADMIN_MANAGE_EVENTS_ROUTE } from "../router";

// This is sample data.
const data = {};

export function AdminAppSidebar({ ...props }) {
    return (
        <Sidebar
            collapsible="icon"
            className="fixed left-0 top-[64px] h-[calc(100vh-64px)] border-r"
            {...props}
        >
            <SidebarContent className="mt-4 space-y-4">
                <Link to={ADMIN_MANAGE_EVENTS_ROUTE}>
                    <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => console.log("Créer un événement")}
                    >
                        Créer un évènement
                    </Button>
                </Link>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
