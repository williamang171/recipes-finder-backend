import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { ColorModeContext } from 'components/ToggleColorMode';
import { blueGrey } from '@mui/material/colors';

export default function ColorMode() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return <Box
        sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.primary',

        }}
    >
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon sx={{
                color: blueGrey[700]
            }} />}
        </IconButton>
    </Box>
}