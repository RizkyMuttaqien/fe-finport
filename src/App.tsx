import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ComparePage from "./pages/ComparePage";
import { useAuthStore } from "./store/authStore";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import ReportPage from "./pages/ReportPage";
function PrivateRoute({ children }: { children: JSX.Element }) {
    const token = useAuthStore((state) => state.token);
    if (!token) return <Navigate to="/login" replace />;
    return children;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <>
                                <Header />
                                <DashboardPage />
                                <Footer />
                            </>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/compare"
                    element={
                        <PrivateRoute>
                            <>
                                <Header />
                                <ComparePage />
                                <Footer />
                            </>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/report"
                    element={
                        <PrivateRoute>
                            <>
                                <Header />
                                <ReportPage />
                                <Footer />
                            </>
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
