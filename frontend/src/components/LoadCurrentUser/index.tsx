import { useEffect } from "react";
import useAuth from "hooks/useHttpAPI/useAuth";
import jwtDecode from "jwt-decode";
import { useSnackbar } from "notistack";

interface Decoded {
    sub?: string,
    exp?: number
}

function checkTokenIsExpired(t: string) {
    try {
        const decoded: Decoded = jwtDecode(t) || {}
        const expired = ((decoded.exp || 0) * 1000) < Date.now().valueOf()
        return expired;
    } catch (error) {
        return true;
    }
}

export default function LoadCurrentUser() {
    const { loadCurrentUser, isAuthenticated, user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (!t) {
            return;
        }
        const tokenIsExpired = checkTokenIsExpired(t);

        if (tokenIsExpired) {
            enqueueSnackbar("Session expired, please sign in again");
            localStorage.removeItem("token");
            return;
        }

        if (!user && (isAuthenticated === null || isAuthenticated === true)) {
            // console.log("Token not expired");
            loadCurrentUser()
        }
    }, [user, isAuthenticated])

    return null;
}