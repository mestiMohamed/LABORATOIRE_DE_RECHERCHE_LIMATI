import * as React from "react";
import { Link } from "react-router-dom";
import ellogo from  '../../assets/ellogo.png'

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
            "Axes stratégiques autour du calcul scientifique, de la science des données et de l’intelligence artificielle.",
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
            "Engagement du LIMATI dans des Groupements De Recherche à l’échelle nationale.",
    },
];

const components2 = [
    {
        title: "STRUCTURES COMMUNES",
        href: "/docs/primitives/alert-dialog",
        description:
            "Structures mutualisées avec d’autres laboratoires ou institutions pour renforcer la recherche.",
    },
    {
        title: "ÉCOSYSTÈME PIA",
        href: "/docs/primitives/hover-card",
        description:
            "Projets et partenariats dans le cadre du Programme d’Investissements d’Avenir (PIA).",
    },
    {
        title: "GROUPEMENTS D'INTÉRÊT SCIENTIFIQUE (GIS)",
        href: "/docs/primitives/progress",
        description:
            "Partenariats structurants autour de problématiques scientifiques d’envergure nationale.",
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
            "Collaborations avec le secteur industriel pour l’innovation et le transfert technologique.",
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
            "Projets, partenariats et coopérations menés à l’échelle internationale.",
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
            "Opportunités de stages pour étudiants de licence, master ou écoles d’ingénieurs.",
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

export function NavigationMenuDemo() {
    return (
        <>
            <div className="flex justify-between items-center gap-20">
                <div>
                    <Link
                        to="/"
                        className="text-4xl font-bold hover:text-primary transition-colors"
                    >
                        {/*<span className=" text-orange-600 dark:text-teal-400 transition-colors duration-200">
                            LIMA
                        </span>
                        <span className=" text-teal-400 dark:text-orange-600 transition-colors duration-200">
                            TI
                        </span>*/}

                        <img src={ellogo} alt="" className="w-25" />
                        
                    </Link>
                </div>
                <div>
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList className="flex justify-between gap-16">
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
                                                            Beautifully designed
                                                            components built
                                                            with Radix UI and
                                                            Tailwind CSS.
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <ListItem
                                                href="/docs"
                                                title="PRESENTATION"
                                            >
                                                Aperçu global du laboratoire
                                                LIMATI : sa mission, son
                                                positionnement scientifique et
                                                ses valeurs.
                                            </ListItem>
                                            <ListItem
                                                href="/docs/installation"
                                                title="DIRECTION, INSTANCES ET MISSIONS"
                                            >
                                                Organisation de la direction,
                                                instances décisionnelles et
                                                missions principales du
                                                laboratoire.
                                            </ListItem>
                                            <ListItem
                                                href="/docs/primitives/typography"
                                                title="ORGANIGRAMME"
                                            >
                                                Schéma représentant la structure
                                                hiérarchique et fonctionnelle du
                                                LIMATI.
                                            </ListItem>
                                            <ListItem
                                                href="/docs/primitives/typography"
                                                title="LIMATI EN CHIFFRES"
                                            >
                                                Données clés : nombre de
                                                chercheurs, publications,
                                                projets, partenariats, etc.
                                            </ListItem>
                                            <ListItem
                                                href="/docs/primitives/typography"
                                                title="LIMATI S'ENGAGE"
                                            >
                                                Engagements du LIMATI en matière
                                                de science ouverte, éthique et
                                                développement durable.
                                            </ListItem>
                                            <ListItem
                                                href="/docs/primitives/typography"
                                                title="LE RAPPORT D'ACTIVITÉ DE LIMATI"
                                            >
                                                Bilan annuel des actions
                                                scientifiques, partenariales et
                                                pédagogiques du laboratoire.
                                            </ListItem>
                                            <ListItem
                                                href="/docs/primitives/typography"
                                                title="LE MAGAZINE NOIRE SUR BLANC (NSB)"
                                            >
                                                Magazine édité par le
                                                laboratoire : actualités,
                                                interviews, dossiers
                                                scientifiques.
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
                            </div>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div>
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-3">
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
                            <NavigationMenuItem>
                                <div>
                                    <ModeToggle />
                                </div>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </>
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
