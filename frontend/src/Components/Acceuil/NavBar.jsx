"use client";

import React from "react";

import { LogIn, MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import sh1 from "../../assets/logos/sh1.png";
import { LOGIN, LOGIN_PAGE } from "../../router";
import { ModeToggle } from "../mode-toggle";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const components1 = [
    {
        title: "SUJETS SCIENTIFIQUES",
        href: "/sujets-scientifiques",
        description:
            "Thématiques de recherche explorées par LIMATI, en mathématiques fondamentales, appliquées et informatique.",
    },
    {
        title: "DOMAINES D'APPLICATION",
        href: "/domaines-dapplication",
        description:
            "Champs dans lesquels les recherches du laboratoire sont appliquées : santé, finance, cybersécurité, etc.",
    },
    {
        title: "DÉPARTEMENTS ET ÉQUIPES",
        href: "departements-et-equipes",
        description:
            "Structuration du laboratoire en groupes de recherche selon les thématiques scientifiques.",
    },
];

const components4 = [
    {
        title: "FAIRE SON STAGE A LIMATI",
        href: "/faire-son-stage-a-limati",
        description:
            "Opportunités de stages pour étudiants de licence, master ou écoles d'ingénieurs.",
    },
    {
        title: "FAIRE UN DOCTORAT A LIMATI",
        href: "/faire-un-doctorat-a-limati",
        description:
            "Encadrement doctoral et sujets de thèse proposés au sein du laboratoire.",
    },
    {
        title: "ÉVÉNEMENTS",
        href: "/événemnents",
        description:
            "Colloques, séminaires, journées portes ouvertes et autres événements scientifiques organisés par LIMATI.",
    },
];

const components3 = [
    {
        title: "PUBLICATIONS",
        href: "/publications",
        description:
            "Articles scientifiques, conférences, livres et autres publications du LIMATI.",
    },
    {
        title: "LOGICIELS",
        href: "/logiciels",
        description:
            "Outils et applications développés par les chercheurs dans le cadre des projets du laboratoire.",
    },
];

const labItems = [
    {
        title: "PRESENTATION",
        href: "/presentation-du-laboratoire",
        description:
            "Aperçu global du laboratoire LIMATI : sa mission, son positionnement scientifique et ses valeurs.",
    },
    {
        title: "DIRECTION, INSTANCES ET MISSIONS",
        href: "/directions-instances-missions",
        description:
            "Organisation de la direction, instances décisionnelles et missions principales du laboratoire.",
    },
    {
        title: "ORGANIGRAMME",
        href: "/organigramme",
        description:
            "Schéma représentant la structure hiérarchique et fonctionnelle du LIMATI.",
    },
    {
        title: "LIMATI EN CHIFFRES",
        href: "/limati-en-chiffre",
        description:
            "Données clés : nombre de chercheurs, publications, projets, partenariats, etc.",
    },
    {
        title: "LIMATI S'ENGAGE",
        href: "/limati-s-engage",
        description:
            "Engagements du LIMATI en matière de science ouverte, éthique et développement durable.",
    },
    {
        title: "LE RAPPORT D'ACTIVITÉ DE LIMATI",
        href: "/le-rapport-dactivite-de-limati",
        description:
            "Bilan annuel des actions scientifiques, partenariales et pédagogiques du laboratoire.",
    },
];

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

export function ResponsiveNavigationMenu() {
    return (
        <section className="py-4">
            <div className="container">
                <nav className="flex items-center justify-between gap-50">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={sh1} alt="LIMATI Logo" className="max-h-12" />
                        LIMATI
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu
                        className="hidden lg:block"
                        viewport={false}
                    >
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent font-semibold">
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
                                                        LIMATI
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Laboratoire d'Innovation
                                                        en Mathématiques
                                                        Appliquées et
                                                        Technologies de
                                                        l'Information
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        {labItems.map((item, index) => (
                                            <ListItem key={index}>
                                                <Link
                                                    to={item.href}
                                                    className="block"
                                                >
                                                    <div className="text-black font-semibold">
                                                        {item.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.description}
                                                    </div>
                                                </Link>
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent font-semibold">
                                    LA RECHERCHE
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components1.map((component, index) => (
                                            <ListItem key={index}>
                                                <Link
                                                    to={component.href}
                                                    className="block"
                                                >
                                                    <div className="text-black font-semibold">
                                                        {component.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {component.description}
                                                    </div>
                                                </Link>
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent font-semibold">
                                    PRODUCTIONS SCIENTIFIQUES
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components3.map((component, index) => (
                                            <ListItem key={index}>
                                                <Link
                                                    to={component.href}
                                                    className="block"
                                                >
                                                    <div className="text-black font-semibold">
                                                        {component.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {component.description}
                                                    </div>
                                                </Link>
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent font-semibold">
                                    FORMATION
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components4.map((component, index) => (
                                            <ListItem key={index}>
                                                <Link
                                                    to={component.href}
                                                    className="block"
                                                >
                                                    <div className="text-black font-semibold">
                                                        {component.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {component.description}
                                                    </div>
                                                </Link>
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="hidden items-center gap-4 lg:flex">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem className="">
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link
                                            to={LOGIN_PAGE}
                                            className="bg-transparent"
                                        >
                                            <div className="flex items-center gap-2 font-semibold">
                                                <LogIn />
                                                Se Connecter
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <ModeToggle />
                    </div>

                    {/* Mobile Navigation */}
                    <Sheet>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="outline" size="icon">
                                <MenuIcon className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="top"
                            className="max-h-screen overflow-auto"
                        >
                            <SheetHeader>
                                <SheetTitle>
                                    <Link
                                        to="/"
                                        className="flex items-center gap-2"
                                    >
                                        <img
                                            src={sh1}
                                            alt="LIMATI Logo"
                                            className="max-h-12"
                                        />
                                        LIMATI
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col p-4">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value="laboratoire">
                                        <AccordionTrigger className="text-base hover:no-underline">
                                            LE LABORATOIRE
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid gap-2">
                                                {labItems.map((item, index) => (
                                                    <a
                                                        key={index}
                                                        href={item.href}
                                                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                                    >
                                                        <div>
                                                            <p className="mb-1 font-semibold text-foreground">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="recherche">
                                        <AccordionTrigger className="text-base hover:no-underline">
                                            LA RECHERCHE
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid gap-2">
                                                {components1.map(
                                                    (item, index) => (
                                                        <a
                                                            key={index}
                                                            href={item.href}
                                                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                                        >
                                                            <div>
                                                                <p className="mb-1 font-semibold text-foreground">
                                                                    {item.title}
                                                                </p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="productions">
                                        <AccordionTrigger className="text-base hover:no-underline">
                                            PRODUCTIONS SCIENTIFIQUES
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid gap-2">
                                                {components3.map(
                                                    (item, index) => (
                                                        <Link
                                                            key={index}
                                                            to={item.href}
                                                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                                        >
                                                            <div>
                                                                <p className="mb-1 font-semibold text-foreground">
                                                                    {item.title}
                                                                </p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="formation">
                                        <AccordionTrigger className="text-base hover:no-underline">
                                            FORMATION
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid gap-2">
                                                {components4.map(
                                                    (item, index) => (
                                                        <a
                                                            key={index}
                                                            href={item.href}
                                                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                                        >
                                                            <div>
                                                                <p className="mb-1 font-semibold text-foreground">
                                                                    {item.title}
                                                                </p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                <div className="mt-6 flex flex-col gap-4">
                                    <Link
                                        to={LOGIN}
                                        className={cn(
                                            "px-4 py-2 rounded-md text-sm font-medium text-center",
                                            "bg-orange-600 dark:bg-teal-500",
                                            "text-white dark:text-gray-900",
                                            "hover:bg-orange-700 dark:hover:bg-teal-400",
                                            "transition-colors duration-200",
                                            "shadow-sm hover:shadow-md"
                                        )}
                                    >
                                        Se connecter
                                    </Link>
                                    <div className="flex justify-center">
                                        <ModeToggle />
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </section>
    );
}
