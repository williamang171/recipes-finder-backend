import { Box, Avatar, Typography } from "@mui/material";

interface Props {
    icon: React.ReactNode,
    title: string,
    description: string
}

export default function Highlight(props: Props) {
    const { icon, title, description } = props;
    return <Box>
        <Avatar sx={{ margin: "auto", color: "white", bgcolor: (theme) => theme.palette.primary.main }} >
            {icon}
        </Avatar>
        <Typography sx={{ mt: 2, }} variant="h4" color="text.primary">
            {title}
        </Typography>
        <Typography sx={{ mt: 1 }} variant="body1" color="text.primary">
            {description}
        </Typography>
    </Box>
}