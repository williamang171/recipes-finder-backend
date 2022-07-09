import { Box } from "@mui/material";

import constants from "./styles";

interface MainProps {
    children: React.ReactNode
}

export default function Main(props: MainProps) {
    return <Box component="main" sx={{ position: "relative", minHeight: "500px", pt: 10, backgroundColor: constants.color.main }} >
        {props.children}
    </Box>
}