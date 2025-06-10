"use client";

import gojo from "../assets/1360490.jpeg";
import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import { Link, Navigate } from "react-router-dom";
import {
    CHERCHEUR_MANAGE_ACCOUNT_ROUTE,
    ADMIN_MANAGE_NOTIFICATIONS_ROUTE
} from "../router";

export function NavUser({}) {
    const { isMobile } = useSidebar();

    const { user, role,  setUser, setToken } = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get("/logout").then(({}) => {
            setUser(null);
            setToken(null);
        });
    };

    const accountRoute =
        role === "user"
            ? "/chercheur/account"
            : "/admin/account";
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={`http://localhost:8000/storage/${user.image}`}
                                    alt={`${user.firstname} ${user.lastname}`}
                                />

                                <AvatarFallback className="rounded-lg">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {user.firstname} {user.lastname}
                                </span>
                                <span className="truncate text-xs">
                                    {user.email}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={`http://localhost:8000/storage/${user.image}`}
                                        alt={`${user.firstname} ${user.lastname}`}
                                    />

                                    <AvatarFallback className="rounded-lg">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {user.firstname} {user.lastname}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link to={accountRoute}>
                                <DropdownMenuItem>
                                    <div className="flex items-center gap-2">
                                        <BadgeCheck />
                                        <div>Account</div>
                                    </div>
                                </DropdownMenuItem>
                            </Link>
                            <Link to={ADMIN_MANAGE_NOTIFICATIONS_ROUTE}>
                                <DropdownMenuItem>
                                    <Bell />
                                    Notifications
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={onLogout}
                            className="cursor-pointer"
                        >
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
