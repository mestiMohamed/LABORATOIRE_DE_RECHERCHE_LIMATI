import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation } from "framer-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import AI from "../../assets/images_d'acceuil/2025.png";
import ev1 from "../../assets/acceuilEvents/ev1.jpg";
import ev2 from "../../assets/acceuilEvents/ev2.jpg";
import ev3 from "../../assets/acceuilEvents/ev3.jpg";
import ev4 from "../../assets/acceuilEvents/ev4.jpg";
import ev5 from "../../assets/acceuilEvents/ev5.jpg";

export function CarouselEvents() {
    const events = [
        {
            title: "Conférence IA 2025",
            image: ev2,
            date: "12 Juin 2025",
            description:
                "Un événement sur les dernières innovations en intelligence artificielle.",
        },
        {
            title: "Hackathon Étudiant",
            image: ev1,
            date: "5 Juillet 2025",
            description:
                "24h pour résoudre des défis technologiques en équipe.",
        },
        {
            title: "Séminaire Cybersécurité",
            image: ev3,
            date: "20 Août 2025",
            description:
                "Présentation des travaux de recherche récents en sécurité informatique.",
        },
        {
            title: "Atelier Dev Web",
            image: ev4,
            date: "15 Septembre 2025",
            description: "Formation pratique aux frameworks modernes du web.",
        },
        {
            title: "Journée Portes Ouvertes",
            image: ev5,
            date: "30 Septembre 2025",
            description:
                "Découverte des laboratoires et rencontres avec les enseignants.",
        },
    ];

    const controls = useAnimation();
    const [isHovered, setIsHovered] = React.useState(false);

    // Configuration de la boucle infinie
    const variants = {
        loop: {
            x: ["0%", "-100%"],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                },
            },
        },
        paused: {
            x: "0%",
            transition: { duration: 0 },
        },
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background via-background/70 to-transparent z-10 pointer-events-none" />

            <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background via-background/70 to-transparent z-10 pointer-events-none" />

            <Carousel
                className="w-full "
                opts={{
                    align: "start",
                    slidesToScroll: "auto",
                }}
            >
                <CarouselPrevious className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent text-accent-foreground shadow-sm" />

                <CarouselContent className="-ml-2 mx-10">
                    {events.map((event, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                        >
                            <div className="p-2 h-full">
                                <Card className="h-full flex flex-col bg-background/0 hover:bg-accent/5 transition-colors shadow-none border-0">
                                    <div className="aspect-video relative w-full overflow-hidden rounded-lg">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>

                                    <CardContent className="flex-1 p-4 flex flex-col gap-2">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold line-clamp-2 text-foreground">
                                                {event.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {event.date}
                                            </p>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {event.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselNext className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent text-accent-foreground shadow-sm" />
            </Carousel>
        </div>
    );
}
