import { AuthContext } from "contexts/AuthContext";
import { useSnackbar } from "notistack";
import { useCallback, useContext } from "react";

export default function useHandleHttpRequestError() {
    const { enqueueSnackbar } = useSnackbar();
    const { setIsAuthenticated, setUser } = useContext(AuthContext)

    const handleError = useCallback((err) => {
        const response = err.response || {};
        if (response && response.status === 401) {
            enqueueSnackbar("Not authorized");
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUser(null);
            return;
        }
        if (err && err.message) {
            enqueueSnackbar(err.message);
            return;
        }
        enqueueSnackbar("Something went wrong");
    }, [enqueueSnackbar])

    return {
        handleError
    }
}