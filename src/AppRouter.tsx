import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import {AuthForm} from "./layouts/Login";
import {WelcomePage} from "./layouts/WelcomePage";
import {Register} from "./layouts/Register";
import {CoursePage} from "./layouts/CoursePage.tsx";

export const AppRouter = () => {
    // Verifica si el usuario está autenticado
    const isAuthenticated = async () => {
        const { data } = await supabase.auth.getSession();
        return !!data.session;
    };

    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        const [authenticated, setAuthenticated] = React.useState(false);
        const [loading, setLoading] = React.useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                const auth = await isAuthenticated();
                setAuthenticated(auth);
                setLoading(false);
            };
            checkAuth();
        }, []);

        if (loading) return <p>Cargando...</p>;

        return authenticated ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/welcome"
                    element={
                        <ProtectedRoute>
                            <WelcomePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/course/:id"
                       element={
                        <ProtectedRoute>
                            <CoursePage />
                        </ProtectedRoute>
                       }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};