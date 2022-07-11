import axios from "axios";
import { useCallback, useState } from "react";

import useHandleHttpRequestError from '../useHandleHttpRequestError';

const apiBasePath = "api/v1/predict";

function usePredict() {
    const [predictions, setPredictions] = useState([]);
    const { handleError } = useHandleHttpRequestError();
    const [pending, setPending] = useState(false);

    const predictViaUrl = useCallback(async (imageUrl: string, options?) => {
        try {
            setPending(true);
            const res = await axios.post(`${apiBasePath}/`, {
                url: imageUrl
            }, options);
            setPredictions(res.data);
            setPending(false);
            return res;
        } catch (err) {
            handleError(err);
            setPending(false);
        }
    }, [setPending, setPredictions, handleError]);

    const predictViaUpload = useCallback(async (formData, options?) => {
        try {
            setPending(true);
            const res = await axios.post(`${apiBasePath}/upload`, formData, options);
            setPredictions(res.data);
            setPending(false);
            return res;
        } catch (err) {
            handleError(err);
            setPending(false);
        }
    }, [setPending, setPredictions, handleError])

    return {
        predictions,
        predictViaUrl,
        predictViaUpload,
        pending
    }
}

export default usePredict