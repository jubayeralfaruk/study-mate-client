import React, { use } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);

    if (loading) {
        return <>
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-dots loading-xl"></span>
                <span className="loading loading-dots loading-xl"></span>
                <span className="loading loading-dots loading-xl"></span>
            </div>
        </>
    }

    if (!user) {
        return <Navigate to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;