import { ArrowUpRight } from "lucide-react";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Community2 = () => {
    return (
        <section className="py-20">
            <div className="container">
                <div className="text-center">
                    <h2 className="mb-5 text-2xl font-semibold md:text-3xl ">
                        Rejoignez notre communauté
                    </h2>
                    <p className="font-medium text-muted-foreground md:text-xl">
                        Connectez-vous avec d'autres membres, partagez vos
                        expériences et restez informé.
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <a
                        className="group rounded-md border border-border p-6"
                        href="#"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <FaXTwitter className="size-5" />
                            <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                        </div>
                        <div className="mt-4">
                            <h3 className="mb-1 font-semibold">Twitter</h3>
                            <p className="text-sm text-muted-foreground">
                                Suivez nos dernières actualités et annonces.
                            </p>
                        </div>
                    </a>
                    <a
                        className="group rounded-md border border-border p-6"
                        href="https://linkedin.com/in/limati-limati-52990736a"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <FaLinkedin className="size-5" />
                            <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                        </div>
                        <div className="mt-4">
                            <h3 className="mb-1 font-semibold">LinkedIn</h3>
                            <p className="text-sm text-muted-foreground">
                                Rejoignez-nous et explorez des opportunités de
                                carrière.
                            </p>
                        </div>
                    </a>
                    <a
                        className="group rounded-md border border-border p-6"
                        href="#"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <FaGithub className="size-5" />
                            <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                        </div>
                        <div className="mt-4">
                            <h3 className="mb-1 font-semibold">Github</h3>
                            <p className="text-sm text-muted-foreground">
                                Contribuez à nos projets open source.{" "}
                            </p>
                        </div>
                    </a>
                    <a
                        className="group rounded-md border border-border p-6"
                        href="https://discord.gg/MXTYApjb"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <FaDiscord className="size-5" />
                            <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                        </div>
                        <div className="mt-4">
                            <h3 className="mb-1 font-semibold">Discord</h3>
                            <p className="text-sm text-muted-foreground">
                                Rejoignez notre serveur Discord et échangez avec
                                d'autres développeurs.
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export { Community2 };
