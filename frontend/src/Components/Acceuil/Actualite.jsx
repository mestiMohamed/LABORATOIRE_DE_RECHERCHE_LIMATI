import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import acc1 from "../../assets/acceuilActualite/acc1.jpg"
import acc2 from "../../assets/acceuilActualite/acc2.jpg"
import acc3 from "../../assets/acceuilActualite/acc3.jpg"
import acc4 from "../../assets/acceuilActualite/acc4.jpg"
import acc5 from "../../assets/acceuilActualite/acc5.jpg"
import acc6 from "../../assets/acceuilActualite/acc6.jpg"

function ActualiteCard({ title, date, description, link, image, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: index * 0.1 }}
        >
            <Card className="w-[350px] h-[500px] flex flex-col gap-5 border-0 shadow-none bg-background/0">
                <CardHeader>
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            className="mb-4 w-full h-40 object-cover rounded-md"
                        />
                    )}
                </CardHeader>
                <CardContent className="flex flex-col gap-2"> 
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{date}</CardDescription>
                    <p className="text-sm text-gray-700">{description}</p>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="link"
                        className="inline-block text-sm text-[#bc0600] dark:text-teal-400 underline underline-offset-4 hover:text-teal-300 dark:hover:text-[#bc0600] transition-colors cursor-pointer"
                    >
                        {link}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
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
            image: acc1,
        },
        {
            title: "Nouveaux algorithmes de cryptographie post-quantique",
            date: "25 Mai 2025",
            description:
                "Des mathématiciens publient un protocole sécurisé basé sur les réseaux euclidiens, résistant aux ordinateurs quantiques.",
            link: "Lire plus",
            image: acc2,
        },
        {
            title: "Outils mathématiques pour l’optimisation énergétique",
            date: "22 Mai 2025",
            description:
                "L’Université de Toulouse propose une plateforme exploitant la programmation linéaire pour réduire la consommation électrique.",
            link: "Lire plus",
            image: acc3,
        },
        // 3 nouvelles cartes
        {
            title: "Atelier sur les réseaux neuronaux",
            date: "30 Mai 2025",
            description:
                "Formation intensive à Lyon sur la conception et l’implémentation de réseaux neuronaux profonds.",
            link: "Lire plus",
            image: acc4,
        },
        {
            title: "Nouvelles découvertes en théorie des graphes",
            date: "27 Mai 2025",
            description:
                "Un article révolutionnaire sur les graphes dynamiques a été publié dans la revue Science.",
            link: "Lire plus",
            image: acc6,
        },
        {
            title: "Conférence sur la sécurité informatique",
            date: "24 Mai 2025",
            description:
                "Experts internationaux débattent des dernières menaces et des solutions de cybersécurité.",
            link: "Lire plus",
            image: acc5,
        },
    ];

    return (
        <div className="container mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 justify-items-center">
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
