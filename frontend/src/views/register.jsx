import React, { useState, useEffect } from "react";
import { RegisterForm } from "../Components/register-form";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
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

function Register(props) {
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const [showDialog, setShowDialog] = useState(false);

    const handleSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.confirmPassword);
        if (data.image && data.image instanceof File) {
            formData.append("image", data.image);
        }
        formData.append("date_of_birth", data.date_of_birth);
        formData.append("gender", data.gender);
        formData.append("address", data.address);
        formData.append("blood_type", data.blood_type);
        formData.append("phone", data.phone);

        axiosClient
            .post("/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
            })
            .then(() => {
                setShowDialog(true); // 🔔 Afficher le dialog
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        navigate("/login"); // Rediriger après fermeture du dialog
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
                <div className="w-full max-w-4xl px-4 mx-auto">
                    <RegisterForm onSubmit={handleSubmit} />
                </div>
            </div>

            <AlertDialog open={showDialog} onOpenChange={handleCloseDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Inscription réussie</AlertDialogTitle>
                        <AlertDialogDescription>
                            Votre compte a été créé avec succès. Veuillez
                            contacter l’administrateur pour l’activer avant de
                            pouvoir vous connecter.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCloseDialog}>
                            Fermer
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default Register;
