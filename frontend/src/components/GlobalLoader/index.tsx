import { Backdrop, CircularProgress, Fade } from "@mui/material"

interface Props {
    loading: boolean
}

export default function GlobalLoader(props: Props) {
    const { loading } = props;
    return (

        <Fade
            in={loading === true}
            style={{
                transitionDelay: loading === true ? '500ms' : '0ms',
            }}
            unmountOnExit
        >
            <Backdrop open={loading} sx={{
                zIndex: (theme) => theme.zIndex.drawer + 2
            }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fade>

    )
}