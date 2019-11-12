import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import Login from "../routes/Public/Login";
import ReduxStore from "../interfaces/ReduxStore";


const PrivateRoute = ({ component, ...options }:any) => {

    const jwt = useSelector<ReduxStore, ReduxStore["jwt"]>( state => state.jwt );

    const finalComponent = jwt ? component : Login;

    return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
