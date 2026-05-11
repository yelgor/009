import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const USER_STORAGE_KEY = "currentUser";

function readStoredUser() {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUserState] = useState(readStoredUser);

  const setCurrentUser = useCallback((user) => {
    setCurrentUserState(user);

    if (!user) {
      sessionStorage.removeItem(USER_STORAGE_KEY);
      return;
    }

    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }, []);

  const logout = useCallback(() => setCurrentUser(null), [setCurrentUser]);

  const value = useMemo(
    () => ({ currentUser, isAuthenticated: Boolean(currentUser?.email), setCurrentUser, logout }),
    [currentUser, setCurrentUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
