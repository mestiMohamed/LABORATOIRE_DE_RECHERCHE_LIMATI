import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function ActualiteCard({ title, date, description, link, image }) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{date}</CardDescription>
            </CardHeader>
            <CardContent>
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="mb-4 w-full h-40 object-cover rounded-md"
                    />
                )}
                <p className="text-sm text-gray-700">{description}</p>
            </CardContent>
            <CardFooter>
                <Button
                    variant="link"
                    className="text-orange-600 p-0 h-auto underline underline-offset-4 text-sm"
                >
                    {link}
                </Button>
            </CardFooter>
        </Card>
    );
}

function Actualite() {
    const actualites = [
        {
            title: "Conférence sur l'IA à Paris",
            date: "28 Mai 2025",
            description:
                "Des chercheurs présentent les dernières avancées en deep learning et modélisation mathématique à l'ENS Paris.",
            link: "Lire plus",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=350&q=80",
        },
        {
            title: "Nouveaux algorithmes de cryptographie post-quantique",
            date: "25 Mai 2025",
            description:
                "Des mathématiciens publient un protocole sécurisé basé sur les réseaux euclidiens, résistant aux ordinateurs quantiques.",
            link: "Lire plus",
            image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=350&q=80",
        },
        {
            title: "Outils mathématiques pour l’optimisation énergétique",
            date: "22 Mai 2025",
            description:
                "L’Université de Toulouse propose une plateforme exploitant la programmation linéaire pour réduire la consommation électrique.",
            link: "Lire plus",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=350&q=80",
        },
        // 3 nouvelles cartes
        {
            title: "Atelier sur les réseaux neuronaux",
            date: "30 Mai 2025",
            description:
                "Formation intensive à Lyon sur la conception et l’implémentation de réseaux neuronaux profonds.",
            link: "Lire plus",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=350&q=80",
        },
        {
            title: "Nouvelles découvertes en théorie des graphes",
            date: "27 Mai 2025",
            description:
                "Un article révolutionnaire sur les graphes dynamiques a été publié dans la revue Science.",
            link: "Lire plus",
            image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=350&q=80",
        },
        {
            title: "Conférence sur la sécurité informatique",
            date: "24 Mai 2025",
            description:
                "Experts internationaux débattent des dernières menaces et des solutions de cybersécurité.",
            link: "Lire plus",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=350&q=80",
        },
    ];

    return (
        <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
            {actualites.map((item, index) => (
                <ActualiteCard
                    key={index}
                    title={item.title}
                    date={item.date}
                    description={item.description}
                    link={item.link}
                    image={item.image}
                />
            ))}
        </div>
    );
}

export default Actualite;
