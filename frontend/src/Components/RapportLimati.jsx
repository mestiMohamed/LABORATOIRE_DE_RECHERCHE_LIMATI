"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const RapportLimati = ({
    heading = "Rapport d’Activité du Laboratoire LIMATI",
    desc = "e Laboratoire LIMATI (Laboratoire d’Informatique, de Mathématiques et de leurs Applications et Technologies Innovantes) publie chaque année un rapport d’activité retraçant les principales réalisations scientifiques, projets de recherche, publications, collaborations et événements marquants. Ces rapports sont une vitrine du dynamisme du laboratoire et de l'engagement de ses équipes dans la recherche scientifique et l'innovation.",
    items = [
        {
            id: "item-1",
            title: "L’édition de 2021",
            summary:
                "Rapport d'activité 2021",
            url: "#",
            image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
        },
        {
            id: "item-2",
            title: "L’édition de 2022",
            summary:
                "Rapport d'activité 2022",
            url: "#",
            image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
        },
        {
            id: "item-3",
            title: "L’édition de 2023",
            summary:
                "Rapport d'activité 2023",
            url: "#",
            image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
        },
        {
            id: "item-4",
            title: "L’édition de 2024",
            summary:
                "Rapport d'activité 2024",
            url: "#",
            image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
        },
        {
            id: "item-5",
            title: "L’édition de 2025",
            summary:
                "Rapport d'activité 2025",
            url: "#",
            image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
        },
    ],
}) => {
    const [carouselApi, setCarouselApi] = useState();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    useEffect(() => {
        if (!carouselApi) {
            return;
        }
        const updateSelection = () => {
            setCanScrollPrev(carouselApi.canScrollPrev());
            setCanScrollNext(carouselApi.canScrollNext());
        };
        updateSelection();
        carouselApi.on("select", updateSelection);
        return () => {
            carouselApi.off("select", updateSelection);
        };
    }, [carouselApi]);
    return (
        <section className="py-32">
            <div className="container">
                <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
                    <div>
                        <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                            {heading}
                        </h2>
                        <p className="text-muted-foreground/80">
                            Le Laboratoire LIMATI (Laboratoire d’Informatique, de
                            Mathématiques et de leurs Applications et
                            Technologies Innovantes) publie chaque année un
                            rapport d’activité retraçant les principales
                            réalisations scientifiques, projets de recherche,
                            publications, collaborations et événements
                            marquants.
                            <br />
                             Ces rapports sont une vitrine du
                            dynamisme du laboratoire et de l'engagement de ses
                            équipes dans la recherche scientifique et
                            l'innovation.
                        </p>
                    </div>
                    <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => {
                                carouselApi?.scrollPrev();
                            }}
                            disabled={!canScrollPrev}
                            className="disabled:pointer-events-auto"
                        >
                            <ArrowLeft className="size-5" />
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => {
                                carouselApi?.scrollNext();
                            }}
                            disabled={!canScrollNext}
                            className="disabled:pointer-events-auto"
                        >
                            <ArrowRight className="size-5" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-full">
                <Carousel
                    setApi={setCarouselApi}
                    opts={{
                        breakpoints: {
                            "(max-width: 768px)": {
                                dragFree: true,
                            },
                        },
                    }}
                    className="relative w-full max-w-full md:left-[-1rem]"
                >
                    <CarouselContent className="hide-scrollbar w-full max-w-full md:-mr-4 md:ml-8 2xl:mr-[max(0rem,calc(50vw-700px-1rem))] 2xl:ml-[max(8rem,calc(50vw-700px+1rem))]">
                        {items.map((item) => (
                            <CarouselItem
                                key={item.id}
                                className="ml-8 md:max-w-[452px]"
                            >
                                <a
                                    href={item.url}
                                    className="group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex aspect-3/2 overflow-clip rounded-xl">
                                            <div className="flex-1">
                                                <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                                        {item.title}
                                    </div>
                                    <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                                        {item.summary}
                                    </div>
                                    <div className="flex items-center text-sm">
                                        Télécharger{" "}
                                        <ArrowDown className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </a>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export { RapportLimati };
