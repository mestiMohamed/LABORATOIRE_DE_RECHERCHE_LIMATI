import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';

function GuestLayout() {
    const { token, role } = useStateContext();

    if (token && role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    if (token && role === "user") {
        return <Navigate to="/chercheur/dashboard" replace />;
    }

    return <Outlet />;
}

export default GuestLayout;
