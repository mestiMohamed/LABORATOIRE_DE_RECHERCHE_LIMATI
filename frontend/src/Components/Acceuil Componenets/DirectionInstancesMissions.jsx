import { useState, useEffect } from "react";
import { ResponsiveNavigationMenu } from "../Acceuil/NavBar.jsx";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer2 from "../../Components/ui/footer.jsx";


function DirectionInstanceMissions(props) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const controlsLeft = useAnimation();
    const controlsRight = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controlsLeft.start({ x: 0, opacity: 1 });
            controlsRight.start({ x: 0, opacity: 1 });
        }
    }, [inView, controlsLeft, controlsRight]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/25 backdrop-blur-sm shadow-sm"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto h-18 flex justify-center">
                    <ResponsiveNavigationMenu className="m-0 p-0" />
                </div>
            </header>

            <main className="pt-18">
                <section>
                    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800">
                        {/* Main Title */}
                        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">
                            <br />
                            <br />
                            Présentation
                        </h1>
                        <br />
                        {/* Subtitle */}
                        <h2 className="text-2xl font-semibold mb-6 text-center italic text-blue-700">
                            « L'humain et son environnement au cœur de
                            l'informatique »
                        </h2>
                        {/* Introduction Paragraph */}
                        <p className="mb-6 text-lg leading-relaxed">
                            <strong>
                                Le Laboratoire d'Informatique, de Mathématiques
                                Appliquées et des Technologies de l'Information
                                (LIMATI)
                            </strong>
                            , est une structure académique et scientifique
                            pluridisciplinaire fondée au début des années 2000
                            dans le but de promouvoir la recherche et
                            l'innovation dans les domaines clés de
                            l'informatique et des mathématiques appliquées.
                            Alliant rigueur théorique et approche expérimentale,
                            le LIMATI s'est imposé comme un pôle d'excellence en
                            matière de modélisation mathématique, d'intelligence
                            artificielle, de sécurité informatique, de calcul
                            scientifique et de traitement des données.
                        </p>{" "}
                        <br /> <br />


                        {/* Scientific Topics Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 text-blue-800">
                                Les grands sujets du laboratoire LIMATI :
                            </h3>
                            <br />

                            <div className="flex flex-wrap gap-8">
                                {/* First Column */}
                                <div className="flex-1 min-w-[300px]">
                                    <ul className="list-disc pl-6 space-y-2 text-gray-800">
                                        <li>
                                            Intelligence Artificielle &
                                            Apprentissage Automatique
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>Deep Learning</li>
                                                <li>NLP</li>
                                                <li>Computer Vision</li>
                                                <li>Reinforcement Learning</li>
                                            </ul>
                                        </li>

                                        <li>
                                            Science des Données & Big Data
                                            Analytics
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>Fouille de données</li>
                                                <li>Data Mining</li>
                                                <li>Visualisation</li>
                                                <li>Données Massives</li>
                                            </ul>
                                        </li>

                                        <li>
                                            Modélisation Mathématique &
                                            Simulation Numérique
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>
                                                    Équations différentielles
                                                </li>
                                                <li>Optimisation</li>
                                                <li>Calcul Scientifique</li>
                                            </ul>
                                        </li>

                                        <li>
                                            Cybersécurité & Cryptographie
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>Sécurité des réseaux</li>
                                                <li>Blockchain</li>
                                                <li>Protocoles sécurisés</li>
                                            </ul>
                                        </li>

                                        <li>
                                            Systèmes Distribués & Cloud
                                            Computing
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>
                                                    Architectures parallèles
                                                </li>
                                                <li>Edge Computing</li>
                                                <li>IoT</li>
                                            </ul>
                                        </li>

                                        <li>
                                            Informatique Théorique &
                                            Algorithmique
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>Complexité</li>
                                                <li>Graphes</li>
                                                <li>Logique</li>
                                                <li>Calcul Quantique</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>

                                {/* Second Column */}
                                <div className="flex-1 min-w-[300px]">
                                    <ul className="list-disc pl-6 space-y-2 text-gray-800">
                                        <li>
                                            Interaction Homme-Machine (IHM) &
                                            Réalité Virtuelle
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>UX/UI</li>
                                                <li>Interfaces cognitives</li>
                                                <li>Mixed Reality</li>
                                            </ul>
                                        </li>

                                        <li>
                                            Robotique & Systèmes Autonomes
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>Robotique mobile</li>
                                                <li>Drones</li>
                                                <li>Véhicules autonomes</li>
                                            </ul>
                                        </li>

                                        <li>
                                            Bio-informatique & Santé Numérique
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>Analyse génomique</li>
                                                <li>Imagerie médicale</li>
                                                <li>
                                                    Modèles épidémiologiques
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            Optimisation & Recherche
                                            Opérationnelle
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>
                                                    Optimisation combinatoire
                                                </li>
                                                <li>Logistique</li>
                                                <li>Réseaux intelligents</li>
                                            </ul>
                                        </li>

                                        <li>
                                            Traitement du Signal & Imagerie
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>
                                                    Reconnaissance de formes
                                                </li>
                                                <li>Compression</li>
                                                <li>Imagerie 3D</li>
                                            </ul>
                                        </li>

                                        <li>
                                            Informatique Durable (Green IT)
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>
                                                    Optimisation énergétique
                                                </li>
                                                <li>Calcul éco-responsable</li>
                                            </ul>
                                        </li>

                                        <li>
                                            Mathématiques Fondamentales
                                            <ul className="list-disc pl-6 space-y-1">
                                                <li>
                                                    Algèbre linéaire avancée
                                                </li>
                                                <li>Analyse fonctionnelle</li>
                                                <li>Topologie algébrique</li>
                                                <li>Théorie des nombres</li>
                                                <li>
                                                    Géométrie différentielle
                                                </li>
                                                <li>Probabilités avancées</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        {/* Application Domains Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 text-blue-800">
                                Domaines d'application stratégiques :
                            </h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Santé, Autonomie, Bien-être</li>
                                <li>Ville intelligente</li>
                                <li>Aéronautique, Espace, Transports</li>
                                <li>
                                    Média sociaux numériques et diffusion de
                                    l'information
                                </li>
                                <li>Éclatant</li>
                                <li>
                                    Cybersécurité, Sécurité des biens et des
                                    personnes
                                </li>
                            </ul>
                        </div>
                        <br />
                        <br />
                        {/* Strategic Action */}
                        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                            <h3 className="text-xl font-bold mb-2 text-blue-800">
                                Action stratégique :
                            </h3>
                            <ul className="list-disc pl-6">
                                <li>Calcul, Données, IA</li>
                            </ul>
                            <p className="mt-3 text-gray-700">
                                Le spectre de nos recherches est large, à la
                                mesure des effectifs de notre unité. Il permet
                                au laboratoire d'être un acteur incontournable
                                des recherches, théoriques et appliquées, en
                                Science des Données et du Calcul, qui trouvent
                                leur application dans la vie courante.
                            </p>
                        </div>
                        <br />
                        <br />
                        {/* Departments Section */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-blue-800">
                                Structure organisationnelle (7 départements) :
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {
                                        name: "ABN",
                                        desc: "Architecture, Systèmes, Réseaux",
                                        teams: 5,
                                    },
                                    {
                                        name: "CBO",
                                        desc: "Calcul Intensif, Simulation, Optimisation",
                                        teams: 2,
                                    },
                                    {
                                        name: "FBL",
                                        desc: "Fiabilité des Systèmes et des Logiciels",
                                        teams: 4,
                                    },
                                    {
                                        name: "GD",
                                        desc: "Gestion de Données",
                                        teams: 3,
                                    },
                                    {
                                        name: "IA",
                                        desc: "Intelligence Artificielle",
                                        teams: 3,
                                    },
                                    {
                                        name: "ICI",
                                        desc: "Intelligence Collective, Interaction",
                                        teams: 3,
                                    },
                                    {
                                        name: "BI",
                                        desc: "Signaux et Images",
                                        teams: 4,
                                    },
                                ].map((dept) => (
                                    <div
                                        key={dept.name}
                                        className="border p-3 rounded-lg hover:bg-blue-50"
                                    >
                                        <h4 className="font-bold">
                                            <span className="text-blue-600">
                                                Département {dept.name}
                                            </span>
                                            : {dept.desc}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {dept.teams} équipes
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                </section>

                <section className="bg-black">
                    <Footer2 />
                </section>
            </main>
        </>
    );
}

export default DirectionInstanceMissions;
