import React, { useState } from "react";
import { RegisterForm } from "../Components/register-form";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

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

    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center bg-background py-10 overflow-hidden">
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
