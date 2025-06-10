import { Button } from "@/components/ui/button";

const Stats6 = () => {
    return (
        <section className="bg-accent py-32 ">
            <div className="container flex flex-col items-start text-left mx-20">
                <div className="mb-12 w-full md:mb-16">
                    <h2 className="mb-8 w-full max-w-[24rem] text-3xl font-bold text-pretty sm:text-4xl md:max-w-[30rem] lg:max-w-[37rem] lg:text-5xl">
                        Chiffres Clés du LIMATI
                    </h2>
                    <div className="flex flex-col justify-start gap-2 sm:flex-row">
                        <Button className="w-full sm:w-auto">
                            Découvrir nos projets
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto">
                            En savoir plus
                        </Button>
                    </div>
                </div>
                <div className="grid w-full grid-cols-2 gap-12 sm:w-fit sm:grid-cols-4 lg:gap-16">
                    <div className="w-full">
                        <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
                            35+
                        </div>
                        <div className="text-base leading-6 text-muted-foreground lg:text-lg">
                            Membres permanents
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
                            60+
                        </div>
                        <div className="text-base leading-6 text-muted-foreground lg:text-lg">
                            Publications scientifiques/an
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
                            12
                        </div>
                        <div className="text-base leading-6 text-muted-foreground lg:text-lg">
                            Projets en cours
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
                            8+
                        </div>
                        <div className="text-base leading-6 text-muted-foreground lg:text-lg">
                            Partenariats académiques et industriels
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Stats6 };
