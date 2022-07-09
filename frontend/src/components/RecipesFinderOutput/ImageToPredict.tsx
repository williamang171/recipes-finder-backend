import React from "react";
import { CardMedia, Grid, Box, Typography } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from "@mui/system";

import { useMediaQuery } from '@mui/material';
import { grey } from "@mui/material/colors";

interface Props {
    imageUrl: string | null
}

const Placeholder = React.memo(() => {
    return <Box sx={{
        display: "flex",
        pl: 2,
        height: "460px",
        width: "100%",
        mt: 1
    }}>
        <InfoIcon fontSize="small" sx={{ mr: 1, }} />
        <Typography variant="caption" sx={{
            mt: 0.2
        }}>Image to predict will be shown here</Typography>
    </Box>
})

export default function ImageToPredict(props: Props) {
    const { imageUrl } = props;
    const theme = useTheme();
    const mode = theme.palette.mode;
    const overLg = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Box sx={{ display: "flex", width: overLg ? "500px" : "100%", height: "100%", maxHeight: "460px", justifyContent: "center", p: 2, borderBottom: overLg ? "" : `1px solid ${mode === "dark" ? grey[800] : grey[300]}` }}>
            {imageUrl ? <CardMedia component="img" image={imageUrl} sx={{
                width: "100%",
                height: "100%",
                maxHeight: "400px",
                maxWidth: "520px",
                minWidth: "320px",
                objectFit: "contain"
            }} /> :
                <Placeholder />
            }
        </Box>
    )

}