import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from "./pages/loginScreen.jsx";
import To_do_listScreen from "./pages/to_do_listScreen.jsx";
import SignupScreen from "./pages/signupScreen.jsx";
import useAuthStore from "./store/auth.store.js";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

function App() {
    const { checkAuth, isAuthenticated, loading, getToDoList } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);


    useEffect(() => {
        getToDoList();
    }, [isAuthenticated]);

    // Protected route
    const ProtectedRoute = ({ children }) => {
        if (loading) return <LoadingSpinner/>;
        if (!isAuthenticated) return <Navigate to="/login" replace />;
        return children;
    };

    // Redirect authenticated users away from login/signup
    const AuthRedirect = ({ children }) => {
        if (loading) return <LoadingSpinner />;
        if (isAuthenticated) return <Navigate to="/" replace />;
        return children;
    };
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Routes>
            {/* Protected page */}
            <Route path="/" element={
                <ProtectedRoute>
                    <To_do_listScreen />
                </ProtectedRoute>
            } />

            {/* Auth pages (redirect if already logged in) */}
            <Route path="/login" element={
                <AuthRedirect>
                    <LoginScreen />
                </AuthRedirect>
            } />

            {/* Auth pages (redirect if already logged in) */}

            <Route path="/signup" element={
                <AuthRedirect>
                    <SignupScreen />
                </AuthRedirect>
            } />
        </Routes>
    );
}

export default App;
