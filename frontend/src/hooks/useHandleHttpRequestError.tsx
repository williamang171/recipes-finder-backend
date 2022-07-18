import { useSnackbar } from "notistack";
import { useCallback, useContext } from "react";

import { AuthContext } from "contexts/AuthContext";

export default function useHandleHttpRequestError() {
    const { enqueueSnackbar } = useSnackbar();
    const { setIsAuthenticated, setUser } = useContext(AuthContext)

    const handleError = useCallback((err) => {
        const response = err.response || {};
        const data = response.data || {};
        console.log(response)
        if (response && response.status === 401) {
            // enqueueSnackbar("Not authorized");
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUser(null);
            // return;
        }
        if (data && data.detail) {
            enqueueSnackbar(data.detail);
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