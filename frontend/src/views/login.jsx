import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../Components/login-form";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { CHERCHEUR_DASHBOARD_ROUTE } from "../router";
import { ResponsiveNavigationMenu } from "../Components/Acceuil/NavBar";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

function Login() {
    const { setUser, setToken, setRole } = useStateContext();
    const navigate = useNavigate();

    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const handleSubmit = (data) => {
        axiosClient
            .post("/login", data)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setRole(data.role);

                if (data.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/chercheur/dashboard");
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response) {
                    if (response.status === 403) {
                        setDialogMessage(
                            "Votre compte est désactivé. Veuillez contacter l'administrateur."
                        );
                        setShowDialog(true);
                    } else if (response.status === 422) {
                        setDialogMessage("Email ou mot de passe incorrect.");
                        setShowDialog(true);
                    } else {
                        setDialogMessage(
                            "Une erreur est survenue. Veuillez réessayer."
                        );
                        setShowDialog(true);
                    }
                }
            });
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/25 backdrop-blur-sm shadow-sm"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto h-18 flex justify-center">
                    <ResponsiveNavigationMenu className="m-0 p-0" />
                </div>
            </header>
            <div className="h-[calc(100vh-72px)]  dark:bg-black mt-18 flex flex-col gap-5 items-center justify-center">
                <div className="w-full max-w-4xl px-4">
                    <LoginForm onSubmit={handleSubmit} />
                </div>
            </div>

            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Connexion refusée</AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Fermer</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default Login;
