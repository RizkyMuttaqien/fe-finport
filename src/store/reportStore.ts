import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";
import type { Report, ReportState } from "../interface/report";
import { useAuthStore } from "./authStore";

export const useReportStore = create<ReportState>((set, get) => ({
    reports: [],
    selected: null,
    loading: false,
    error: null,

    fetchReports: async (): Promise<Report[] | null> => {
        try {
            set({ loading: true, error: null });
            const token = useAuthStore.getState().token;
            const res = await axios.get("https://be-finport.vercel.app/api/reports", {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
                validateStatus: (status) => status < 500,
            });
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
            const data = Array.isArray(res.data.data.reports) ? res.data.data.reports : [];
            set({ reports: data, loading: false });
            return data;
        } catch (err) {
            set({ loading: false, error: "Failed to fetch reports" });
            await Swal.fire("Error", "Failed to fetch reports", "error");
            return null;
        }
    },

    getReport: async (id: number) => {
        const report = get().reports.find((r) => r.id === id) || null;
        set({ selected: report });
        return Promise.resolve(report);
    },

    createReport: async (data) => {
        try {
            const token = useAuthStore.getState().token;
            const res = await axios.post("https://be-finport.vercel.app/api/reports", data, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
                validateStatus: (status) => status < 500,
            });
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

            Swal.fire("Created!", "Report has been created.", "success");
            set({ reports: [...get().reports, res.data.data] });
        } catch (err) {
            console.error(err);
            await Swal.fire("Error", "Failed to create report", "error");
        }
    },

    updateReport: async (id, data) => {
        try {
            const token = useAuthStore.getState().token;
            const res = await axios.put(`https://be-finport.vercel.app/api/reports/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
                validateStatus: (status) => status < 500,
            });
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
            Swal.fire("Updated!", "Report has been updated.", "success");
            set({
                reports: get().reports.map((r) => (r.id === id ? res.data.data : r)),
            });
        } catch (err) {
            console.error(err);
            await Swal.fire("Error", "Failed to update report", "error");
        }
    },

    deleteReport: async (id) => {
        try {
            const token = useAuthStore.getState().token;
            const res = await axios.delete(`https://be-finport.vercel.app/api/reports/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
                validateStatus: (status) => status < 500,
            });
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
            Swal.fire("Deleted!", "Report has been deleted.", "success");
            set({
                reports: get().reports.filter((r) => r.id !== id),
            });
        } catch (err) {
            console.error(err);
            await Swal.fire("Error", "Failed to delete report", "error");
        }
    },

    clearSelected: () => set({ selected: null }),

    setSelected: (report) => set({ selected: report }),
    setReports: (reports) => set({ reports }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
