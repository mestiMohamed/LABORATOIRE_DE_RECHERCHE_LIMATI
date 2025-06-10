import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

const EventsNav = ({
    tagline = "Événements à venir",
    heading = "Prochains événements",
    description = "Restez informé des événements organisés par le laboratoire : séminaires, conférences, ateliers et plus.",
    buttonText = "View all articles",
    evs = [
        {
            id: "ev-1",
            title: "Getting Started with shadcn/ui Components",
            summary: "",
            label: "Tutorial",
            author: "Sarah Chen",
            published: "1 Jan 2024",
            url: "https://shadcnblocks.com",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
        },
        {
            id: "ev-2",
            title: "Building Accessible Web Applications",
            summary:
                "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
            label: "Accessibility",
            author: "Marcus Rodriguez",
            published: "1 Jan 2024",
            url: "https://shadcnblocks.com",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
        },
        {
            id: "ev-3",
            title: "Modern Design Systems with Tailwind CSS",
            summary:
                "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
            label: "Design Systems",
            author: "Emma Thompson",
            published: "1 Jan 2024",
            url: "https://shadcnblocks.com",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
        },
    ],
}) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axiosClient
            .get("/events/upcoming") // Assure-toi que cette route existe
            .then(({ data }) => {
                setEvents(data.data);
            })
            .catch((err) => {
                console.error(
                    "Erreur lors du chargement des événements :",
                    err
                );
            });
    }, []);
    return (
        <section className="py-32">
            <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
                <div className="text-center">
                    <Badge variant="secondary" className="mb-6">
                        {tagline}
                    </Badge>
                    <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
                        {heading}
                    </h2>
                    <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
                        {description}
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {events.map((ev) => (
                        <Card
                            key={ev.id}
                            className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
                        >
                            <div className="aspect-16/9 w-full">
                                <a
                                    href={ev.url}
                                    target="_blank"
                                    className="transition-opacity duration-200 fade-in hover:opacity-70"
                                >
                                    <img
                                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                                        alt={ev.title}
                                        className="h-full w-full object-cover object-center rounded-2xl"
                                    />
                                </a>
                            </div>
                            <CardHeader>
                                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                                    <a href={ev.url} target="_blank">
                                        {ev.name}
                                    </a>
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Learn how to quickly integrate and customize
                                    shadcn/ui components in your Next.js
                                    projects. We'll cover installation, theming,
                                    and best practices for building modern
                                    interfaces.
                                </p>
                            </CardContent>
                            <CardFooter className="text-muted-foreground/80">
                                {ev.date_debut}  {ev.date_fin}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { EventsNav };
