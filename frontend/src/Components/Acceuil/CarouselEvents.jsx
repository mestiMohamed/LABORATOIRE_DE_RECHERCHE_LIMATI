import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import AI from "../../assets/images_d'acceuil/2025.png";

export function CarouselEvents() {
    const events = [
        {
            title: "Conférence IA 2025",
            image: AI,
            date: "12 Juin 2025",
            description:
                "Un événement sur les dernières innovations en intelligence artificielle.",
        },
        {
            title: "Hackathon Étudiant",
            image: AI,
            date: "5 Juillet 2025",
            description:
                "24h pour résoudre des défis technologiques en équipe.",
        },
        {
            title: "Séminaire Cybersécurité",
            image: AI,
            date: "20 Août 2025",
            description:
                "Présentation des travaux de recherche récents en sécurité informatique.",
        },
        {
            title: "Atelier Dev Web",
            image: AI,
            date: "15 Septembre 2025",
            description: "Formation pratique aux frameworks modernes du web.",
        },
        {
            title: "Journée Portes Ouvertes",
            image: AI,
            date: "30 Septembre 2025",
            description:
                "Découverte des laboratoires et rencontres avec les enseignants.",
        },
    ];

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel
                className="w-full border-none"
                opts={{
                    align: "start",
                    slidesToScroll: "auto",
                }}
            >
                <CarouselPrevious className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow bg-white hover:bg-gray-100" />

                <CarouselContent className="-ml-2 border-none">
                    {events.map((event, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                        >
                            <div className="p-2 h-full">
                                <Card className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow border-none overflow-hidden bg-white">
                                    <div className="aspect-video relative w-full">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                                            loading="lazy"
                                        />
                                    </div>

                                    <CardContent className="flex-1 p-4 flex flex-col">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold line-clamp-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {event.date}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                                            {event.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselNext className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow bg-white hover:bg-gray-100" />
            </Carousel>
        </div>
    );
}
