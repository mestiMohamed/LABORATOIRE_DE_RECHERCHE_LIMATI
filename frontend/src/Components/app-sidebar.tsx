import * as React from "react";
import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import {
  AudioWaveform,
  Command,
  Columns3Cog,
  Frame,
  GalleryVerticalEnd,
  NotebookPen,
  Users,
  BookText,
  FolderCog,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/Components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { NavProjects } from "./nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Type definitions
type Team = {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  plan: string;
};

type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  items?: Array<{
    title: string;
    url: string;
  }>;
};

type UserData = {
  name: string;
  email: string;
  avatar: string;
  is_chef_equipe?: boolean;
};

type SidebarData = {
  user: UserData;
  teams: Team[];
  navMain: NavItem[];
};

// Sample data with TypeScript typing
const data: SidebarData = {
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
      title: "Gestion des projets",
      url: "/chercheur/manage-projets",
      icon: Columns3Cog,
    },
    {
      title: "Gestion des publications scientifiques",
      url: "/chercheur/manage-publications",
      icon: NotebookPen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setUser } = useStateContext();
  const [navItems, setNavItems] = React.useState<NavItem[]>(data.navMain);

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, [setUser]);

  

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 top-[64px] h-[calc(100vh-64px)] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      {...props}
    >
      <SidebarHeader className="pt-4">
        <NavUser 
          name={user?.name || data.user.name}
          email={user?.email || data.user.email}
          avatar={user?.avatar || data.user.avatar}
        />
      </SidebarHeader>
      
      <SidebarContent className="mt-4">
  <NavMain items={navItems} />

  {user?.is_chef_equipe && (
    <NavProjects
      label="Espace Équipe"
      projects={[
        {
          name: "Gérer les membres",
          url: "/equipe/manage-members",
          icon: Users,
        },
        {
          name: "Projets de recherche",
          url: "/equipe/manage-projets",
          icon: FolderCog,
        },
      ]}
    />
  )}
</SidebarContent>
      
      <SidebarFooter className="pb-4">
        
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
}