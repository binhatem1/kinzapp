
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.post('http://localhost:3001/authUser', {}, {
                headers: {
                    Authorization: token
                }
            }).then(response => {
                setIsValid(true);
                console.log("Token is valid");
            }).catch(error => {
                setIsValid(false);
                console.log("Token is invalid");
            });
        } else {
            setIsValid(false);
        }
    }, []);

    if (isValid === null) {
        return null; 
    }

    return isValid ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
