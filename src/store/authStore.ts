import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import type { AuthState } from "../interface/auth";

export const useAuthStore = create<AuthState>((set) => ({
    token: Cookies.get("token") || null,
    setToken: (token: string | null) => {
        set({ token });
        if (token) {
            Cookies.set("token", token, { expires: 7 });
        } else {
            Cookies.remove("token");
        }
    },
    login: async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await axios.post("https://be-finport.vercel.app/api/login", { email, password }, { withCredentials: false, validateStatus: (status) => status < 500 });

            if (res.status !== 200 || res.data.error) {
                await Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: res.data.message || "Invalid email or password",
                });
                return false;
            }

            set({ token: res.data.data.token });
            Cookies.set("token", res.data.data.token, { expires: 7 });

            await Swal.fire({
                icon: "success",
                title: "Login Successful",
                showConfirmButton: false,
                timer: 1500,
            });

            return true;
        } catch (err) {
            console.error(err);
            await Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Server error, please try again.",
            });
            return false;
        }
    },

    register: async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await axios.post("https://be-finport.vercel.app/api/register", { email, password }, { withCredentials: false, validateStatus: (status) => status < 500 });

            if (res.status !== 200 || res.data.error) {
                await Swal.fire({
                    icon: "error",
                    title: "Register Failed",
                    text: res.data.message || "Register error",
                });
                return false;
            }

            set({ token: res.data.data.token });
            Cookies.set("token", res.data.data.token, { expires: 7 });

            await Swal.fire({
                icon: "success",
                title: "Register Successful",
                showConfirmButton: false,
                timer: 1500,
            });

            return true;
        } catch (err) {
            console.error(err);
            await Swal.fire({
                icon: "error",
                title: "Register Failed",
                text: "Server error, please try again.",
            });
            return false;
        }
    },

    logout: async () => {
        try {
            await axios.post("https://be-finport.vercel.app/api/logout", {}, { withCredentials: false });
        } catch (err) {
            console.error(err);
        } finally {
            set({ token: null });
            Cookies.remove("user");
            Cookies.remove("token");

            await Swal.fire({
                icon: "success",
                title: "Logged out",
                showConfirmButton: false,
                timer: 1000,
            });
        }
    },
}));
