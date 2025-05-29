import React from "react";
import { NavigationMenuDemo } from "../Components/Acceuil/NavBar";
import { CarouselPlugin } from "../Components/Acceuil/Carousel";
import { CarouselEvents } from "../Components/Acceuil/CarouselEvents.jsx";
import { Button } from "../Components/ui/button.js";
import imgEq from "../assets/images_d'acceuil/2025.png";
import khotot from "../assets/images_d'acceuil/khotot.png";
import Actualite from "../Components/Acceuil/Actualite.jsx";
import { Link } from "react-router-dom";

function Acceuil(props) {
    return (
        <>
            <section className="container mx-auto flex justify-center items-center h-24 ">
                <NavigationMenuDemo className="m-0 p-0" />
            </section>

            <section className="flex justify-center items-center">
                <CarouselPlugin />
            </section>

            <section
                className="my-16 container mx-auto px-4 items-center flex flex-col py-20"
            >
                <div className="space-y-6 max-w-3xl">
                    <h1 className="text-3xl  tracking-tight text-orange-600">
                        LE LABORATOIRE
                    </h1>

                    <p className="text-muted-foreground leading-relaxed text-base">
                        Le Laboratoire LIMATI est une
                        Unité Mixte de Recherche du Centre National de la
                        Recherche Scientifique (CNRS), de l’Institut National
                        Polytechnique de Toulouse (INPT) et de l’Université
                        Toulouse 3 - Paul Sabatier (UPS).
                    </p>

                    <Link
                        to="/presentation"
                        className="inline-block text-sm text-orange-600 underline underline-offset-4 hover:text-orange-700 transition-colors"
                    >
                        Voir la présentation du laboratoire
                    </Link>
                </div>
            </section>

            <section className="container mx-auto flex justify-center items-center my-15">
                <CarouselEvents />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 bg-white px-24">
                {/* Texte à gauche */}
                <div className="flex flex-col justify-center px-6 py-8 bg-white">
                    <h2 className="text-xl md:text-2xl font-bold text-orange-600 mb-3 leading-tight">
                        NOS ÉQUIPES
                        <br />
                        DE RECHERCHE
                    </h2>
                    <p className="text-sm text-black leading-relaxed mb-3 max-w-xl">
                        Le Laplace compte 12 groupes de recherches constitués
                        d’une dizaine de permanents chercheurs et
                        enseignants-chercheurs et d’un nombre équivalent de
                        doctorants et post-doctorants et renforcés par les
                        ingénieurs et techniciens des différents services en
                        soutien à la recherche.
                    </p>
                    <Button
                        variant="link"
                        className="text-orange-600 p-0 h-auto underline underline-offset-4 text-sm"
                    >
                        Voir les équipes
                    </Button>
                </div>

                {/* Image à droite */}
                <div className="w-full h-[350px] md:h-[350px]">
                    <img
                        src={imgEq}
                        alt="Équipe de recherche"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            </section>

            <section className="my-16">
                <div className="flex flex-col gap-6 items-center">
                    {/* En-tête */}
                    <div className="flex flex-col items-start gap-4">
                        <h1 className="text-2xl font-bold">ACTUALITÉS</h1>
                        <Link
                            to="/hey"
                            className="text-orange-600 underline underline-offset-4 text-sm"
                        >
                            Voir toutes les actualités
                        </Link>
                    </div>

                    {/* Les cartes alignées à gauche aussi */}
                    <div className="flex flex-wrap gap-6">
                        <Actualite />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Acceuil;
