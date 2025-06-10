import {
    BookOpen,
    Building2,
    DollarSign,
    HeartPulse,
    Lock,
    MessagesSquare,
    PersonStanding,
    Rocket,
    Share2,
    Timer,
    Zap,
    ZoomIn,
} from "lucide-react";

const DomaineDapp = ({
    heading = "Domaines d’application stratégiques",
    subheading = "Features",
    features = [
        {
            title: "Santé",
            description:
                "Modèles mathématiques et IA pour diagnostics médicaux et dispositifs médicaux intelligents.",
            icon: <HeartPulse className="size-4 md:size-6" />,
        },
        {
            title: "Ville intelligente",
            description:
                "Algorithmes d'optimisation pour la gestion urbaine et les réseaux intelligents.",
            icon: <Building2 className="size-4 md:size-6" />,
        },
        {
            title: "Aérospatial & Transports",
            description:
                "Solutions certifiées pour la navigation autonome et l'analyse des données de transport.",
            icon: <Rocket className="size-4 md:size-6" />,
        },
        {
            title: "Médias sociaux",
            description:
                "Analyse des réseaux et détection des fausses informations par méthodes mathématiques.",
            icon: <Share2 className="size-4 md:size-6" />,
        },
        {
            title: "e-Éducation",
            description:
                "Systèmes d'apprentissage adaptatif et génération automatique de contenus pédagogiques.",
            icon: <BookOpen className="size-4 md:size-6" />,
        },
        {
            title: "Cybersécurité",
            description:
                "Protocoles cryptographiques avancés et protection des infrastructures critiques.",
            icon: <Lock className="size-4 md:size-6" />,
        },
    ],
}) => {
    return (
        <section className="py-32">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
                    {heading}
                </h2>
                <p className="md:pl-5 text-muted-foreground/80 text-xl mt-5">
                    Le Laboratoire LIMATI se distingue par la diversité et la
                    pertinence des domaines dans lesquels ses recherches ont un
                    impact direct. Grâce à notre expertise en Mathématiques
                    appliquées et en Technologies de l’Information, nous sommes
                    engagés dans des applications innovantes au service de
                    secteurs stratégiques. Ces domaines d’application incluent,
                    mais ne se limitent pas à :
                </p>
                <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
                    {features.map((feature, idx) => (
                        <div
                            className="flex gap-6 rounded-lg md:block md:p-5"
                            key={idx}
                        >
                            <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                                {feature.icon}
                            </span>
                            <div>
                                <h3 className="font-medium md:mb-2 md:text-xl">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground md:text-base">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { DomaineDapp };
