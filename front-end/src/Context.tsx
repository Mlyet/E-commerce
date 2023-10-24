import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = localStorage.getItem("username") ? createContext({email: localStorage.getItem("username"), role: localStorage.getItem("role")}) : createContext({email: "", role: ""});

interface AuthProviderInterface {
    children: JSX.Element;
}
interface UserInterface {
    email: string | null;
    role: string | null;
    id: string | null
}

interface AuthContextInterface {
    user: UserInterface;
    setUser: (user: UserInterface) => void;
    setUserField: (key: "email" | "role" | "id", value: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
    user: { email: "", role: "", id: "" },
    setUser: () => {},
    setUserField: () => {},
    logout: () => {},
});

export const useAuth = (): AuthContextInterface => useContext(AuthContext);

export const useAutoLogin = () => {
    const { setUser } = useAuth();

    useEffect(() => {
        if (localStorage.getItem("username"))
            setUser({
                email: localStorage.getItem("username"),
                role: localStorage.getItem("role"),
                id: localStorage.getItem("id")
            });
    }, []);
};

const AuthProvider = ({ children }: AuthProviderInterface) => {
    const [user, setUser] = useState<UserInterface>({ email: "", role: "", id: "" });

    const setUserField = (key: "email" | "role" | "id", value: string) => {
        const tmpUser = { ...user };
        tmpUser[key] = value;
        setUser(tmpUser);
    };

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setUser({ email: "", role: "", id: "" });
    };

    return (
        <AuthContext.Provider value={{ user, setUser, setUserField, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
