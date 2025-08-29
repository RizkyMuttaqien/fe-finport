export interface Report {
    id: number;
    title: string;
    income: number;
    expense: number;
    report_date: string;
    createdAt?: string;
}

export interface ReportState {
    reports: Report[];
    selected: Report | null;
    loading: boolean;
    error: string | null;

    fetchReports: () => Promise<Report[] | null>;
    getReport: (id: number) => Promise<Report | null>;
    createReport: (data: Omit<Report, "id" | "createdAt">) => Promise<void>;
    updateReport: (id: number, data: Omit<Report, "id" | "createdAt">) => Promise<void>;
    deleteReport: (id: number) => Promise<void>;
    clearSelected: () => void;

    setSelected: (report: Report | null) => void;
    setReports: (reports: Report[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}
