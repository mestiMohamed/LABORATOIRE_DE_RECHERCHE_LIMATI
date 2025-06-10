import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "../Components/ui/accordion";

const Feature73 = ({
    features = [
        {
            id: "feature-1",
            title: "QUI SOMMES-NOUS ?",
            description:
                "Le Laboratoire d’Innovation en Mathématiques et Applications et Technologies de l’Information (LIMATI) est une structure de recherche affiliée à FP-BM. Situé sur le campus de Beni Mellal, le LIMATI rassemble enseignants-chercheurs, ingénieurs et étudiants autour de projets interdisciplinaires mêlant mathématiques appliquées, informatique et technologies de l’information. Il s’inscrit dans une dynamique de recherche et d’innovation orientée vers les sciences du numérique et leurs applications concrètes. Le LIMATI contribue activement à la stratégie scientifique de l’établissement, en favorisant les synergies entre formation, recherche et transfert technologique dans le domaine des sciences exactes et de l’ingénierie.",
            image: "https://www.shadcnblocks.com/images/block/placeholder-1.svg",
        },
        {
            id: "feature-2",
            title: "QUE FAISONS NOUS ?",
            description:
                "Au LIMATI, nous menons des recherches en mathématiques appliquées et en informatique, en lien avec les technologies de l’information. Nos travaux visent à développer des solutions innovantes dans des domaines comme la modélisation, les systèmes intelligents, l’analyse de données et la cybersécurité, en collaboration avec des acteurs académiques et industriels.",
            image: "https://www.shadcnblocks.com/images/block/placeholder-2.svg",
        },
        {
            id: "feature-3",
            title: "Nos domaines d’application stratégiques",
            description:
                "Les recherches menées au LIMATI se concrétisent dans six domaines clés, au cœur des défis technologiques et sociétaux actuels : ",
            image: "https://www.shadcnblocks.com/images/block/placeholder-3.svg",
        },
    ],
}) => {
    return (
        <section className="">
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                {features[0] && (
                    <div className="flex flex-col overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
                        <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                            <img
                                src={features[0].image}
                                alt={features[0].title}
                                className="aspect-16/9 h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                            <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                                {features[0].title}
                            </h3>
                            <p className="text-muted-foreground lg:text-lg">
                                {features[0].description}
                            </p>
                        </div>
                    </div>
                )}
                <div className="flex flex-col overflow-clip rounded-xl border border-border">
                    <div>
                        <img
                            src={features[1].image}
                            alt={features[1].title}
                            className="aspect-16/9 h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                        <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                            {features[1].title}
                        </h3>
                        <p className="text-muted-foreground lg:text-lg">
                            {features[1].description}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col overflow-clip rounded-xl border border-border">
                    <div>
                        <img
                            src={features[2].image}
                            alt={features[2].title}
                            className="aspect-16/9 h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                        <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                            {features[2].title}
                        </h3>
                        <p className="text-muted-foreground lg:text-lg">
                            {features[2].description}
                            <Accordion type="single" collapsible>
                                <AccordionItem value="sante-autonomie-bien-etre">
                                    <AccordionTrigger>
                                        Santé, Autonomie, Bien-être
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Développement de systèmes intelligents
                                        et d’outils mathématiques pour améliorer
                                        la qualité de vie et l’autonomie des
                                        individus.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="ville-intelligente">
                                    <AccordionTrigger>
                                        Ville Intelligente
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Modélisation, optimisation et gestion
                                        des infrastructures urbaines pour des
                                        environnements plus durables et
                                        connectés.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="aeronautique-espace-transports">
                                    <AccordionTrigger>
                                        Aéronautique, Espace, Transports
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Simulation, calcul intensif et analyse
                                        de données pour améliorer la sécurité et
                                        la performance des systèmes complexes.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="medias-sociaux-diffusion-information">
                                    <AccordionTrigger>
                                        Médias sociaux numériques et diffusion
                                        de l’information
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Études des interactions et de la
                                        propagation de l’information dans les
                                        réseaux numériques.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="e-education">
                                    <AccordionTrigger>
                                        e-Education
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Conception de plateformes adaptatives et
                                        d’outils pédagogiques innovants
                                        favorisant l’apprentissage personnalisé.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="cybersecurite-securite">
                                    <AccordionTrigger>
                                        Cybersécurité, Sécurité des biens et des
                                        personnes
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Développement de méthodes avancées pour
                                        protéger les systèmes d’information et
                                        assurer la sécurité dans un monde
                                        numérique.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Feature73 };
