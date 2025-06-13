import { ArrowRight } from "lucide-react";
import { ITFaq } from "./ITdep";
import { MathFaq } from "./MATHdep";
import it from "../assets/dep et equipe/it.jpg"
import ma from "../assets/dep et equipe/math.jpg"

const DepEtEq = () => {
    return (
        <section className="py-32">
            <div className="container flex flex-col gap-16 lg:px-16">
                <div className="lg:max-w-[55rem]">
                    <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                        Départements et équipes
                    </h2>
                    <p className="mb-8 text-muted-foreground lg:text-lg">
                        Le LIMATI est structuré en deux départements
                        complémentaires : l'un dédié aux Mathématiques
                        Appliquées et Modélisation, et l'autre aux Technologies
                        de l'Information. Ces départements couvrent des domaines
                        variés tels que l'optimisation, l'intelligence
                        artificielle, les systèmes distribués, et la gestion des
                        données. Ensemble, ils visent à répondre aux défis
                        scientifiques actuels en alliant rigueur mathématique et
                        innovation technologique.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                    <div className="flex flex-col overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
                        <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                            <img
                                src={it}
                                alt="Feature 1"
                                className="aspect-16/9 h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                            <ITFaq />
                        </div>
                    </div>
                    <div className="flex flex-col-reverse overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
                        <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                            <MathFaq />
                        </div>
                        <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                            <img
                                src={ma}
                                alt="Feature 2"
                                className="aspect-16/9 h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { DepEtEq };
