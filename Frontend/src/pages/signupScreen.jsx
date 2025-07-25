import React, {useEffect, useState} from 'react'
import Input from "../components/input.jsx";
import {Card} from "../components/card.jsx";
import useAuthStore from "../store/auth.store.js";
import {useNavigate} from "react-router-dom";

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loading, signup, signupError, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:')
        const userdata = {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        await signup(userdata);

    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);


    return (
        <section className="flex items-center justify-center   bg-gradient-to-b from-black to-[#231D2D] h-screen">
            <Card>
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="Username">Username</label>
                        <Input
                            type="text"
                            id="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
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
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2"
                               htmlFor="password">Password</label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2"
                               htmlFor="password">Password</label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    {signupError && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {signupError}
                        </p>
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                    <p className="mt-4 text-sm text-center text-gray-600">Already have an account?
                        <a href="/login"
                           className="text-blue-600 hover:underline">Login</a>
                    </p>
                </form>
            </Card>
        </section>
    )
}
export default SignupScreen
