import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const ITFaq = ({
    heading = "Département Informatique et Technologies de l'Information",
    items = [
        {
            question: "RMESS",
            answer: "Réseaux, Mobiles, Embarqués, Sans fil, Satellites",
        },
        {
            question: "SEPIA ",
            answer: "Système d’Exploitation, Systèmes Répartis, de l’Intergiciel à l’Architecture",
        },
        {
            question: "T2RS ",
            answer: "Temps Réel dans les Réseaux et Systèmes.",
        },
        {
            question: "REVA ",
            answer: "Real Expression Artificial Life",
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

export { ITFaq };
