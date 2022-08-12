import {
    getAdditionalUserInfo,
    getAuth,
    onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { firebaseApp } from "./api";

import { AppRouter, Header } from "./components";
import { AuthContext } from "./context";
import { Loader } from "./components/UI";

export default function App() {
    const [isAuth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(getAuth(firebaseApp), (user) => {
            console.log("user", user);
            if (user) {
                setAuth(!!user);
                setUser(user);
            }
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div style={{ height: "100vh", width: "100vw" }}>
                <Loader />
            </div>
        );
    }

    return (
        <div className="App">
            <AuthContext.Provider value={{ isAuth, setAuth, user }}>
                <BrowserRouter>
                    <Header />
                    <AppRouter />
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}
