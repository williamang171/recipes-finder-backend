import { useState, useRef, useMemo, useCallback } from "react";
import { ReCAPTCHA } from "react-google-recaptcha";

const siteKey = "6Lcje5QfAAAAAKtrcKB0-7tw0972Uc00xFSgHUpP";

export default function useGRecaptcha() {
    const [value, setValue] = useState("");
    const gRecaptchaRef = useRef<ReCAPTCHA>(null);

    const onChange = useCallback((v: any) => {
        setValue(v);
    }, [setValue])

    const gRecaptchaReset = useCallback(() => {
        if (gRecaptchaRef && gRecaptchaRef.current) {
            gRecaptchaRef.current.reset();
        }
        setValue("");
    }, [gRecaptchaRef, setValue])

    const gRecaptchaHeaders = useMemo(() => {
        return {
            "recaptcha-res": value
        }
    }, [value])


    return {
        gRecaptchaHeaders,
        gRecaptchaReset,
        gRecaptchaRef,
        gRecaptchaValue: value,
        gRecaptchaOnChange: onChange,
        siteKey
    }
}