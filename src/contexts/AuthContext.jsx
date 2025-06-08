import React, {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext({
    userId: null,
    login: (id) => {
    },
    logout: () => {
    },
});

export function AuthProvider({children}) {
    const [userId, setUserId] = useState(null);

    // On app start, restore from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("userId");
        if (stored) {
            setUserId(Number(stored));
        }
    }, []);

    function login(id) {
        setUserId(id);
        localStorage.setItem("userId", String(id));
    }

    function logout() {
        setUserId(null);
        localStorage.removeItem("userId");
    }

    return (
        <AuthContext.Provider value={{userId, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

// Convenience hook
export function useAuth() {
    return useContext(AuthContext);
}
