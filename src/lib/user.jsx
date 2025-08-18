import {useState,useEffect,useMemo,useContext, createContext} from "react";

const USER_KEY = "username";
const DEFAULT_USERNAME = "Sparky";

function loadUsername() {
  try {
    const v = localStorage.getItem(USER_KEY);
    return v && v.trim() ? v : DEFAULT_USERNAME;
  } catch {
    return DEFAULT_USERNAME;
  }
}

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(loadUsername);

  useEffect(() => {
    try { localStorage.setItem(USER_KEY, userName); } catch {}
  }, [userName]);

  const value = useMemo(() => ({ userName, setUserName }), [userName]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
