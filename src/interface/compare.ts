export interface CompareResult {
    percentage: string;
    count: string;
}

export interface CompareState {
    compareText: (first_text: string, second_text: string, is_sensitive: boolean) => Promise<CompareResult | null>;
}
