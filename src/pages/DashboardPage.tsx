import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const DashboardPage = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen">
            <div className="w-full  flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
                <h1 className="text-3xl font-bold mb-5">Choose Menu</h1>
                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div onClick={() => navigate("/report")} className="cursor-pointer bg-purple-400 p-6 rounded-lg flex items-center justify-center aspect-square hover:bg-purple-500 transition">
                        <span className="text-xl font-bold">CRUD Report</span>
                    </div>
                    <div onClick={() => navigate("/compare")} className="cursor-pointer bg-purple-400 p-6 rounded-lg flex items-center justify-center aspect-square hover:bg-purple-500 transition">
                        <span className="text-xl font-bold">Compare Text</span>
                    </div>
                </div>
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-xl mt-4">
                    Sign Out
                </button>
            </div>
        </div>
    );
};
export default DashboardPage;
