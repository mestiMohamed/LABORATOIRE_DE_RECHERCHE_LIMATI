import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ importer useNavigate
import { LoginForm } from "../Components/login-form";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { CHERCHEUR_DASHBOARD_ROUTE } from "../router"; // ✅ importer la constante de redirection

function Login(props) {
    const { setUser, setToken, setRole } = useStateContext();
    const navigate = useNavigate(); // ✅ initialiser navigate

    const handleSubmit = (data) => {
        axiosClient
            .post("/login", data)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setRole(data.role); // ✅

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
                <LoginForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default Login;
