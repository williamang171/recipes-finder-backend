import React, { useMemo, useState, createContext } from 'react'

interface AuthContextInterface {
    isAuthenticated: true | false | null,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<any>>,
    user: any,
    setUser: any
}

export const AuthContext = createContext<AuthContextInterface>({
    isAuthenticated: null,
    setIsAuthenticated: () => { },
    user: null,
    setUser: () => { }
});

interface PropTypes {
    children: React.ReactNode
}

export function AuthContextProvider(props: PropTypes) {
    const { children } = props;
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);

    const providerValue = useMemo(() => {
        return {
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser
        }
    }, [isAuthenticated, setIsAuthenticated, user, setUser])


    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
}