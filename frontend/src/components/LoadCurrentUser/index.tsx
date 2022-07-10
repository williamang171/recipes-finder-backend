import { useEffect } from "react";
import useAuth from "hooks/useHttpAPI/useAuth";

export default function LoadCurrentUser() {
    const { loadCurrentUser, isAuthenticated, user } = useAuth();

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (!user && (isAuthenticated === null || isAuthenticated === true) && t) {
            loadCurrentUser()
        }
    }, [user, isAuthenticated])

    return null;
}