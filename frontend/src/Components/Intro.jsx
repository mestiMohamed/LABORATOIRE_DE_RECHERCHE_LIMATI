import sh from "../assets/logos/sh1.png"

const Community1 = () => {
    return (
        <section className="py-32">
            <div className="container">
                <div className="flex flex-col items-center gap-5">
                    <img
                        src={sh}
                        alt="logo"
                        className="size-10"
                    />
                    <h2 className="text-center text-6xl font-semibold">
                        le LIMATI
                        <br />
                        <span className="text-muted-foreground/80 text-2xl">
                            L’humain et son environnement au cœur des mathématiques et de l’informatique.
                        </span>
                    </h2>
                </div>
            </div>
        </section>
    );
};

export { Community1 };
