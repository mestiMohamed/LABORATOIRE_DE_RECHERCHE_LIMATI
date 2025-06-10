import { useState, useEffect } from "react";
import { ResponsiveNavigationMenu } from "../Components/Acceuil/NavBar";

import { useInView } from "react-intersection-observer";
import { House } from "lucide-react";

import { Button } from "../Components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { motion, useAnimation } from "framer-motion";

function NotFound(props) {
    const [scrolled, setScrolled] = useState(false);

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
        <>

            <section className="h-[100vh]  dark:bg-black  flex flex-col gap-5 items-center justify-center">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className=""
                >
                    <Badge className="font-mono">404</Badge>
                </motion.div>

                <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium text-balance md:text-6xl">
                    Page non trouvée
                </h2>
                <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
                    Nous n’avons pas pu trouver la page que vous cherchiez.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
                    <Button size="lg" asChild>
                        <Link to={"/"}>
                            Retour à l’accueil <House />
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    );
}

export default NotFound;
