import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";
import type { CompareResult, CompareState } from "../interface/compare";
import { useAuthStore } from "./authStore";

export const useCompareStore = create<CompareState>(() => ({
    compareText: async (first_text: string, second_text: string, is_sensitive: boolean): Promise<CompareResult | null> => {
        try {
            const token = useAuthStore.getState().token;

            if (!token) {
                await Swal.fire({
                    icon: "error",
                    title: "Unauthorized",
                    text: "You need to login first",
                });
                return null;
            }

            const res = await axios.post(
                "https://be-finport.vercel.app/api/check",
                { first_text, second_text, is_sensitive },
                {
                    withCredentials: false,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    validateStatus: (status) => status < 500,
                }
            );

            if (res.status === 401) {
                await Swal.fire({
                    icon: "error",
                    title: "Unauthorized",
                    text: "Your session has expired, please login again.",
                }).then(() => {
                    useAuthStore.getState().setToken(null);
                    window.location.href = "/login";
                });
            }

            const result: CompareResult = {
                percentage: res.data.data.percentage,
                count: res.data.data.count,
            };
            return result;
        } catch (err) {
            console.error(err);
            await Swal.fire({
                icon: "error",
                title: "Comparison Failed",
                text: "Server error, please try again.",
            });
            return null;
        }
    },
}));
