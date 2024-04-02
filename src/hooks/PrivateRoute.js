import React from 'react';
import { Route, redirect } from 'react-router-dom';
import useApi from '../context/AppContext';

const PrivateRoute = ({ component: Component, ...rest}) => {

    const {accountData} = useApi()

    return (
        <Route
            {...rest}
            element={(props) =>
            accountData?.accountNo ? (
                <Component {...props} />
            ) : (
                redirect("/")
            )
            }
        />
    )
};

export default PrivateRoute;
