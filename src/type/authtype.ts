export type RegisterData = {
  name: string;
  email: string;
  password: string;
};
export type LoginData = {
  email: string;
  password: string;
};
export type AuthState = {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: string | null; // ✅ FIXED
};