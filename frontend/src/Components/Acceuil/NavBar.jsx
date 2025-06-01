import * as React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LOGIN } from "../../router";
import { ModeToggle } from "../mode-toggle";

const components1 = [
    {
        title: "SUJET SCIENTIFIQUES",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "DOMAINES D'PPLICATION",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "ACTION STRATEGIQUE CALCULE, DONNEES, AI",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "DEPARTEMENTS ET EQUIPES",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "PLATFORMES",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "PARTICIPATION GDR",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

const components2 = [
    {
        title: "STRUCTURES COMMUNES",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "ÉCOSYSTÈME PIA",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "GROUPEMENTS D'INTÉRÊT SCIENTI.(GIS)",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "GROUPEMENT DE SERVICE (GDS)",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "PARTENARIATS INDUSTRIEL",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "PARTICIPATION GDR",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
        title: "FINANCEURS PUBLICS",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
        title: "INTERNATIONAL",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];
const components4 = [
    {
        title: "LIMATI PARTENAIRE FORMATIONS",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "FAIRE SON STAGE A LIMATI",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "FAIRE UN DOCTORAT A LIMATI",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "EVENEMENTS",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
];
const components3 = [
    {
        title: "PUBLICATIONS",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "LOGICIELS",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
];

export function NavigationMenuDemo() {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList className="flex justify-between gap-16" >
                <div>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/"
                                className="text-6xl font-bold hover:text-primary transition-colors"
                            >
                                LIMATI
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </div>
                <div className="flex">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-white/20 data-[state=open]:bg-white/20">
                            LE LABORATOIRE
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                shadcn/ui
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Beautifully designed components
                                                built with Radix UI and Tailwind
                                                CSS.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/docs" title="PRESENTATION">
                                    Re-usable components built using Radix UI
                                    and Tailwind CSS.
                                </ListItem>
                                <ListItem
                                    href="/docs/installation"
                                    title="DIRECTION, INSTANCES ET MISSIONS"
                                >
                                    How to install dependencies and structure
                                    your app.
                                </ListItem>
                                <ListItem
                                    href="/docs/primitives/typography"
                                    title="ORGANIGRAMME"
                                >
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                                <ListItem
                                    href="/docs/primitives/typography"
                                    title="LIMATI EN CHIFFRES"
                                >
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                                <ListItem
                                    href="/docs/primitives/typography"
                                    title="LIMATI S'ENGAGE"
                                >
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                                <ListItem
                                    href="/docs/primitives/typography"
                                    title="LE RAPPORT D'ACTIVITE DE LIMATI"
                                >
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                                <ListItem
                                    href="/docs/primitives/typography"
                                    title="LE MAGAZINE NOIRE SUR BLAC (NSB)"
                                >
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-white/20 data-[state=open]:bg-white/20">
                            LA RECHERCHE
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components1.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-white/20 data-[state=open]:bg-white/20">
                            COLLABORATIONS
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components2.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-white/20 data-[state=open]:bg-white/20">
                            PRODUCTIONS SCIENTIFIQUES
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components3.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-white/20 data-[state=open]:bg-white/20">
                            FORMATION
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components4.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="ml-4">
                        <NavigationMenuLink asChild>
                            <Link
                                to={LOGIN}
                                className={cn(
                                    "px-4 py-2 rounded-md text-sm font-medium",
                                    "bg-orange-600 dark:bg-teal-500", // Fond orange vif/bleu-vert
                                    "text-white dark:text-gray-900", // Texte contrasté
                                    "hover:bg-orange-700 dark:hover:bg-teal-400", // Hover légèrement plus foncé/clair
                                    "transition-colors duration-200",
                                    "shadow-sm hover:shadow-md"
                                )}
                            >
                                Se connecter
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </div>
                <div>
                    <ModeToggle />
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">
                            {title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";
