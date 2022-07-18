import { useMemo, useEffect, createContext, useState } from "react";

import { grey, blue, blueGrey } from "@mui/material/colors";
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

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
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    useEffect(() => {
        const colorMode = localStorage.getItem("colorMode") || "light";
        if (colorMode === "dark") {
            setMode("dark");
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("colorMode", mode);
    }, [mode])

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}