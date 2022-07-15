import React, { useState } from "react";

import { useTheme } from '@mui/material/styles';
import ReCAPTCHA from "react-google-recaptcha";
import { styled } from "@mui/material/styles";
import { Button, Box, } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useGRecaptcha from "hooks/useGRecaptcha";
import { Prediction } from "interfaces/types";

import usePredict from "hooks/useHttpAPI/usePredict";

const Input = styled('input')({
    display: 'none',
});

interface Props {
    setPredictions(predictions: Array<Prediction>): any,
    setImageUrl(imageUrl: string): any
}

export default function FileUpload(props: Props) {
    const { predictViaUpload, pending } = usePredict();
    const { setPredictions, setImageUrl } = props;
    const theme = useTheme();
    const { gRecaptchaOnChange, gRecaptchaRef, gRecaptchaValue, siteKey, gRecaptchaReset, gRecaptchaHeaders } = useGRecaptcha();

    const [file, setFile] = useState<Blob | null>(null);
    const [fileName, setFileName] = useState("");

    const onSubmit = async () => {
        const formData = new FormData();
        if (file !== null) {
            formData.append("file", file);
        }
        const res = await predictViaUpload(formData, {
            headers: gRecaptchaHeaders
        });
        if (res && res.data) {
            setPredictions(res.data);
        }
        gRecaptchaReset();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files ? e.target.files[0] : null;
        if (f) {
            setFileName(f.name);
            setFile(f);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImageUrl(reader.result?.toString() || "");
            });
            reader.readAsDataURL(f);
        }
    }

    return <Box  >
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
            <label htmlFor="file-upload">
                <Input accept="image/*" id="file-upload" type="file" onChange={handleChange} />
                <Button variant="outlined" component="span" sx={{
                    width: 200
                }}>
                    Upload
                </Button>
            </label>

            <div style={{ display: "block", marginLeft: "12px" }}>
                {fileName}
            </div>
        </Box>

        <ReCAPTCHA
            sitekey={siteKey}
            onChange={gRecaptchaOnChange}
            ref={gRecaptchaRef}
        />

        <Box sx={{ mb: 2 }} />

        <LoadingButton loading={pending} size="large" disabled={!file || !gRecaptchaValue} variant='contained' onClick={onSubmit}>Submit</LoadingButton>
    </Box>
}