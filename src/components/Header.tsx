import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    const navItems = [
        { path: "/compare", label: "Compare" },
        { path: "/report", label: "Report" },
    ];

    return (
        <header className="bg-gray-800 text-white shadow-lg fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Finport</h1>
                <nav className="flex gap-6">
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path} className={`transition ${location.pathname === item.path ? "text-purple-400 font-semibold border-b-2 border-purple-400" : "hover:text-purple-400"}`}>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
