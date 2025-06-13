import { Separator } from "@/components/ui/separator";
import axiosClient from "../axiosClient";
import { useState, useEffect } from "react";
import pub1 from "../assets/pubs/pub1.jpg";
import pub2 from "../assets/pubs/pub2.jpg";

const PubScientifiquesNav = () => {
    const [publications, setPublications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/publications/public?page=${currentPage}`)
            .then((res) => {
                setPublications(res.data.data);
                setLastPage(res.data.meta.last_page);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [currentPage]);

    return (
        <section className="py-32">
            <div className="container">
                <div className="flex flex-col gap-6 text-center">
                    <p className="font-medium">4500+ clients satisfaits</p>
                    <h2 className="text-4xl font-medium md:text-5xl">
                        De vrais résultats venant de vrais chercheurs
                    </h2>
                </div>

                <div className="mt-20">
                    <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
                        {/* Publication 1 */}
                        <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
                            <img
                                src={pub1}
                                alt="Publication 1"
                                className="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover"
                            />
                            <div className="flex h-full flex-col justify-between gap-10">
                                <q className="sm:text-xl">
                                    Un algorithme hybride d’optimisation basé
                                    sur les colonies de fourmis pour la
                                    planification des ressources dans le cloud
                                    computing.
                                </q>
                                <div className="flex items-end gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-semibold text-primary">
                                            Dr. Samir Bensaid
                                        </p>
                                        <p className="text-muted-foreground">
                                            Revue Algérienne d'Informatique -
                                            2023
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Statistiques */}
                        <div className="flex gap-10 self-center lg:flex-col">
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl font-medium text-primary sm:text-5xl">
                                    12
                                </p>
                                <p className="font-semibold text-primary">
                                    Citations
                                </p>
                                <p className="text-muted-foreground">
                                    Indexée par Google Scholar
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl font-medium text-primary sm:text-5xl">
                                    Q2
                                </p>
                                <p className="font-semibold text-primary">
                                    Quartile de la revue
                                </p>
                                <p className="text-muted-foreground">
                                    Impact modéré
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-20" />

                    <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
                        {/* Publication 2 */}
                        <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
                            <img
                                src={pub2}
                                alt="Publication 2"
                                className="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover"
                            />
                            <div className="flex h-full flex-col justify-between gap-10">
                                <q className="sm:text-xl">
                                    Méthodes de détection d’intrusion basées sur
                                    le machine learning pour les réseaux
                                    industriels : revue et perspectives.
                                </q>
                                <div className="flex items-end gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-semibold text-primary">
                                            Pr. Nadia Amrani
                                        </p>
                                        <p className="text-muted-foreground">
                                            Journal of Cybersecurity &
                                            Applications - 2024
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Statistiques */}
                        <div className="flex gap-10 self-center lg:flex-col">
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl font-medium text-primary sm:text-5xl">
                                    8
                                </p>
                                <p className="font-semibold text-primary">
                                    Recherches associées
                                </p>
                                <p className="text-muted-foreground">
                                    Sujets en cybersécurité
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl font-medium text-primary sm:text-5xl">
                                    2024
                                </p>
                                <p className="font-semibold text-primary">
                                    Année de publication
                                </p>
                                <p className="text-muted-foreground">
                                    Derniers travaux
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { PubScientifiquesNav };
