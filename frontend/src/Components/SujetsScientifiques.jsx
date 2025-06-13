import { Separator } from "@/components/ui/separator";

import sj1 from "../assets/sujets/sj1.jpg"
import sj2 from "../assets/sujets/sj2.jpg"
import sj3 from "../assets/sujets/sj3.jpg"
import sj4 from "../assets/sujets/sj4.jpg"
import sj5 from "../assets/sujets/sj5.jpg"

const SujetsScientifiquesNav = () => {
    return (
        <section className="py-32">
            <div className="container">
                <div className="flex flex-col gap-6 text-center">
                    <p className="font-medium">
                        Notre laboratoire structure ses recherches autour de 5
                        piliers interdisciplinaires, à l’intersection des
                        mathématiques, de l’informatique et des technologies
                        émergentes :
                    </p>
                    <h2 className="text-4xl font-medium md:text-5xl">
                        Axes Scientifiques du LIMATI
                    </h2>
                </div>
                <div className="mt-20">
                    <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
                        <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:pr-16 xl:pr-24">
                            <img
                                src={sj1}
                                alt="placeholder"
                                className="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover"
                            />
                            <div className="flex h-full flex-col justify-between gap-10">
                                <q className="sm:text-xl">
                                    Développement de modèles numériques
                                    innovants (EDP, systèmes dynamiques)
                                    appliqués à la biomédecine, l’énergie ou la
                                    finance quantitative.
                                </q>
                                <div className="flex items-end gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-semibold text-primary">
                                            Modélisation & Simulation Haute
                                            Performance
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-20" />
                    <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
                        <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:pr-16 xl:pr-24">
                            <img
                                src={sj2}
                                alt="placeholder"
                                className="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover"
                            />
                            <div className="flex h-full flex-col justify-between gap-10">
                                <q className="sm:text-xl">
                                    Conception d’interfaces cognitives et
                                    systèmes adaptatifs, combinant traitement du
                                    langage naturel et mathématiques discrètes.
                                </q>
                                <div className="flex items-end gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-semibold text-primary">
                                            Interactions Homme-Machine
                                            Intelligentes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-20" />
                    <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
                        <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:pr-16 xl:pr-24">
                            <img
                                src={sj3}
                                alt="placeholder"
                                className="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover"
                            />
                            <div className="flex h-full flex-col justify-between gap-10">
                                <q className="sm:text-xl">
                                    Cryptographie post-quantique, protocoles
                                    sécurisés, et théorie de l’information pour
                                    les systèmes distribués.
                                </q>
                                <div className="flex items-end gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-semibold text-primary">
                                            Cybersécurité et Calcul Quantique
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-20" />
                    <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
                        <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:pr-16 xl:pr-24">
                            <img
                                src={sj4}
                                alt="placeholder"
                                className="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover"
                            />
                            <div className="flex h-full flex-col justify-between gap-10">
                                <q className="sm:text-xl">
                                    De la donnée brute à la décision
                                    intelligente : méthodes formelles, topologie
                                    des données, et architectures Big Data.
                                </q>
                                <div className="flex items-end gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-semibold text-primary">
                                            Ingénierie des Données et Fouille de
                                            Connaissances
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { SujetsScientifiquesNav };
