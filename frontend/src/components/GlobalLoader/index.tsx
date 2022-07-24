import { Backdrop, CircularProgress, Fade } from "@mui/material"
import { GlobalLoadingContext } from "contexts/GlobalLoadingContext";
import { useContext } from "react";

export default function GlobalLoader() {
    const { loading } = useContext(GlobalLoadingContext)
    return (
        <Fade
            in={loading === true}
            style={{
                transitionDelay: loading === true ? '200ms' : '0ms',
            }}
            unmountOnExit
        >
            <Backdrop open={loading} sx={{
                zIndex: (theme) => theme.zIndex.modal + 1
            }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fade>
    )
}