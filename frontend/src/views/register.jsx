import React from "react";
import { RegisterForm } from "../Components/register-form";
import { useStateContext } from "../Contexts/ContextProvider";

import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

function register(props) {
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate(); // 👈 pour rediriger

    const handleSubmit = (data) => {
        axiosClient
            .post("/register", data)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);

                // 👇 Redirection selon rôle
                if (data.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/chercheur/dashboard");
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div className="w-full max-w-4xl px-4">
                {" "}
                {/* Conteneur intermédiaire avec largeur maximale */}
                <RegisterForm
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default register;
