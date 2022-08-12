import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../../context";
import { Page404 } from "../../pages";
import { privateRoutes, publicRoutes } from "../../router";
import { PrivateRoute, PublicRoute } from "./route";

export const AppRouter = () => {
    const { isAuth } = useContext(AuthContext);

    return (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    element={
                        <PrivateRoute isAuth={isAuth}>
                            {route.component}
                        </PrivateRoute>
                    }
                />
            ))}
            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    element={
                        <PublicRoute isAuth={isAuth}>
                            {route.component}
                        </PublicRoute>
                    }
                />
            ))}
            <Route path="/*" element={<Page404 />} />
        </Routes>
    );
};
