import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return loggedInUser.email ? children : <Navigate to="/login" />
};

export default PrivateRoute;