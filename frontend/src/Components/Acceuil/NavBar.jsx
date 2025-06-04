"use client";

import React from "react";

import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ellogo from "../../assets/ellogo.png";
import { LOGIN } from "../../router";
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
        href: "/docs/primitives/alert-dialog",
        description:
            "Thématiques de recherche explorées par LIMATI, en mathématiques fondamentales, appliquées et informatique.",
    },
    {
        title: "DOMAINES D'APPLICATION",
        href: "/docs/primitives/hover-card",
        description:
            "Champs dans lesquels les recherches du laboratoire sont appliquées : santé, finance, cybersécurité, etc.",
    },
    {
        title: "ACTION STRATEGIQUE CALCULÉ, DONNÉES, AI",
        href: "/docs/primitives/progress",
        description:
            "Axes stratégiques autour du calcul scientifique, de la science des données et de l'intelligence artificielle.",
    },
    {
        title: "DÉPARTEMENTS ET ÉQUIPES",
        href: "/docs/primitives/scroll-area",
        description:
            "Structuration du laboratoire en groupes de recherche selon les thématiques scientifiques.",
    },
    {
        title: "PLATEFORMES",
        href: "/docs/primitives/tabs",
        description:
            "Outils, infrastructures numériques et ressources technologiques utilisées dans les projets du laboratoire.",
    },
    {
        title: "PARTICIPATION GDR",
        href: "/docs/primitives/tooltip",
        description:
            "Engagement du LIMATI dans des Groupements De Recherche à l'échelle nationale.",
    },
];

const components2 = [
    {
        title: "STRUCTURES COMMUNES",
        href: "/docs/primitives/alert-dialog",
        description:
            "Structures mutualisées avec d'autres laboratoires ou institutions pour renforcer la recherche.",
    },
    {
        title: "ÉCOSYSTÈME PIA",
        href: "/docs/primitives/hover-card",
        description:
            "Projets et partenariats dans le cadre du Programme d'Investissements d'Avenir (PIA).",
    },
    {
        title: "GROUPEMENTS D'INTÉRÊT SCIENTIFIQUE (GIS)",
        href: "/docs/primitives/progress",
        description:
            "Partenariats structurants autour de problématiques scientifiques d'envergure nationale.",
    },
    {
        title: "GROUPEMENTS DE SERVICE (GDS)",
        href: "/docs/primitives/scroll-area",
        description:
            "Groupements offrant des services scientifiques partagés entre plusieurs laboratoires.",
    },
    {
        title: "PARTENARIATS INDUSTRIELS",
        href: "/docs/primitives/tabs",
        description:
            "Collaborations avec le secteur industriel pour l'innovation et le transfert technologique.",
    },
    {
        title: "PARTICIPATION GDR",
        href: "/docs/primitives/tooltip",
        description:
            "Adhésion à des réseaux de recherche (GDR) favorisant les échanges scientifiques.",
    },
    {
        title: "FINANCEURS PUBLICS",
        href: "/docs/primitives/tooltip",
        description:
            "Liste des institutions publiques finançant les projets du laboratoire.",
    },
    {
        title: "INTERNATIONAL",
        href: "/docs/primitives/tooltip",
        description:
            "Projets, partenariats et coopérations menés à l'échelle internationale.",
    },
];

const components4 = [
    {
        title: "LIMATI PARTENAIRE FORMATIONS",
        href: "/docs/primitives/alert-dialog",
        description:
            "Contribution du LIMATI à des formations universitaires ou spécialisées en mathématiques et informatique.",
    },
    {
        title: "FAIRE SON STAGE A LIMATI",
        href: "/docs/primitives/hover-card",
        description:
            "Opportunités de stages pour étudiants de licence, master ou écoles d'ingénieurs.",
    },
    {
        title: "FAIRE UN DOCTORAT A LIMATI",
        href: "/docs/primitives/progress",
        description:
            "Encadrement doctoral et sujets de thèse proposés au sein du laboratoire.",
    },
    {
        title: "ÉVÉNEMENTS",
        href: "/docs/primitives/scroll-area",
        description:
            "Colloques, séminaires, journées portes ouvertes et autres événements scientifiques organisés par LIMATI.",
    },
];

const components3 = [
    {
        title: "PUBLICATIONS",
        href: "/docs/primitives/alert-dialog",
        description:
            "Articles scientifiques, conférences, livres et autres publications du LIMATI.",
    },
    {
        title: "LOGICIELS",
        href: "/docs/primitives/hover-card",
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
        href: "/docs/installation",
        description:
            "Organisation de la direction, instances décisionnelles et missions principales du laboratoire.",
    },
    {
        title: "ORGANIGRAMME",
        href: "/docs/primitives/typography",
        description:
            "Schéma représentant la structure hiérarchique et fonctionnelle du LIMATI.",
    },
    {
        title: "LIMATI EN CHIFFRES",
        href: "/docs/primitives/typography",
        description:
            "Données clés : nombre de chercheurs, publications, projets, partenariats, etc.",
    },
    {
        title: "LIMATI S'ENGAGE",
        href: "/docs/primitives/typography",
        description:
            "Engagements du LIMATI en matière de science ouverte, éthique et développement durable.",
    },
    {
        title: "LE RAPPORT D'ACTIVITÉ DE LIMATI",
        href: "/docs/primitives/typography",
        description:
            "Bilan annuel des actions scientifiques, partenariales et pédagogiques du laboratoire.",
    },
    {
        title: "LE MAGAZINE NOIRE SUR BLANC (NSB)",
        href: "/docs/primitives/typography",
        description:
            "Magazine édité par le laboratoire : actualités, interviews, dossiers scientifiques.",
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
                        <img
                            src={ellogo}
                            alt="LIMATI Logo"
                            className="max-h-12"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu
                        className="hidden lg:block"
                        viewport={false}
                    >
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
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
                                <NavigationMenuTrigger>
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
                                <NavigationMenuTrigger>
                                    COLLABORATIONS
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components2.map((component, index) => (
                                            <ListItem
                                                key={index}
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
                                <NavigationMenuTrigger>
                                    PRODUCTIONS SCIENTIFIQUES
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components3.map((component, index) => (
                                            <ListItem
                                                key={index}
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
                                <NavigationMenuTrigger>
                                    FORMATION
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components4.map((component, index) => (
                                            <ListItem
                                                key={index}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="hidden items-center gap-4 lg:flex">
                        <Link
                            to={LOGIN}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium",
                                "bg-orange-600 dark:bg-teal-500",
                                "text-white dark:text-gray-900",
                                "hover:bg-orange-700 dark:hover:bg-teal-400",
                                "transition-colors duration-200",
                                "shadow-sm hover:shadow-md"
                            )}
                        >
                            Se connecter
                        </Link>
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
                                            src={ellogo}
                                            alt="LIMATI Logo"
                                            className="max-h-12"
                                        />
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

                                    <AccordionItem value="collaborations">
                                        <AccordionTrigger className="text-base hover:no-underline">
                                            COLLABORATIONS
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid gap-2">
                                                {components2.map(
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
