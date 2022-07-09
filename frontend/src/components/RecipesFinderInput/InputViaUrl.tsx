import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import usePredict from "hooks/useHttpAPI/usePredict";
import useGRecaptcha from "hooks/useGRecaptcha";
import { Prediction } from "interfaces/types";

import ImageFinderSample from "./ImageFinderSample";
import ImageFinderUnsplash from "./ImageFinderUnsplash";

interface Props {
    setPredictions(predictions: Array<Prediction>): any,
    imageUrl: string | null,
    setImageUrl(imageUrl: string): any
}

const defaultImageUrl = "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1000&fit=crop&auto=format"

export default function InputViaUrl(props: Props) {
    const { pending, predictViaUrl } = usePredict();
    const [inputImageUrl, setInputImageUrl] = useState<string | null>("");
    const { enqueueSnackbar } = useSnackbar();
    const { setPredictions, imageUrl, setImageUrl } = props;
    const { gRecaptchaOnChange, siteKey, gRecaptchaHeaders, gRecaptchaRef, gRecaptchaValue, gRecaptchaReset } = useGRecaptcha();

    useEffect(() => {
        setInputImageUrl(imageUrl);
    }, [imageUrl])

    useEffect(() => {
        setImageUrl(defaultImageUrl);
    }, [setImageUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputImageUrl(e.target.value);
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await predictViaUrl(imageUrl || "", {
            headers: gRecaptchaHeaders
        })
        if (res && res.data) {
            setPredictions(res.data);
        }
        enqueueSnackbar("Predictions made");
        gRecaptchaReset();
    }

    return (
        <div>
            <div style={{
                display: "flex",
                alignItems: "flex-end",
                flexWrap: "wrap"
            }}>
                <ImageFinderSample setImageUrl={setImageUrl} />
                <Box sx={{ mr: 1 }} />
                <ImageFinderUnsplash setImageUrl={setImageUrl} />
            </div>

            <Box onSubmit={handleSubmit} component="form" sx={{ mt: 2 }}>
                <TextField fullWidth value={inputImageUrl} onChange={handleChange} sx={{
                    mb: 3
                }} variant='outlined' label='Image URL' size="small"
                    onBlur={handleBlur}
                />
                <ReCAPTCHA
                    ref={gRecaptchaRef}
                    sitekey={siteKey}
                    onChange={gRecaptchaOnChange}
                />

                <Box sx={{ mb: 2 }} />

                <LoadingButton loading={pending} type="submit" disabled={!imageUrl || !gRecaptchaValue} color='primary' variant='contained' size="large">Submit</LoadingButton>
            </Box>
        </div>
    );
}
