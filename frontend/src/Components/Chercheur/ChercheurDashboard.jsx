import React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../axiosClient";

function ChercheurDashboard(props) {
    const {user, setUser} = useStateContext()

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <>
            
        </>
    );
}

export default ChercheurDashboard;
