import { useSnackbar } from "notistack";
import { useCallback } from "react";

export default function useHandleHttpRequestError() {
    const { enqueueSnackbar } = useSnackbar();

    const handleError = useCallback((err) => {
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