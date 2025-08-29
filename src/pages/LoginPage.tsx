import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (!success) return;
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="hidden md:flex w-1/2 bg-black text-white flex-col items-center justify-center p-12 gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className=""></div>
                    <div className="bg-purple-400 p-6 rounded-lg flex items-center justify-center aspect-square">
                        <span className="text-xl font-bold">Login</span>
                    </div>
                    <div className="bg-purple-400 p-6 rounded-lg flex items-center justify-center aspect-square">
                        <span className="text-xl font-bold">Register</span>
                    </div>
                    <div className="bg-purple-400 p-6 rounded-lg flex items-center justify-center aspect-square">
                        <span className="text-xl font-bold">CRUD Report</span>
                    </div>
                    <div className="bg-purple-400 p-6 rounded-lg flex items-center justify-center aspect-square">
                        <span className="text-xl font-bold">Compare Text</span>
                    </div>
                    <div className=""></div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-900 text-white p-6 h-screen">
                <form onSubmit={handleSubmit} className="bg-gray-800  p-10 rounded-2xl w-full max-w-md shadow-lg flex flex-col gap-6">
                    <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

                    <div className="flex flex-col gap-3">
                        <label className="text-gray-300 font-medium">Email</label>
                        <input type="email" autoComplete="off" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="p-4 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-gray-300 font-medium">Password</label>
                        <input type="password" autoComplete="off" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className="p-4 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition" />
                    </div>

                    <button className="bg-purple-500 text-white py-3 rounded-xl mt-4 font-semibold hover:bg-purple-600 transition-all shadow-md hover:shadow-lg cursor-pointer">Sign In</button>

                    <p className="text-center text-gray-400 mt-4 text-sm font-medium">
                        Don't have an account?
                        <span onClick={() => navigate("/register")} className="text-purple-500 ms-1 font-semibold hover:text-purple-400 hover:underline transition-colors cursor-pointer">
                            Sign Up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
