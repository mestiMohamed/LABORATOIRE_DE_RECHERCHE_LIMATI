import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../Components/login-form";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { CHERCHEUR_DASHBOARD_ROUTE } from "../router";

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
                        console.log(response.data.errors);
                    } else {
                        setDialogMessage("Une erreur est survenue. Veuillez réessayer.");
                        setShowDialog(true);
                    }
                }
            });
    };

    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center bg-background">
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
