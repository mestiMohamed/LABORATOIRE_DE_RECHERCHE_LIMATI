import React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Feature166 } from "./Dashboard Componenets/Feature";
import { Feature13 } from "../ChercheurDash";

function ChercheurDashboard(props) {
    const {user, setUser} = useStateContext()

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <>
            <div className="w-full">
                <Feature13 />
            </div>
        </>
    );
}

export default ChercheurDashboard;
