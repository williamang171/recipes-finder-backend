import { useEffect } from "react";
import useAuth from "hooks/useHttpAPI/useAuth";
import jwtDecode from "jwt-decode";

interface Decoded {
    sub?: string,
    exp?: number
}

function checkTokenIsExpired(t: string) {
    const decoded: Decoded = jwtDecode(t) || {}
    const expired = ((decoded.exp || 0) * 1000) < Date.now().valueOf()
    return expired;
}

export default function LoadCurrentUser() {
    const { loadCurrentUser, isAuthenticated, user } = useAuth();

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (!t) {
            return;
        }
        const tokenIsExpired = checkTokenIsExpired(t);
        if (!user && (isAuthenticated === null || isAuthenticated === true) && !tokenIsExpired) {
            // console.log("Token not expired");
            loadCurrentUser()
        }
    }, [user, isAuthenticated])

    return null;
}