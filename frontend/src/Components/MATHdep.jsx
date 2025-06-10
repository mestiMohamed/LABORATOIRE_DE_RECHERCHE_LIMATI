import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const MathFaq = ({
    heading = "Département Mathématiques Appliquées et Modélisation",
    items = [
        {
            question: "ADRIA ",
            answer: "Argumentation, Décision, Raisonnement, Incertitude et Apprentissage",
        },
        {
            question: "LILaC  ",
            answer: "Logique, Interaction, Langue et Calcul",
        },
        {
            question: "MELODI  ",
            answer: "Méthodes et Ingénierie des Langues, des Ontologies et du Discours",
        },
        {
            question: "SAMoVA  ",
            answer: "Structuration, Analyse et Modélisation de documents Vidéo et Audio",
        },
    ],
}) => {
    return (
        <section className="py-32">
            <div className="container max-w-3xl">
                <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
                    {heading}
                </h1>
                <Accordion type="single" collapsible>
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="font-semibold hover:no-underline">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export { MathFaq };
