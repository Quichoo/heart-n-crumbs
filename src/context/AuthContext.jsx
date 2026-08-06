import { createContext, useContext } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAdminAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
