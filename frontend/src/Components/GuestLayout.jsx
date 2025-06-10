import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';

function GuestLayout() {
    const { token, role } = useStateContext();

    if (token && role === "admin") {
        return <Navigate to="/admin/tableau-de-bord" replace />;
    }

    if (token && role === "user") {
        return <Navigate to="/chercheur/tableau-de-bord" replace />;
    }

    return <Outlet />;
}

export default GuestLayout;
