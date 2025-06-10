import {
    BookCheck,
    ChartColumnStacked,
    HandHelping,
    Users,
    Zap,
} from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrganigrammeChart } from "./charts/OrganigrammeChart";
import { ProjetsDeRechercheChart } from "./charts/ProjetsDeRechercheChart";
import { PublicationsRepartitions } from "./charts/PublicationsRepartitions";

const LimatiEnChiffreNav = ({
    heading = "LIMATI en chiffres",
    graph = <OrganigrammeChart />,
    features = [
        {
            icon: <ChartColumnStacked className="h-auto w-5" />,
            title: "Projets de recherche",
            description:
                "    de 25 projets nationaux et internationaux menés depuis la création du laboratoire.",
        },
        {
            icon: <Users className="h-auto w-5" />,
            title: "Chercheurs et doctorants",
            description:
                "Une équipe de 40+ membres, dont enseignants-chercheurs, doctorants et ingénieurs.",
        },
        {
            icon: <BookCheck className="h-auto w-5" />,
            title: "Publications scientifiques",
            description:
                "Plus de 150 articles publiés dans des revues et conférences de renommée.",
        },
    ],
}) => {
    return (
        <section className="py-32">
            <div className="container overflow-hidden">
                <div className="mb-20 flex flex-col items-center gap-6 text-center">
                    <h1 className="text-4xl font-semibold lg:text-5xl">
                        {heading}
                    </h1>
                </div>
                <div className="relative mx-auto max-w-5xl">{graph}</div>
                <div className="mx-auto mt-10 flex max-w-5xl flex-col md:flex-row">
                    {features.map((feature, index) => (
                        <React.Fragment key={feature.title}>
                            {index > 0 && (
                                <Separator
                                    orientation="vertical"
                                    className="mx-6 hidden h-auto w-[2px] bg-linear-to-b from-muted via-transparent to-muted md:block"
                                />
                            )}
                            <div
                                key={index}
                                className="flex grow basis-0 flex-col rounded-md bg-background p-4"
                            >
                                <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 font-semibold">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className="mt-10 flex flex-col md:flex-row gap-10 items-center justify-center">
                    <div className="w-[40rem]">
                        <ProjetsDeRechercheChart />
                    </div>
                    <div className="w-[40rem]">
                        <PublicationsRepartitions />
                    </div>
                </div>
            </div>
        </section>
    );
};

export { LimatiEnChiffreNav };
