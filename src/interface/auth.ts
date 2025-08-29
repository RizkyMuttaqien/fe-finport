export interface AuthState {
    token: string | null;
    setToken: (token: string | null) => void;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}
