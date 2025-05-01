import React from 'react';
import { Outlet } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import { CHERCHEUR_DASHBOARD_ROUTE } from '../router';

function GuestLayout(props) {

    const {token} = useStateContext()
    if(token) {
        return <Navigate to={CHERCHEUR_DASHBOARD_ROUTE} />
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default GuestLayout;