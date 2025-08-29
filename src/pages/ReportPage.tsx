import { useEffect, useState } from "react";
import { useReportStore } from "../store/reportStore";
import Swal from "sweetalert2";

export default function ReportPage() {
    const { reports, loading, fetchReports, createReport, updateReport, deleteReport } = useReportStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit" | "detail">("add");
    const [formData, setFormData] = useState({
        id: 0,
        title: "",
        income: 0,
        expense: 0,
        report_date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const openModal = (mode: "add" | "edit" | "detail", report?: any) => {
        setModalMode(mode);
        if (report) {
            setFormData({
                id: report.id,
                title: report.title,
                income: report.income,
                expense: report.expense,
                report_date: report.report_date.split("T")[0],
            });
        } else {
            setFormData({
                id: 0,
                title: "",
                income: 0,
                expense: 0,
                report_date: new Date().toISOString().split("T")[0],
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        if (modalMode === "add") {
            await createReport(formData);
        } else if (modalMode === "edit") {
            await updateReport(formData.id, formData);
        }
        setIsModalOpen(false);
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            await deleteReport(id);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-900 text-white pt-25">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 float-left">Reports</h1>
                <div className="mb-4 float-end">
                    <button onClick={() => openModal("add")} className="px-4 py-2 bg-purple-500 hover:bg-purple-700 text-white rounded">
                        + Add Report
                    </button>
                </div>

                {loading && <p className="text-gray-400">Loading...</p>}
                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="border border-gray-700 px-3 py-2">ID</th>
                                <th className="border border-gray-700 px-3 py-2">Title</th>
                                <th className="border border-gray-700 px-3 py-2">Income</th>
                                <th className="border border-gray-700 px-3 py-2">Expense</th>
                                <th className="border border-gray-700 px-3 py-2">Date</th>
                                <th className="border border-gray-700 px-3 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-3 text-gray-400">
                                        No reports found
                                    </td>
                                </tr>
                            ) : (
                                reports.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-800">
                                        <td className="border border-gray-700 px-3 py-2">{report.id}</td>
                                        <td className="border border-gray-700 px-3 py-2">{report.title}</td>
                                        <td className="border border-gray-700 px-3 py-2">{report.income}</td>
                                        <td className="border border-gray-700 px-3 py-2">{report.expense}</td>
                                        <td className="border border-gray-700 px-3 py-2">{new Date(report.report_date).toLocaleDateString()}</td>
                                        <td className="border border-gray-700 px-3 py-2 space-x-2">
                                            <button onClick={() => openModal("detail", report)} className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded">
                                                Detail
                                            </button>
                                            <button onClick={() => openModal("edit", report)} className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(report.id)} className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* MODAL */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3">
                        <div className="bg-gray-800 p-6 rounded-lg w-96">
                            <h2 className="text-xl font-bold mb-4 capitalize">{modalMode} Report</h2>

                            {modalMode === "detail" ? (
                                <div className="space-y-2">
                                    <p>
                                        <b>Title:</b> {formData.title}
                                    </p>
                                    <p>
                                        <b>Income:</b> {formData.income}
                                    </p>
                                    <p>
                                        <b>Expense:</b> {formData.expense}
                                    </p>
                                    <p>
                                        <b>Date:</b> {formData.report_date}
                                    </p>
                                </div>
                            ) : (
                                <form className="space-y-3">
                                    <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 rounded bg-gray-700 text-white" />
                                    <input type="number" placeholder="Income" value={formData.income} onChange={(e) => setFormData({ ...formData, income: Number(e.target.value) })} className="w-full p-2 rounded bg-gray-700 text-white" />
                                    <input type="number" placeholder="Expense" value={formData.expense} onChange={(e) => setFormData({ ...formData, expense: Number(e.target.value) })} className="w-full p-2 rounded bg-gray-700 text-white" />
                                    <input type="date" value={formData.report_date} onChange={(e) => setFormData({ ...formData, report_date: e.target.value })} className="w-full p-2 rounded bg-gray-700 text-white" />
                                </form>
                            )}

                            <div className="flex justify-end mt-4 space-x-2">
                                <button onClick={() => setIsModalOpen(false)} className="px-3 py-1 bg-gray-500 rounded">
                                    Close
                                </button>
                                {modalMode !== "detail" && (
                                    <button onClick={handleSubmit} className="px-3 py-1 bg-purple-500 hover:bg-purple-700 rounded">
                                        Save
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
