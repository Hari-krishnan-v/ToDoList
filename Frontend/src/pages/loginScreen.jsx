import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Card} from "../components/card.jsx";
import Input from "../components/input.jsx";
import useAuthStore from "../store/auth.store.js";

const LoginScreen = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { loading, login, loginError, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // Redirect to '/' when login is successful
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <section className="flex items-center justify-center bg-gradient-to-b from-black to-[#231D2D] h-screen">
            <Card>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Show login error */}
                    {loginError && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {loginError}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-blue-600 hover:underline">Register</a>
                    </p>
                </form>
            </Card>
        </section>
    );
};

export default LoginScreen;
