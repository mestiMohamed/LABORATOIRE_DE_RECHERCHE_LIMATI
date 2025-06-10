import React, { useState, useEffect } from "react";
import { ResponsiveNavigationMenu } from "../Components/Acceuil/NavBar";
import { CarouselPlugin } from "../Components/Acceuil/Carousel";
import { CarouselEvents } from "../Components/Acceuil/CarouselEvents.jsx";
import { Button } from "../Components/ui/button.js";
import imgEq from "../assets/images_d'acceuil/2025.png";
import khotot from "../assets/images_d'acceuil/khotot.png";
import Actualite from "../Components/Acceuil/Actualite.jsx";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Footer2 from "../Components/ui/footer.jsx";
import { Gallery4 } from "../Components/Gallery.jsx";
import { Hero115 } from "../Components/Hero.jsx";
import { Community2 } from "../Components/Community.jsx";
import { Logos8 } from "../Components/Partenaires.jsx";

function Acceuil(props) {
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

    const [carouselRef, isCarouselInView] = useInView({
        threshold: 0, // ajuste si nécessaire
    });

    useEffect(() => {
        if (inView) {
            controlsLeft.start({ x: 0, opacity: 1 });
            controlsRight.start({ x: 0, opacity: 1 });
        }
    }, [inView, controlsLeft, controlsRight]);

    return (
        <>
            {/* Navbar fixe avec effet de scroll */}
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled || isCarouselInView
                        ? "bg-white/25 backdrop-blur-sm shadow-sm"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto h-18 flex justify-center">
                    <ResponsiveNavigationMenu className="m-0 p-0" />
                </div>
            </header>

            {/* Contenu principal avec padding-top pour compenser la navbar fixe */}
            <main className="pt-[4.5rem] relative h-[200vh]">
                {" "}
                {/* Ajustez cette valeur selon la hauteur de votre navbar */}
                <section className="container mx-auto h-[82vh] sticky top-0">
                    <Hero115 />
                </section>
                <section className="relative" ref={carouselRef}>
                    <section
                        className="flex justify-center items-center"
                    >
                        <CarouselPlugin />
                    </section>

                    <section className=" container mx-auto px-4 items-center flex flex-col py-40 bg-background">
                        <div className="space-y-6 max-w-3xl">
                            <h1 className="text-3xl tracking-tight text-orange-600 dark:text-teal-400">
                                LE LABORATOIRE
                            </h1>

                            <p className="leading-7 [&:not(:first-child)]:mt-6">
                                Le Laboratoire LIMATI est une Unité Mixte de
                                Recherche du Centre National de la Recherche
                                Scientifique (CNRS), de l'Institut National
                                Polytechnique de Toulouse (INPT) et de
                                l'Université Toulouse 3 - Paul Sabatier (UPS).
                            </p>

                            <Link
                                to="/presentation-du-laboratoire"
                                className="inline-block text-sm text-orange-600 dark:text-teal-400 underline underline-offset-4 hover:text-orange-700 dark:hover:text-teal-300 transition-colors"
                            >
                                Voir la présentation du laboratoire
                            </Link>
                        </div>
                    </section>
                    <section className="container mx-auto flex justify-center items-center my-15 flex-col gap-4">
                        <div className="flex flex-col items-start gap-4">
                            <h1 className="text-2xl font-bold">ÉVÉNEMENTS</h1>
                            <Link
                                to="/hey"
                                className="inline-block text-sm text-orange-600 dark:text-teal-400 underline underline-offset-4 hover:text-orange-700 dark:hover:text-teal-300 transition-colors"
                            >
                                Voir tous les événements
                            </Link>
                        </div>
                        <CarouselEvents />
                    </section>
                    <section
                        ref={ref}
                        className="grid grid-cols-1 md:grid-cols-2 bg-background px-4 sm:px-8 lg:px-24"
                    >
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={controlsLeft}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex flex-col justify-center px-6 py-8"
                        >
                            {/* Contenu texte */}
                            <h2 className="text-xl md:text-2xl font-bold text-orange-600 dark:text-teal-400 mb-3 leading-tight">
                                NOS ÉQUIPES
                                <br />
                                DE RECHERCHE
                            </h2>
                            <p className="leading-7 [&:not(:first-child)]:mt-6">
                                Le LIMATI compte 12 groupes de recherches
                                constitués d'une dizaine de chercheurs et
                                enseignants-chercheurs permanents, d'un nombre
                                équivalent de doctorants et post-doctorants, et
                                est renforcé par les ingénieurs et techniciens
                                des différents services en soutien à la
                                recherche.
                            </p>
                            <Link to={"/login"}>
                                <Button
                                    variant="link"
                                    className="text-orange-600 dark:text-teal-400 p-0 h-auto underline underline-offset-4 text-sm hover:text-orange-500 dark:hover:text-teal-300 transition-colors cursor-pointer"
                                >
                                    Voir les équipes
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={controlsRight}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-full h-[350px] md:h-[350px]"
                        >
                            <img
                                src={imgEq}
                                alt="Équipe de recherche"
                                className="w-full h-full object-cover rounded-xl border border-border"
                            />
                        </motion.div>
                    </section>
                    <section className="my-16">
                        <div className="flex flex-col gap-6 items-center">
                            <div className="flex flex-col items-start gap-4">
                                <h1 className="text-2xl font-bold">
                                    ACTUALITÉS
                                </h1>
                                <Link
                                    to="/hey"
                                    className="inline-block text-sm text-orange-600 dark:text-teal-400 underline underline-offset-4 hover:text-orange-700 dark:hover:text-teal-300 transition-colors"
                                >
                                    Voir toutes les actualités
                                </Link>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                <Actualite />
                            </div>
                        </div>
                    </section>

                    <section className="my-16 container mx-auto">
                        <Logos8 />
                    </section>

                    <section className="my-16 container mx-auto">
                        <Community2 />
                    </section>

                    <section className="mx-20 mt-16">
                        <Gallery4 />
                    </section>
                </section>
                <section className="border-t">
                    <Footer2 />
                </section>
            </main>
        </>
    );
}

export default Acceuil;
