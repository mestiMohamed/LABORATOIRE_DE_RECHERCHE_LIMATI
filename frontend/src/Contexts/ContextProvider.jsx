import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import axiosClient from "../axiosClient";
const StateContext = createContext({
    user: null,
    token: null,
    role: null,
    setUser: () => {},
    setToken: () => {},
    setRole: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [role, setRole] = useState(localStorage.getItem("ROLE"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setRoleSafe = (role) => {
        setRole(role);
        if (role) {
            localStorage.setItem("ROLE", role);
        } else {
            localStorage.removeItem("ROLE");
        }
    };

    useEffect(() => {
        if (token && (!user || Object.keys(user).length === 0)) {
            axiosClient
                .get("/user")
                .then(({ data }) => {
                    setUser(data);
                })
                .catch(() => {
                    setUser({});
                    setToken(null);
                    setRoleSafe(null);
                });
        }
    }, [token]);

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                role,
                setUser,
                setToken,
                setRole: setRoleSafe,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
