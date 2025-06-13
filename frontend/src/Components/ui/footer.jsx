import React from "react";
import logolimati from "../../assets/logos/realLimati.png"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import limati from "../../assets/footer/limati.png";
const defaultSections = [
    {
        title: "Contact",
        links: [
            { name: "Annuaire", href: "#" },
            { name: "Pour nous écrire", href: "#" },
            { name: "Accéder à l’IRIT", href: "#" },
            { name: "Déclaration de visites", href: "#" },
        ],
    },
    {
        title: "Liens utiles",
        links: [
            { name: "Présentation", href: "#" },
            { name: "Départements et équipes", href: "#" },
            { name: "Publications", href: "#" },
            { name: "Événements", href: "#" },
        ],
    },
    {
        title: "Navigation",
        links: [
            { name: "Accueil", href: "#" },
            { name: "Présentation", href: "#" },
            { name: "Toutes les actualités", href: "#" },
            { name: "Galerie", href: "#" },
        ],
    },
];

const defaultSocialLinks = [
    { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
    { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
    { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
    { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
];

const Footer2 = ({
    logo = {
        url: "/",
        src: logolimati,
        alt: "logo",
        title: "",
    },
    sections = defaultSections,
    description = "Le Laboratoire d’Innovation en Mathématiques et Applications et Technologies de l’Information (LIMATI)",
    socialLinks = defaultSocialLinks,
    copyright = "© 2025 limati. All rights reserved.",
    legalLinks = defaultLegalLinks,
}) => {
    return (
        <section className="pt-20 container mx-auto">
            <div className="container">
                <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
                    <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
                        {/* Logo */}
                        <div className="flex items-center gap-2 lg:justify-start">
                            <a href={logo.url}>
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    title={logo.title}
                                    className="h-16"
                                />
                            </a>
                            <h2 className="text-xl font-semibold">
                                {logo.title}
                            </h2>
                        </div>
                        <p className="max-w-[70%] text-sm text-muted-foreground">
                            {description}
                        </p>
                        <ul className="flex items-center space-x-6 text-muted-foreground">
                            {socialLinks.map((social, idx) => (
                                <li
                                    key={idx}
                                    className="font-medium hover:text-primary"
                                >
                                    <a
                                        href={social.href}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
                        {sections.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-4 font-bold">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="font-medium hover:text-primary"
                                        >
                                            <a href={link.href}>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-8 flex flex-col justify-between gap-4 border-t pt-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
                    <p className="order-2 lg:order-1">{copyright}</p>
                    <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
                        {legalLinks.map((link, idx) => (
                            <li key={idx} className="hover:text-primary">
                                <a href={link.href}> {link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* IMAGE LIMATI SANS MARGE */}
                <div className="mt-0 p-0 m-0 w-full">
                    <img
                        src={limati}
                        alt="limati"
                        className="m-0 p-0 w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Footer2;
