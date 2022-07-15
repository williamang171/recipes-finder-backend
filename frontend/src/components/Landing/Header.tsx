import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Book from '@mui/icons-material/Book';
import constants from "./styles";

export default function Header() {
    return <Toolbar sx={{ background: constants.color.main }}>
        <Box color="inherit" />
        <Book sx={{ mr: 1 }} color="action" />
        <Typography
            component="h2"
            variant="h6"
            color="text.primary"
            noWrap
            sx={{ flex: 1 }}
        >
            Recipes Finder
        </Typography>

        <Button component="a" href="/finder" variant="contained" size="small">
            Open App
        </Button>
    </Toolbar>

}