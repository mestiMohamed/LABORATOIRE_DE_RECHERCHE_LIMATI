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
  GaugeIcon,
  BadgeCheck,
  LogOut,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/Components/nav-user";
import { NavProjects } from "./nav-projects";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem ,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

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
      title: "Tableau de bord",
      url: "/chercheur/tableau-de-bord",
      icon: GaugeIcon,
    },
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
    {
      title: "Compte & paramétre",
      url: "chercheur/account",
      icon: BadgeCheck,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setUser, setToken } = useStateContext();
  const [navItems, setNavItems] = React.useState<NavItem[]>(data.navMain);

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, [setUser]);

  const onLogout = (ev) => {
          ev.preventDefault();
          axiosClient.get("/logout").then(({}) => {
              setUser(null);
              setToken(null);
          });
      };

  

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 h-[100vh] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      {...props}
    >
      <SidebarHeader className="pt-8">
        <NavUser 
          name={user?.name || data.user.name}
          email={user?.email || data.user.email}
          avatar={user?.avatar || data.user.avatar}
        />
      </SidebarHeader>
      
      <SidebarContent className="mt-4">
        <NavMain items={navItems} />

        {user.is_chef_equipe == 1 && (
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
  <SidebarMenu>
    <SidebarMenuItem>
      <Button
        onClick={onLogout}
        className="w-full text-left px-4  text-sm  rounded-md flex items-center cursor-pointer"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Déconnexion</span>
      </Button>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>

      
      <SidebarRail />
    </Sidebar>
  );
}