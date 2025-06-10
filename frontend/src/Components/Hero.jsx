import { Wifi, Zap } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import ultimeLogo from "../assets/logos/ultimeLogo.png";
import sh1 from "../assets/logos/sh1.png";

const Hero115 = ({
    icon = sh1,
    heading = "Laboratoire LIMATI – FP Béni Mellal",

    description = "Le Laboratoire LIMATI (Innovation en Mathématiques et Technologies de l’Information), dirigé par le Pr. Belaid Bouikhalene à la FP-BM, développe des projets de recherche en mathématiques, TIC et applications interdisciplinaires.",

    button = {
        text: "Découvrir le laboratoire",

        icon: <Zap className="ml-2 size-4" />,
        url: "https://www.shadcnblocks.com",
    },
    trustText = "Reconnu par des chercheurs, étudiants et partenaires académiques",
    imageSrc = ultimeLogo,
    imageAlt = "Logo du laboratoire LIMATI",
}) => {
    const [scrolled, setScrolled] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const controlsLeft = useAnimation();
    const controlsRight = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controlsLeft.start({ x: 0, opacity: 1 });
            controlsRight.start({ x: 0, opacity: 1 });
        }
    }, [inView, controlsLeft, controlsRight]);
    return (
        <section className="overflow-hidden py-32 mt-28">
            <div className="container">
                <div className="flex flex-col gap-5">
                    <div className="relative flex flex-col gap-5">
                        <div
                            style={{
                                transform: "translate(-50%, -50%)",
                            }}
                            className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
                        >
                            <div className="size-full rounded-full border p-16 md:p-32">
                                <div className="size-full rounded-full border"></div>
                            </div>
                        </div>

                        <span className="mx-auto flex size-24 items-center justify-center rounded-full border md:size-32 overflow-hidden bg-white">
                            <img
                                src={icon}
                                alt="Logo"
                                className="object-contain w-30 h-30"
                            />
                        </span>

                        <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium text-balance md:text-6xl">
                            {heading}
                        </h2>
                        <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
                            {description}
                        </p>
                        <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
                            <Button size="lg" asChild>
                                <a href={button.url}>
                                    {button.text} {button.icon}
                                </a>
                            </Button>
                            {trustText && (
                                <div className="text-xs text-muted-foreground">
                                    {trustText}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Hero115 };
