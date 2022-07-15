import * as React from 'react';

import { grey, blue, blueGrey } from "@mui/material/colors";
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

interface Props {
    children: React.ReactNode
}

export const getDesignTokens = (mode: 'light' | 'dark') =>
({
    palette: {
        primary: {
            ...blue,
            ...(mode === 'dark' && {
                main: blue[400],
            }),
        },
        divider: mode === 'dark' ? alpha(blue[100], 0.08) : grey[100],
        primaryDark: blueGrey,
        mode,
        ...(mode === 'dark' && {
            background: {
                default: blueGrey[900],
                paper: blueGrey[900],
            },
        }),
    },
});

export default function ToggleColorMode(props: Props) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    // Update the theme only if the mode changes
    // const theme = React.useMemo(
    //     () =>
    //         createTheme({
    //             palette: {
    //                 mode,
    //             },
    //         }),
    //     [mode],
    // );
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}