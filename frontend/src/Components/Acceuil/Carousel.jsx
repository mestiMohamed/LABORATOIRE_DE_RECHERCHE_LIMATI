import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import it1 from "../../assets/images_d'acceuil/it.png"
import it2 from "../../assets/images_d'acceuil/it2.png"
import amphi from "../../assets/images_d'acceuil/amphi.png"

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselPlugin() {
    const plugin = React.useRef(
        Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        })
    );

    const slides = [
        {
            image: it1,
            title: "INFORMATIQUE",
            description:
                "LIMATI : L’INNOVATION NUMÉRIQUE AU CŒUR DE LA RECHERCHE Exploration avancée en intelligence artificielle, algorithmique et systèmes intelligents",
        },
        {
            image: amphi,
            title: "MATHÉMATIQUES",
            description: "LIMATI : LA PUISSANCE DES MATHÉMATIQUES POUR COMPRENDRE ET INNOVER Recherche fondamentale et appliquée en géométrie, logique, et modélisation mathématique",
        },
    ];

    return (
        <Carousel plugins={[plugin.current]} className="w-full">
            <CarouselContent>
                {slides.map((slide, index) => (
                    <CarouselItem key={index} className="w-full">
                        <div className="relative h-[500px] w-full">
                            <img
                                src={slide.image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay noir semi-transparent */}
                            <div className="absolute inset-0 bg-black/50" />

                            {/* Texte centré */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                                <h2 className="text-3xl font-bold mb-2">
                                    {slide.title}
                                </h2>
                                <p className="text-lg">{slide.description}</p>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="left-4 top-1/2 transform -translate-y-1/2 z-10" />
            <CarouselNext className="right-4 top-1/2 transform -translate-y-1/2 z-10" />
        </Carousel>
    );
}
