import { Separator } from "@/components/ui/Separator";
import lg from '../../assets/ellogo.png'

const Footer2 = ({
    logo = {
        src: lg, // Remplace par ton vrai logo si besoin
        alt: "Logo LIMATI",
        title: "LIMATI",
        url: "/",
    },
    tagline = "Laboratoire d’Informatique, Mathématiques Appliquées et Technologies de l’Information – Université Sultan Moulay Slimane",
    menuItems = [
        {
            title: "Recherche",
            links: [
                { text: "Équipes de recherche", url: "/equipes" },
                { text: "Projets de recherche", url: "/projets" },
                { text: "Publications scientifiques", url: "/publications" },
            ],
        },
        {
            title: "Formation",
            links: [
                { text: "Sujets de thèse", url: "/theses" },
                { text: "Encadrements", url: "/encadrements" },
                { text: "Stages et mémoires", url: "/stages" },
            ],
        },
        {
            title: "À propos",
            links: [
                { text: "Présentation du laboratoire", url: "/presentation" },
                { text: "Membres enseignants", url: "/chercheurs" },
                { text: "Contact", url: "/contact" },
            ],
        },
        {
            title: "Liens utiles",
            links: [
                {
                    text: "Université Sultan Moulay Slimane",
                    url: "https://usms.ac.ma",
                },
                {
                    text: "Faculté des Sciences et Techniques",
                    url: "https://www.fstbm.ac.ma",
                },
                { text: "CNRST Maroc", url: "https://www.cnrst.ma" },
            ],
        },
    ],
    copyright = "© 2024 LIMATI - Université Sultan Moulay Slimane. Tous droits réservés.",
    bottomLinks = [
        { text: "Mentions légales", url: "/mentions-legales" },
        { text: "Politique de confidentialité", url: "/confidentialite" },
        { text: "Plan du site", url: "/plan-site" },
    ],
}) => {
    const isExternal = (url) => /^https?:\/\//.test(url);

    return (
        <section className="py-10 container mx-auto text-white">
            <div className="container ">
                <footer role="contentinfo" aria-label="Pied de page LIMATI">
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 mb-5">
                        <div className="col-span-2 mb-8 lg:mb-0">
                            <div className="flex items-center lg:justify-start">
                                <a href={logo.url}>
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        title={logo.title}
                                        className="w-40"
                                    />
                                </a>
                                <p className="text-xl font-semibold">
                                    {logo.title}
                                </p>
                            </div>
                            <p className="mt-4 font-bold">{tagline}</p>
                        </div>

                        {menuItems.map((section, sectionIdx) => (
                            <div key={sectionIdx} className="flex flex-col  justify-center">
                                <h3 className="mb-4 font-bold">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4 text-muted-foreground">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="font-medium hover:text-primary"
                                        >
                                            <a
                                                href={link.url}
                                                {...(isExternal(link.url) && {
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                })}
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="px-10">
                        <Separator className=" bg-gray-300 dark:bg-gray-300 px-10" />
                    </div>

                    <div className=" flex flex-col justify-between gap-4 pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
                        <p>{copyright}</p>
                        <ul className="flex gap-4">
                            {bottomLinks.map((link, linkIdx) => (
                                <li
                                    key={linkIdx}
                                    className="underline hover:text-primary"
                                >
                                    <a href={link.url}>{link.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Footer2;
